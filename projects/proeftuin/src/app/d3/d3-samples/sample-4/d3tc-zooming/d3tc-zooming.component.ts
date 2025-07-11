import { Component, ElementRef, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, HostListener, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-sample-d3tc-zooming',
  templateUrl: './d3tc-zooming.component.html',
  styleUrls: ['./d3tc-zooming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3tcZoomingComponent {
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

    svg.append('clipPath').attr('id', 'clip')
      .append('rect').attr('x', 0).attr('y', y(1)).attr('width', width).attr('height', y(0) as number - y(1) as number);
    svg.append('g').attr('class', 'candlestick').attr('clip-path', 'url(#clip)');
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis').append('text')
      .attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text('Price');

    function draw() {
      svg.select('g.candlestick').call(candlestick);
      // Using refresh method is more efficient as it does not perform any data joins
      // Use this if underlying data is not changing
      svg.select('g.candlestick').call(candlestick.refresh);
      svg.select('g.x.axis').call(xAxis);
      svg.select('g.y.axis').call(yAxis);
    }

    let zoomableInit: any;
    function zoomed(event: any) {
      const rescaledY = event.transform.rescaleY(y);
      yAxis.scale(rescaledY);
      candlestick.yScale(rescaledY);
      // Emulates D3 behaviour, required for financetime due to secondary zoomable scale
      x.zoomable().domain(event.transform.rescaleX(zoomableInit).domain());
      draw();
    }

    const zoom = d3.zoom().on('zoom', zoomed);
    svg.append('rect').attr('class', 'pane').attr('width', width).attr('height', height).call(zoom);

    // data begin ----------------------------------
    x.domain(data.map(accessor.time));
    y.domain(primitives.scale.plot.ohlc(data, accessor).domain());
    svg.select('g.candlestick').datum(data);
    draw();
    // Associate the zoom with the scale after a domain has been applied
    // Stash initial settings to store as baseline for zooming
    zoomableInit = x.zoomable().clamp(false).copy();
    // data end ----------------------------------
  }
}
