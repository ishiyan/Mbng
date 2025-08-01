import { Component, ElementRef, ViewEncapsulation, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, HostListener, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { Scalar } from 'projects/mb/src/lib/data/entities/scalar';
import { dataScalarDailySp500 } from '../../data/data-scalar-daily-sp500';

// https://observablehq.com/@d3/focus-context

@Component({
  selector: 'app-d3-sample-brush-and-zoom-area-chart',
  templateUrl: './brush-and-zoom-area-chart.component.html',
  styleUrls: ['./brush-and-zoom-area-chart.component.scss'],
  encapsulation: ViewEncapsulation.None, // Otherwise it doesn't see the stylesheet.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrushAndZoomAreaChartComponent {
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

    //const data: D3DatePrice[] = d3Sp500;
    const data: Scalar[] = dataScalarDailySp500;

    const margin: any = { top: 20, right: 20, bottom: 110, left: 40 };
    const margin2: any = { top: 430, right: 20, bottom: 30, left: 40 };

    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const svg: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight());
    const width: number = +w - margin.left - margin.right;
    const height: number = +this.svgheight() - margin.top - margin.bottom;
    const height2: number = +this.svgheight() - margin2.top - margin2.bottom;

    const x = d3.scaleTime().range([0, width]);
    const x2 = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const y2 = d3.scaleLinear().range([height2, 0]);

    const xAxis = d3.axisBottom(x);
    const xAxis2 = d3.axisBottom(x2);
    const yAxis = d3.axisLeft(y);

    const brush = d3.brushX().extent([[0, 0], [width, height2]]);

    const zoom = d3.zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]]);

    const ti = 'time';
    const p = 'value';
    const area = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d: any) => x(d[ti]) as number)
      .y0(height)
      .y1((d: any) => y(d[p]) as number);

    const area2 = d3.area()
      .curve(d3.curveMonotoneX)
      .x((d: any) => x2(d[ti]) as number)
      .y0(height2)
      .y1((d: any) => y2(d[p]) as number);

    svg.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    const focus = svg.append('g')
      .attr('class', 'focus')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const context = svg.append('g')
      .attr('class', 'context')
      .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');

    // data begin ----------------------------------
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    x.domain(d3.extent(data, d => d.time));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    y.domain([0, d3.max(data, d => d.value)]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append('path').datum(data).attr('class', 'area').attr('d', area);

    focus.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(xAxis);

    focus.append('g').attr('class', 'axis axis--y').call(yAxis);

    context.append('path').datum(data).attr('class', 'area').attr('d', area2);

    context.append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height2 + ')').call(xAxis2);

    context.append('g').attr('class', 'brush').call(brush).call(brush.move, x.range());

    svg.append('rect').attr('class', 'zoom').attr('width', width).attr('height', height)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').call(zoom);
    // data end ----------------------------------

    brush.on('brush end', (event: any) => {
      if (event.type === 'brush') {
        const s = event.selection || x2.range();
        x.domain(s.map(x2.invert, x2));
        focus.select('.area').attr('d', area);
        focus.select('.axis--x').call(xAxis);
      }
    });

    zoom.on('zoom', (event: any) => {
      if (event.type === 'zoom') {
        const t = event.transform;
        x.domain(t.rescaleX(x2).domain());
        focus.select('.area').attr('d', area);
        focus.select('.axis--x').call(xAxis);
        context.select('.brush').call(brush.move, x.range().map(t.invertX, t));
        }
    });
  }
}
