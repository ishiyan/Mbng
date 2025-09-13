import { Component, ElementRef, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButton } from '@angular/material/button';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-techan-d3tc-candlesticks',
  templateUrl: './d3tc-candlesticks.component.html',
  styleUrls: ['./d3tc-candlesticks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton]
})
export class D3tcCandlesticksComponent implements OnDestroy {
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

    function draw(dat: Bar[]) {
      x.domain(dat.map(accessor.time));
      y.domain(primitives.scale.plot.ohlc(dat, accessor).domain());
      svg.selectAll('g.candlestick').datum(dat).call(candlestick);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }

    // data begin ----------------------------------
    svg.append('g').attr('class', 'candlestick');
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em')
      .style('text-anchor', 'end').text('Price');
    let toggle = true;
    const d: Bar[] = data.slice(0, data.length - 20);
    draw(d);
    d3.select(this.element.nativeElement).select('button').on('click', () => { draw(toggle ? data : d); toggle = !toggle; });
    // data end ----------------------------------
  }
}
