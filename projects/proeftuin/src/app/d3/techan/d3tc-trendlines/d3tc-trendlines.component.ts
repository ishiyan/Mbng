import { Component, ElementRef, ViewEncapsulation, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButton } from '@angular/material/button';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-techan-d3tc-trendlines',
  templateUrl: './d3tc-trendlines.component.html',
  styleUrls: ['./d3tc-trendlines.component.scss'],
  encapsulation: ViewEncapsulation.None, // does not see css without this
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton]
})
export class D3tcTrendlinesComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef);
  private resizeObserver?: ResizeObserver;

  readonly container = viewChild.required<ElementRef>('container');
  readonly svgheight = input<any>();

  constructor() {
    afterNextRender({
      write: () => {
        this.setupResizeObserver();
        this.render();
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private setupResizeObserver(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.render();
    });

    this.resizeObserver.observe(this.element.nativeElement);
  }
  
  private render() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const data: Bar[] = dataOhlcvDaily;

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const svg: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight())
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight() - margin.top - margin.bottom;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = primitives.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const candlestick = primitives.plot.candlestick().xScale(x).yScale(y);
    const accessor = candlestick.accessor();
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const valueText = svg.append('text').style('text-anchor', 'end').attr('class', 'coords').attr('x', width - 15).attr('y', 15);

    function refreshText(z: any) {
      const timeFormat = d3.timeFormat('%Y-%m-%d');
      const valueFormat = d3.format(',.2f');
      valueText.text(
        'start: [' + timeFormat(z.start.date) + ', ' + valueFormat(z.start.value) +
        '] end: [' + timeFormat(z.end.date) + ', ' + valueFormat(z.end.value) + ']'
      );
    }

    function enter(z: any) {
      valueText.style('display', 'inline');
      refreshText(z);
    }

    function out(z: any) {
      valueText.style('display', 'none');
    }

    function drag(z: any) {
      refreshText(z);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const trendline = primitives.plot.trendline().xScale(x).yScale(y).on('mouseenter', enter).on('mouseout', out).on('drag', drag);

    function draw(dat: Bar[], trendlineDat: any) {
      x.domain(dat.map(accessor.time));
      y.domain(primitives.scale.plot.ohlc(dat, accessor).domain());
      svg.selectAll('g.candlestick').datum(dat).call(candlestick);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
      svg.selectAll('g.trendlines').datum(trendlineDat).call(trendline).call(trendline.drag);
    }

    // data begin ----------------------------------
    svg.append('g').attr('class', 'candlestick');
    svg.append('g').attr('class', 'trendlines');
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em')
      .style('text-anchor', 'end').text('Price');

    const trendlineData = [
      { start: { time: new Date(2014, 1, 23), value: 25.91 }, end: { time: new Date(2014, 7, 24), value: 30.79 } },
      { start: { time: new Date(2014, 10, 15), value: 29.54 }, end: { time: new Date(2014, 11, 16), value: 25.69 } }
    ];
    let toggle = true;
    const d: Bar[] = data.slice(0, data.length - 20);
    const t = trendlineData.slice(0, trendlineData.length - 1);
    draw(d, t);
    d3.select(this.element.nativeElement).select('button').on('click', () => {
      if (toggle) {
        draw(data, trendlineData);
      } else {
        draw(d, t);
      }
      toggle = !toggle;
    });
    // data end ----------------------------------
  }
}
