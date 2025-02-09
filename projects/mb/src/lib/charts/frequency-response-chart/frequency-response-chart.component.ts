import { Component, HostListener, ChangeDetectionStrategy, PLATFORM_ID, ElementRef, input, inject,effect, afterNextRender } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import * as d3 from 'd3';

import { Downloader } from '../downloader';
import { computeDimensions } from '../compute-dimensions';
import { FrequencyResponseResult }
  from '../../trading/indicators/indicator/frequency-response/frequency-response.interface';

const fmt2 = d3.format('.2f');
const fmt3 = d3.format('.3f');

const defaultWidth = 300;
const defaultHeight = 300;

const xFrequencies = 0;
const xPeriods = 1;
const xModeMax = 2;
type xModeType = 0 | 1;
const xModeLabels = ['Normalized frequency', 'Period, samples'];

const yPowerDecibels = 0;
const yPowerPercents = 1;
const yAmplitudeDecibels = 2;
const yAmplitudePercents = 3;
const yPhaseDegrees = 4;
const yPhaseDegreesUnwrapped = 5;
const yModeMax = 6;
type yModeType = 0 | 1 | 2 | 3 | 4 | 5;
const yModeLabels = ['Power, dB', 'Power, %', 'Amplitude, dB', 'Amplitude, %', 'Phase, deg °', 'Unwrapped phase, deg °'];
const yModeSuffices = [' dB', ' %', ' dB', ' %', ' °', ' °'];

interface xComponentType {
  data: number[];
  min: number;
  max: number;
}

interface yLineType {
  label: string;
  color?: string;
  line: number[];
  hover: boolean;
}

interface yComponentType {
  lines: yLineType[];
  min: number;
  max: number;
}

const color = d3.interpolateCool; // d3.interpolateWarm d3.interpolateCool d3.interpolateSinebow

/** The text to place before the SVG line when exporting chart as SVG. */
const textBeforeSvg = `<html><meta charset="utf-8"><style>
  text { fill: black; font-size: 13px; font-family: Arial, Helvetica, sans-serif; cursor: default; }
  .filter-response .legend .label circle { stroke-width: 2px; }
  .filter-response .coords { fill: black; font: 10px sans-serif; }
  .filter-response .subfigure text { font-weight: bold; }
  .filter-response .axis path { fill: none; stroke: black; }
  .filter-response .axis line { fill: none; stroke: grey; }
  .line { stroke-width: 2px; }
</style><body>
`;
/** The text to place after the SVG line when exporting chart as SVG. */
const textAfterSvg = `
</body></html>
`;

@Component({
    selector: 'mb-frequency-response-chart',
    templateUrl: './frequency-response-chart.component.html',
    styleUrls: ['./frequency-response-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      MatExpansionPanel,
      MatExpansionPanelHeader,
      MatExpansionPanelTitle,
      MatIcon,
      MatButtonToggleGroup,
      MatButtonToggle,
      MatMiniFabButton
    ]
})
export class FrequencyResponseChartComponent {
  private elementRef = inject(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private random = Math.random().toString(36).substring(2);
  private clipId = 'frchart-clip-' +  this.random;
  private pointerEventsId = 'frchart-pointer-events-' + this.random;
  protected svgContainerId = 'frchart-svg-' + this.random;

  /** If chart settings panel is visible. */
  readonly settingsPanelVisible = input(false);

  /** If *Save SVG* button is visible. */
  readonly saveSvgVisible = input(true);

  private widthValue: number | string = defaultWidth;
  /** A width of the chart in pixels or as percentage. */
  width = input<number | string>();

  private heightValue: number | string = defaultHeight;
  /** A height of the chart in pixels or as percentage. */
  height = input<number | string>();

  /** The array of frequency responses to use. */
  data = input.required<FrequencyResponseResult[]>();

  /** Current x axis is xComponents[xMode] */
  private xComponents = new Array<xComponentType>(xModeMax);
  /** Current y axis is yComponents[xMode][yMode]. */
  private yComponents = [new Array<yComponentType>(yModeMax), new Array<yComponentType>(yModeMax)];

  /** The x mode. */
  xmode = input<'frequency' | 'period'>();
  private xMode: xModeType = xFrequencies;
  protected set xModeValue(value: xModeType) {
    if (this.xMode !== value) {
      this.xMode = value;
      this.render();
    }
  }
  protected get xModeValue(): xModeType {
    return this.xMode;
  }
  protected get xModeFrequencies(): xModeType {
    return xFrequencies;
  }
  protected get xModePeriods(): xModeType {
    return xPeriods;
  }

  /** The y mode. */
  ymode = input<'powerDb' | 'powerPct' | 'amplitudeDb' | 'amplitudePct' | 'phaseDeg' | 'phaseDegUnwrapped'>();
  private yMode: yModeType = yPowerDecibels;
  protected set yModeValue(value: yModeType) {
    if (this.yMode !== value) {
      this.yMode = value;
      this.render();
    }
  }
  protected get yModeValue(): yModeType {
    return this.yMode;
  }
  protected get yModePowerDecibels(): yModeType {
    return yPowerDecibels;
  }
  protected get yModePowerPercents(): yModeType {
    return yPowerPercents;
  }
  protected get yModeAmplitudeDecibels(): yModeType {
    return yAmplitudeDecibels;
  }
  protected get yModeAmplitudePercents(): yModeType {
    return yAmplitudePercents;
  }
  protected get yModePhaseDegrees(): yModeType {
    return yPhaseDegrees;
  }
  protected get yModePhaseDegreesUnwrapped(): yModeType {
    return yPhaseDegreesUnwrapped;
  }

  private subFigureLetter = '';
  /** The sub-figure letter of this chart. */
  subfig = input<string>();

  private forcedFrequencyMin?: number;
  private forcedFrequencyMax?: number;
  /** The minimum x frequency to use. */
  minFrequency = input<number>();
  /** The maximum x frequency to use. */
  maxFrequency = input<number>();

  private forcedPeriodMin?: number;
  private forcedPeriodMax?: number;
  /** The minimum x period to use. */
  minPeriod = input<number>();
  /** The maximum x period to use. */
  maxPeriod = input<number>();

  private forcedDbMin?: number;
  private forcedDbMax?: number;
  /** The minimum y decibels to use. */
  minDb = input<number>();
  /** The maximum y decibels to use. */
  maxDb = input<number>();

  private forcedPctMin?: number;
  private forcedPctMax?: number;
  /** The minimum y percentages to use. */
  minPct = input<number>();
  /** The maximum y percentages to use. */
  maxPct = input<number>();

  private forcedDegMin?: number;
  private forcedDegMax?: number;
  /** The minimum y phase degrees to use. */
  minDeg = input<number>();
  /** The maximum y phase degrees to use. */
  maxDeg = input<number>();

  constructor() {
    effect(() => {
      this.widthValue = this.width() ?? defaultWidth;
      this.render();
    });
    effect(() => {
      this.heightValue = this.height() ?? defaultHeight;
      this.render();
    });
    effect(() => {
      const dat = this.data();
      let empty = true;

      for (const d of dat) {
        const len = d.frequencies.length;
        if (len < 1) {
          continue;
        }
  
        if (empty) {
          // X-axis range is always the same, [0, 1], since the frequency is normalized.
          // So we do this only the first time.
          // Also, we know that the frequency data is sorted in ascending order.
          empty = false;
  
          this.xComponents[xFrequencies] = {
            data: d.frequencies,
            min: 0,
            max: 1
          };
  
          const a = d.frequencies;
          const r = Array.from(a).reverse();
          for (let i = 0; i < r.length; ++i) {
            r[i] = 2 / r[i];
          }
  
          this.xComponents[xPeriods] = {
            data: r,
            min: 2,
            max: Math.ceil(r[r.length - 1])
          };
  
          for (let i = 0; i < yModeMax; ++i) {
            this.yComponents[xFrequencies][i] = {lines: [], min: Infinity, max: -Infinity};
            this.yComponents[xPeriods][i] = {lines: [], min: Infinity, max: -Infinity};
          }
        }
  
        const yData = [d.powerDecibel, d.powerPercent, d.amplitudeDecibel, d.amplitudePercent, d.phaseDegrees, d.phaseDegreesUnwrapped];
  
        for (let i = yPowerDecibels; i < yModeMax; ++i) {
          const yd = yData[i];
  
          const cf = this.yComponents[xFrequencies][i];
          cf.lines.push({ label: d.label, line: yd.data, hover: false });
          cf.min = Math.min(cf.min, yd.min);
          cf.max = Math.max(cf.max, yd.max);
  
          const cp = this.yComponents[xPeriods][i];
          cp.lines.push({ label: d.label, line: Array.from(yd.data).reverse(), hover: false });
          cp.min = cf.min;
          cp.max = cf.max;
        }
      }
  
      this.render();
     });
    effect(() => {
      const value = this.xmode();
      if (value === undefined) {
        return;
      }
      switch (value) {
        case 'frequency':
          this.xModeValue = xFrequencies;
          break;
        case 'period':
          this.xModeValue = xPeriods;
          break;
      }
    });
    effect(() => {
      const value = this.ymode();
      if (value === undefined) {
        return;
      }
      switch (value) {
        case 'powerDb':
          this.yModeValue = yPowerDecibels;
          break;
        case 'powerPct':
          this.yModeValue = yPowerPercents;
          break;
        case 'amplitudeDb':
          this.yModeValue = yAmplitudeDecibels;
          break;
        case 'amplitudePct':
          this.yModeValue = yAmplitudePercents;
          break;
        case 'phaseDeg':
          this.yModeValue = yPhaseDegrees;
          break;
        case 'phaseDegUnwrapped':
          this.yModeValue = yPhaseDegreesUnwrapped;
          break;
      }  
    });
    effect(() => {
      this.subFigureLetter = this.subfig() ?? '';
    });
    effect(() => {
      this.forcedFrequencyMin = this.minFrequency();
    });
    effect(() => {
      this.forcedFrequencyMax = this.maxFrequency();
    });
    effect(() => {
      this.forcedPeriodMin = this.minPeriod();
    });
    effect(() => {
      this.forcedPeriodMax = this.maxPeriod();
    });
    effect(() => {
      this.forcedDbMin = this.minDb();
    });
    effect(() => {
      this.forcedDbMax = this.maxDb();
    });
    effect(() => {
      this.forcedPctMin = this.minPct();
    });
    effect(() => {
      this.forcedPctMax = this.maxPct();
    });
    effect(() => {
      this.forcedDegMin = this.minDeg();
    });
    effect(() => {
      this.forcedDegMax = this.maxDeg();
    });
    afterNextRender({
      write: () => {
        this.render();
      }
    });
  }

  @HostListener('window:resize', [])
  render() {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const thisOne = this;
    const margin = { top: 20, bottom: 30, right: 10, left: 40 };

    const computed = computeDimensions(this.elementRef, this.widthValue, this.heightValue, defaultWidth, defaultHeight);
    const w = computed[0];
    const h = computed[1];
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;
    const labelX = xModeLabels[this.xMode];
    const labelY = yModeLabels[this.yMode];
    const suffixY =yModeSuffices[this.yMode];
    const componentX = this.xComponents[this.xMode];
    const componentY = this.yComponents[this.xMode][this.yMode];
    if (!componentX || !componentY) {
      return;
    }    
    const ll = componentY.lines.length;

    let xmin = componentX.min;
    let xmax = componentX.max;
    if (this.xMode === xPeriods) {
      if (this.forcedPeriodMin !== undefined) {
        xmin = this.forcedPeriodMin;
      }
      if (this.forcedPeriodMax !== undefined) {
        xmax = this.forcedPeriodMax;
      }
    } else {
      if (this.forcedFrequencyMin !== undefined) {
        xmin = this.forcedFrequencyMin;
      }
      if (this.forcedFrequencyMax !== undefined) {
        xmax = this.forcedFrequencyMax;
      }
    }

    let ymin = componentY.min;
    let ymax = componentY.max;
    if (this.yMode === yPowerDecibels || this.yMode === yAmplitudeDecibels) {
      if (this.forcedDbMin !== undefined) {
        ymin = this.forcedDbMin;
      }
      if (this.forcedDbMax !== undefined) {
        ymax = this.forcedDbMax;
      }
    } else if (this.yMode === yPowerPercents || this.yMode === yAmplitudePercents) {
      if (this.forcedPctMin !== undefined) {
        ymin = this.forcedPctMin;
      }
      if (this.forcedPctMax !== undefined) {
        ymax = this.forcedPctMax;
      }
    } else {
      if (this.forcedDegMin !== undefined) {
        ymin = this.forcedDegMin;
      }
      if (this.forcedDegMax !== undefined) {
        ymax = this.forcedDegMax;
      }
    }

    const xScale = d3.scaleLinear().domain([xmin, xmax]).range([0, width]).nice();
    const yScale = d3.scaleLinear().domain([ymin, ymax]).range([height, 0]).nice();
    const xAxisBottom = d3.axisBottom(xScale).ticks(width / 40).tickSizeInner(-height).tickSizeOuter(0);
    const yAxisLeft = d3.axisLeft(yScale).ticks(h / 40).tickSizeInner(-width).tickSizeOuter(0);

    const sel = d3.select('#' + this.svgContainerId);
    sel.select('svg').remove();
    const svg: any = sel.append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('viewbox', '0 0 ' + w + ' ' + h)
      .attr('preserveAspectRatio', 'xMinYMin meet');
    const g = svg.append('g')
      .attr('class', 'filter-response')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    g.append('text').attr('class', 'xlabel').attr('text-anchor', 'middle')
      .attr('x', xScale.range()[1] / 2).attr('y', height + 25).text(labelX || null);
    g.append('g').attr('class', 'x axis')
      .attr('transform', 'translate(0,' + yScale.range()[0] + ')').call(xAxisBottom)
      .selectAll('line.tick').filter((d: any) => !d);

    g.append('text').attr('class', 'ylabel')
      .attr('transform', 'rotate(-90)').attr('text-anchor', 'middle')
      .attr('x', -yScale.range()[0] / 2).attr('y', 10 - margin.left).text(labelY || null);
    g.append('g').attr('class', 'y axis').call(yAxisLeft)
      .selectAll('line.tick').filter((d: any) => !d);

    g.append('g').attr('class', 'subfigure').append('text')
      .attr('class', 'subfigure').attr('text-anchor', 'left')
      .attr('x', -margin.left).attr('y', height + 25).text(this.subFigureLetter || null);

    const glines = g.append('g').attr('class', 'lines');
    glines.append('clipPath').attr('id', this.clipId)
      .append('rect').attr('width', width).attr('height', height);
    for (let i = 0; i < ll; ++i) {
      const l = componentY.lines[i];
      const lineGenerator = d3.line().curve(d3.curveCatmullRomOpen)
        .x((d: any, j: number) => xScale(componentX.data[j]))
        .y((d: any, j: number) => yScale(l.line[j]));

      glines.append('g').attr('class', 'line')
        .style('fill', 'none').style('stroke', l.color || color(i / ll))
        .classed('hover', l.hover)
        .append('path').attr('clip-path', 'url(#' + this.clipId + ')').datum(l.line)
        .attr('d', lineGenerator);
    }

    const coordsText = g.append('text').style('text-anchor', 'end')
      .attr('class', 'coords').attr('x', width - 5).attr('y', 25);
    g.append('rect')
      .style('pointer-events', 'all').style('fill', 'none')
      .attr('id', this.pointerEventsId).attr('width', width).attr('height', height)
      .on('mouseout touchend dblclick', () => coordsText.style('display', 'none'))
      .on('mouseenter touchstart', () => coordsText.style('display', 'inline'))
      .on('mousemove touchmove', function(event: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const m = d3.pointer(event, this);
        const coordx = xScale.invert(m[0]);
        const coordy = yScale.invert(m[1]);
        coordsText.text(fmt3(coordx) + ' ⇆ ' + fmt2(coordy) + suffixY);
      });

    const labelCircleRadius = 5;
    const labelCircleGap = 3;
    const leg = g.append('g').attr('class', 'legend').append('g');

    const labelGap = 3;
    const labelHeight = 15;
    const labelSpacing = 10;
    const labelDefaultTextLength = 40;
    const initialx = 16;
    let ypos = -labelHeight / 2 - 2;
    let xposNext = initialx;
    let cposNext = initialx;

    for (let i = 0; i < ll; ++i) {
      const l = componentY.lines[i];
      const lag = leg.append('g').attr('class', 'label')
        .on('click', () => { l.hover = !l.hover; thisOne.render(); });
      const cg = lag.append('circle')
        .style('fill',  !l.hover ? (l.color || color(i / ll)) : 'none')
        .style('stroke', l.color || color(i / ll))
        .attr('r', labelCircleRadius);
      const tg = lag.append('text').text(l.label)
        .attr('text-anchor', 'start').attr('dy', '.3em')
        .attr('dx', (labelCircleRadius + labelCircleGap));

      let length;
      try {
        length = tg.node().getComputedTextLength() + labelCircleRadius * 2 + labelGap + labelSpacing;
      } catch {
        length = labelDefaultTextLength + labelCircleRadius * 2 + labelGap + labelSpacing;
      }
      let xpos = xposNext;
      if (width < xpos + length) {
        cposNext = xposNext = xpos = initialx;
        ypos += labelHeight;
      }
      cg.attr('transform', 'translate(' + cposNext + ',' + ypos + ')');
      cposNext += length;
      xposNext += length;
      tg.attr('transform', 'translate(' + xpos + ',' + ypos + ')');
    }
  }

  public saveToSvg(): void {
    const d = new Date();
    const filename =
      `frequency-response-chart_${d.getFullYear()}-${d.getMonth()}-${d.getDay()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}.html`;
    Downloader.download(Downloader.serializeToSvg(Downloader.getChildElementById(this.elementRef.nativeElement, this.svgContainerId),
      textBeforeSvg, textAfterSvg), filename);
  }
}
