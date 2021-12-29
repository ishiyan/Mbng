import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

import { Ohlcv } from '../../data/entities/ohlcv';
import { Quote } from '../../data/entities/quote';
import { Trade } from '../../data/entities/trade';
import { Scalar } from '../../data/entities/scalar';
import { Band } from '../entities/band';
import { LineConfiguration } from '../line-configuration.interface';
import { computeDimensions } from '../compute-dimensions';
import { convertInterpolation } from '../convert-interpolation';
import { lineValueAccessor } from '../line-value-accessor';

const DEFAULT_LINE_CONFIGURATION: LineConfiguration = {
  fillColor: undefined, strokeColor: 'steelblue', strokeWidth: 1, interpolation: 'natural'
};
const DEFAULT_LINE_INTERPOLATION = 'natural';
const MIN_DATE = new Date(-8640000000000000);
const MAX_DATE = new Date(8640000000000000);
const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 100;
const PIXELS_BETWEEN_TIME_TICKS = 60;
const PIXELS_BETWEEN_VALUE_TICKS = 30;
const VALUE_AXIS_WIDTH = 50;
const TIME_AXIS_HEIGHT = 18;

@Component({
  selector: 'mb-stackiline',
  templateUrl: './stackline.component.html',
  styleUrls: ['./stackline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StacklineComponent implements OnChanges, AfterViewInit {
  /** A width of the multiline. */
  @Input() width: number | string = DEFAULT_WIDTH;

  /** A height of the multiline. */
  @Input() height: number | string = DEFAULT_HEIGHT;

  /**
   * Specifies how time axis will be shown. Possible values are the combination of:
   *
   * - *'top'*: top time axis is visible
   * - *'bottom'*: bottom time axis is visible
   *
   * If no value provided then nothing is visible.
   */
   @Input() timeAxis: ('top' | 'bottom')[] = [];

   /**
    * Specifies how value axis will be shown. Possible values are the combination of:
    *
    * - *'left'*: left value axis is visible
    * - *'right'*: right value axis is visible
    * - *'grid'*: value grid lines are visible
    *
    * If no value provided then nothing is visible.
    */
   @Input() valueAxis: ('grid' | 'left' | 'right')[] = [];

   private currentConfiguration: LineConfiguration[] = [];
   private currentDataStacked: (Band[])[] = [];
   private currentDataEmpty = true;
   private dataTimeMin!: Date;
   private dataTimeMax!: Date;
   private dataValueMax!: number;
   private forcedTimeMin?: Date;
   private forcedTimeMax?: Date;
   private forcedValueMin?: number;
   private forcedValueMax?: number;

  /** Specifies fill, stroke and interpolation. */
  @Input() set configuration(cfg: LineConfiguration[]) {
    if (cfg && cfg != null && cfg.length > 0) {
      const lenCfg = cfg.length;
      const lenCurrent = this.currentConfiguration.length;
      if (lenCurrent > 0) {
        const minLen = Math.min(lenCfg, lenCurrent);
        const maxLen = Math.max(lenCfg, lenCurrent);
        for (let i = 0; i < minLen; ++i) {
          this.currentConfiguration[i] = { ...this.currentConfiguration[i], ...cfg[i] };
        }
        if (lenCfg > minLen) {
          for (let i = minLen; i < lenCfg; ++i) {
            this.currentConfiguration[i] = { ...cfg[i] };
          }
        }
      } else {
        this.currentConfiguration = [...cfg];
      }
      // this.currentConfiguration = [ ...this.currentConfiguration ];
    }
  }
  get configuration(): LineConfiguration[] {
    return this.currentConfiguration;
  }

  /** The minimum value to use. */
  @Input() set min(value: number | undefined) {
    this.forcedValueMin = value;
  }

  /** The maximum value to use. */
  @Input() set max(value: number | undefined) {
    this.forcedValueMax = value;
  }

  /** The start time to use. */
  @Input() set from(value: Date | undefined) {
    this.forcedTimeMin = value;
  }

  /** The end time to use. */
  @Input() set till(value: Date | undefined) {
    this.forcedTimeMax = value;
  }

  /** The data arrays to use. */
  @Input() set data(dat: (Ohlcv[] | Quote[] | Trade[] | Scalar[])[]) {
    // Assume all data series are sorted on time and has the same time stamps.
    let minTime = MAX_DATE;
    let maxTime = MIN_DATE;
    let maxValue = -Infinity;
    let empty = true;

    const bandArrayCollection: (Band[])[] = [];
    let maxLen = 0;
    for (const d of dat) {
      bandArrayCollection.push([]);
      const len = d.length;
      if (len < 1) {
        continue;
      }
      empty = false;
      if (maxLen < len) {
        maxLen = len;
      }
      if (minTime > d[0].time) {
        minTime = d[0].time;
      }
      if (maxTime < d[len - 1].time) {
        maxTime = d[len - 1].time;
      }
    }
    const datLen = dat.length;
    for (let i = 0; i < maxLen; ++i) {
      let valPrev = 0;
      for (let k = 0; k < datLen; ++k) {
        const bandArray = bandArrayCollection[k];
        const d = dat[k];
        if (d.length > i) {
          let val = lineValueAccessor(d)(d[i]);
          if (!isNaN(val)) {
            val += valPrev;
            bandArray.push( { time: d[i].time, lower: valPrev, upper: val } );
            valPrev = val;
            if (maxValue < val) {
              maxValue = val;
            }
          }
        }
      }
    }
    this.currentDataEmpty = empty;
    this.dataTimeMin = minTime;
    this.dataTimeMax = maxTime;
    this.dataValueMax = maxValue;
    this.currentDataStacked = bandArrayCollection;
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => this.render(), 0);
  }

  ngOnChanges(changes: any) {
    this.render();
  }

  @HostListener('window:resize', [])
  public render(): void {
    const sel = d3.select(this.elementRef.nativeElement);
    sel.select('svg').remove();
    const dat = this.currentDataStacked;
    if (this.currentDataEmpty || !dat || dat.length < 1) {
      return;
    }
    const cfg = this.currentConfiguration;

    const hasTimeAxisTop = this.timeAxis.includes('top');
    const hasTimeAxisBottom = this.timeAxis.includes('bottom');
    const hasValueAxisLeft = this.valueAxis.includes('left');
    const hasValueAxisRight = this.valueAxis.includes('right');
    const hasValueGrid = this.valueAxis.includes('grid');

    const marginLeft = (hasValueAxisLeft || hasValueGrid) ? VALUE_AXIS_WIDTH :
      ((hasTimeAxisTop || hasTimeAxisBottom) ? VALUE_AXIS_WIDTH / 3 : 0);
    const marginRight = hasValueAxisRight ? VALUE_AXIS_WIDTH :
      ((hasTimeAxisTop || hasTimeAxisBottom) ? VALUE_AXIS_WIDTH / 3 : 0);
    const marginTop = hasTimeAxisTop ? TIME_AXIS_HEIGHT :
      ((hasValueAxisLeft || hasValueAxisRight || hasValueGrid) ? TIME_AXIS_HEIGHT / 3 : 0);
    const marginBottom = hasTimeAxisBottom ? TIME_AXIS_HEIGHT :
      ((hasValueAxisLeft || hasValueAxisRight || hasValueGrid) ? TIME_AXIS_HEIGHT / 3 : 0);

    const computed = computeDimensions(this.elementRef, this.width, this.height, DEFAULT_WIDTH, DEFAULT_HEIGHT);
    const w = computed[0];
    const h = computed[1];

    const svg: any = sel.append('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);

    const timeMin = this.forcedTimeMin === undefined ? this.dataTimeMin : this.forcedTimeMin;
    const timeMax = this.forcedTimeMax === undefined ? this.dataTimeMax : this.forcedTimeMax;
    const xScale = d3.scaleUtc().range([marginLeft, w - marginRight]).domain([timeMin, timeMax]);
    if (hasTimeAxisTop) {
      xScale.nice();
      const xAxis = (g: any) => g
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('fill', 'none')
        .attr('transform', `translate(0,${marginTop})`)
        .call(d3.axisTop(xScale).ticks(w / PIXELS_BETWEEN_TIME_TICKS).tickSizeOuter(0));
      svg.append('g').call(xAxis);
    }
    if (hasTimeAxisBottom) {
      xScale.nice();
      const xAxis = (g: any) => g
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('fill', 'none')
        .attr('transform', `translate(0,${h - marginBottom})`)
        .call(d3.axisBottom(xScale).ticks(w / PIXELS_BETWEEN_TIME_TICKS).tickSizeOuter(0));
      svg.append('g').call(xAxis);
    }

    const min: number = this.forcedValueMin === undefined ? 0 : this.forcedValueMin;
    const max: number = this.forcedValueMax === undefined ? this.dataValueMax : this.forcedValueMax;
    const yScale = d3.scaleLinear().domain([min, max]).range([h - marginBottom, marginTop]);
    if (hasValueAxisLeft && !hasValueGrid) {
      yScale.nice();
      const yAxis = (g: any) => g
        .attr('transform', `translate(${marginLeft},0)`)
        .call(d3.axisLeft(yScale).ticks(h / PIXELS_BETWEEN_VALUE_TICKS).tickSizeOuter(0));
      svg.append('g').call(yAxis);
    }
    if (hasValueAxisRight) {
      yScale.nice();
      const yAxis = (g: any) => g
        .attr('transform', `translate(${w - marginRight},0)`)
        .call(d3.axisRight(yScale).ticks(h / PIXELS_BETWEEN_VALUE_TICKS).tickSizeOuter(0));
      svg.append('g').call(yAxis);
    }
    if (hasValueGrid) {
      yScale.nice();
      const yAxis = (g: any) => g
        .attr('transform', `translate(${marginLeft},0)`)
        .call(d3.axisLeft(yScale).ticks(h / PIXELS_BETWEEN_VALUE_TICKS).tickSizeOuter(0))
        .call((q: any) => {
          if (!hasValueAxisLeft) {
            q.select('.domain').remove();
          }
        })
        .call((q: any) => q.selectAll(hasTimeAxisBottom ? '.tick:not(:first-of-type) line' : '.tick line')
          .clone()
          .attr('x2', w - marginLeft - marginRight)
          .attr('stroke', 'currentColor')
          // .attr('stroke-dasharray', '1,1')
          .attr('stroke-width', 0.3));
      svg.append('g').call(yAxis);
    }

    const cfgLen = cfg.length;
    for (let i = 0; i < dat.length; ++i) {
      const dati = dat[i];
      const cfgi = i < cfgLen ? cfg[i] : DEFAULT_LINE_CONFIGURATION;
      const interp = cfgi.interpolation ? cfgi.interpolation : DEFAULT_LINE_INTERPOLATION;
      if (cfgi.fillColor && cfgi.fillColor !== 'none') {
        const area: any = d3.area()
          .curve(convertInterpolation(interp))
          .defined((d: any) => d.time >= timeMin && d.time <= timeMax)
          .x((d: any) => xScale(d.time) as number)
          .y0((d: any) => yScale(d.lower) as number)
          .y1((d: any) => yScale(d.upper) as number);
        svg.append('path')
          .datum(dati)
          .attr('fill', cfgi.fillColor)
          .attr('d', area);
      }
      if (cfgi.strokeColor && cfgi.strokeWidth && cfgi.strokeWidth > 0 && cfgi.strokeColor !== 'none') {
        const line: any = d3.line()
          .curve(convertInterpolation(interp))
          .defined((d: any) => d.time >= timeMin && d.time <= timeMax)
          .x((d: any) => xScale(d.time) as number)
          .y((d: any) => yScale(d.upper) as number);
        svg.append('path')
          .datum(dati)
          .attr('stroke-width', cfgi.strokeWidth)
          .attr('stroke', cfgi.strokeColor)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .style('fill', 'none')
          .attr('d', line);
      }
    }
  }
}
