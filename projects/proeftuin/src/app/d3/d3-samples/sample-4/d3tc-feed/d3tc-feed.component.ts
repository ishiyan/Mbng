import { Component, ElementRef, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, HostListener, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-sample-d3tc-feed',
  templateUrl: './d3tc-feed.component.html',
  styleUrls: ['./d3tc-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3tcFeedComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef);
  readonly container = viewChild.required<ElementRef>('container');
  readonly svgheight = input<any>();

  constructor() {
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

    const data: Bar[] = dataOhlcvDaily;

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const sv: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight());
    const defs = sv.append('defs');
    const svg = sv.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight() - margin.top - margin.bottom;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = primitives.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const yVolume = d3.scaleLinear().range([y(0) as number, y(0.2) as number]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ohlc = primitives.plot.ohlc().xScale(x).yScale(y);
    const accessor = ohlc.accessor();
    // Set the accessor to a ohlc accessor so we get highlighted bars.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const volume = primitives.plot.volume().accessor(ohlc.accessor()).xScale(x).yScale(yVolume);
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const volumeAxis = d3.axisRight(yVolume).ticks(3).tickFormat(d3.format(',.3s'));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const timeAnnotation = primitives.plot.axisannotation().axis(xAxis).orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d')).width(65).translate([0, height]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ohlcAnnotation = primitives.plot.axisannotation().axis(yAxis).orient('left').format(d3.format(',.2f'));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const volumeAnnotation = primitives.plot.axisannotation().axis(volumeAxis).orient('right').width(35);

    defs.append('clipPath').attr('id', 'ohlcClip')
      .append('rect').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height);
    const ohlcSelection = svg.append('g').attr('class', 'ohlc').attr('transform', 'translate(0,0)');
    ohlcSelection.append('g').attr('class', 'volume').attr('clip-path', 'url(#ohlcClip)');
    ohlcSelection.append('g').attr('class', 'candlestick').attr('clip-path', 'url(#ohlcClip)');

    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text('Price');
    svg.append('g').attr('class', 'volume axis');
    svg.append('g').attr('class', 'crosshair ohlc');

    const coordsText = svg.append('text').style('text-anchor', 'end').attr('class', 'coords').attr('x', width - 5).attr('y', 15);
    function move(coords: any) {
      coordsText.text(timeAnnotation.format()(coords.x) + ', ' + ohlcAnnotation.format()(coords.y));
    }
    // @ts-ignore
    const crosshair = primitives.plot.crosshair().xScale(x).yScale(y)
      .xAnnotation(timeAnnotation).yAnnotation([ohlcAnnotation, volumeAnnotation]).on('move', move);

    const feed = data;
    function redraw(dat: Bar[]) {
      x.domain(dat.map(accessor.time));
      // Show only 150 points on the plot
      x.zoomable().domain([dat.length - 130, dat.length]);
      // Update y scale min max, only on viewable zoomable.domain()
      y.domain(primitives.scale.plot.ohlc(dat.slice(dat.length - 130, dat.length)).domain());
      yVolume.domain(primitives.scale.plot.volume(dat.slice(dat.length - 130, dat.length)).domain());
      // Setup a transition for all that support
      svg.transition() // Disable transition for now, each is only for transitions
        .each(function() {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          // @ts-ignore
          const selection = d3.select(this);
          selection.select('g.x.axis').call(xAxis as any);
          selection.select('g.y.axis').call(yAxis as any);
          selection.select('g.volume.axis').call(volumeAxis as any);
          selection.select('g.candlestick').datum(dat).call(ohlc);
          selection.select('g.volume').datum(dat).call(volume);
          svg.select('g.crosshair.ohlc').call(crosshair);
        });
      // Set next timer expiry
      setTimeout(() => {
        let newDat;
        if (dat.length < feed.length) {
          // Simulate a daily feed
          newDat = feed.slice(0, dat.length + 1);
        } else {
          // Simulate intra day updates when no feed is left
          const last = dat[dat.length - 1];
          // Last must be between high and low
          last.close = Math.round(((last.high - last.low) * Math.random()) * 10) / 10 + last.low;
          newDat = dat;
        }
        redraw(newDat);
      }, (Math.random() * 1000) + 400); // Randomly pick an interval to update the chart
    }

    // Start off an initial set of data
    redraw(feed.slice(0, 163));
  }
}
