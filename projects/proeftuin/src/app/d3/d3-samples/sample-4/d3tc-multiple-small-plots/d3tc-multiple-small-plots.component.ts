import { Component, ElementRef, input, viewChild, ChangeDetectionStrategy, PLATFORM_ID, inject, HostListener, afterNextRender } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-sample-d3tc-multiple-small-plots',
  templateUrl: './d3tc-multiple-small-plots.component.html',
  styleUrls: ['./d3tc-multiple-small-plots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3tcMultipleSmallPlotsComponent {
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

    function chart(id: string, fullWidth: number, fullHeight: number) {
      const margin = { top: 20, right: 20, bottom: 20, left: 40 };
      const svg: any = d3.select(id)
        .attr('width', fullWidth)
        .attr('height', fullHeight)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      const width = fullWidth - margin.left - margin.right;
      const height = fullHeight - margin.top - margin.bottom;

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

      function draw(dat: any) {
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
      d3.select('#d3tc-candlesticks-button').on('click', () => { draw(toggle ? data : d); toggle = !toggle; });
      // data end ----------------------------------
    }

    const w = this.container().nativeElement.getBoundingClientRect().width / 3;
    const h = this.svgheight();

    d3.select('#d3tc-multiple-small-plots-1').remove();
    d3.select('#d3tc-multiple-small-plots-2').remove();
    d3.select('#d3tc-multiple-small-plots-3').remove();

    const nativeElement = this.element.nativeElement;
    d3.select(nativeElement)
      .append('svg')
      .attr('id', 'd3tc-multiple-small-plots-1');
    d3.select(nativeElement)
      .append('svg')
      .attr('id', 'd3tc-multiple-small-plots-2');
    d3.select(nativeElement)
      .append('svg')
      .attr('id', 'd3tc-multiple-small-plots-3');

    chart('#d3tc-multiple-small-plots-1', w, h);
    chart('#d3tc-multiple-small-plots-2', w, h);
    chart('#d3tc-multiple-small-plots-3', w, h);
  }
}
