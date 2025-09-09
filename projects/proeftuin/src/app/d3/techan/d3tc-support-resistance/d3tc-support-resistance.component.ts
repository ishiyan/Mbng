import { Component, ElementRef, ViewEncapsulation, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, HostListener, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButton } from '@angular/material/button';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-techan-d3tc-support-resistance',
  templateUrl: './d3tc-support-resistance.component.html',
  styleUrls: ['./d3tc-support-resistance.component.scss'],
  encapsulation: ViewEncapsulation.None, // does not see css without this
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton]
})
export class D3tcSupportResistanceComponent {
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

    const margin = { top: 20, right: 20, bottom: 20, left: 50 + 20 };
    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const svg: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight());
    const width = w - margin.left - margin.right;
    const height = this.svgheight() - margin.top - margin.bottom;
    const defs = svg.append('defs');
    defs.append('clipPath').attr('id', 'ohlcClip')
      .append('rect').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height);
    defs.append('clipPath').attr('id', 'supstanceClip')
      .append('rect').attr('x', -margin.left).attr('y', 0).attr('width', width + margin.left).attr('height', height);
    const g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const valueText = g.append('text').style('text-anchor', 'end').attr('class', 'coords').attr('x', width - 5).attr('y', 15);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = primitives.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const percent = y.copy();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const candlestick = primitives.plot.candlestick().xScale(x).yScale(y);
    const accessor = candlestick.accessor();
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const percentAxis = d3.axisRight(percent);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ohlcAnnotation = primitives.plot.axisannotation().axis(yAxis).orient('left').format(d3.format(',.2f'));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const percentAnnotation = primitives.plot.axisannotation().axis(percentAxis).orient('right').format(d3.format('+.1%'));

    function refreshText(z: any) {
      const valueFormat = d3.format(',.2f');
      valueText.text('value: ' + valueFormat(z.value));
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
    const supstance = primitives.plot.supstance().xScale(x).yScale(y).annotation([ohlcAnnotation, percentAnnotation])
      .on('mouseenter', enter).on('mouseout', out).on('drag', drag);

    function draw(dat: Bar[], sup: any) {
      x.domain(dat.map(accessor.time));
      y.domain(primitives.scale.plot.ohlc(dat, accessor).domain());
      percent.domain(primitives.scale.plot.percent(y, accessor(dat[0])).domain());

      g.selectAll('g.candlestick').datum(dat).call(candlestick);
      g.selectAll('g.x.axis').call(xAxis);
      g.selectAll('g.y.axis').call(yAxis);
      g.selectAll('g.supstances').datum(sup).call(supstance).call(supstance.drag);
    }

    // data begin ----------------------------------
    g.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    g.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text('Price');
    g.append('g').attr('class', 'candlestick');
    g.append('g').attr('class', 'supstances').attr('clip-path', 'url(#supstanceClip)');

    const supstanceData = [
      { value: 25.64 },
      { start: new Date(2014, 3, 10), end: new Date(2014, 10, 12), value: 29.79 },
      { start: new Date(2014, 3, 16), end: new Date(2014, 11, 24), value: 27.36 }
    ];
    let toggle = true;
    const d: Bar[] = data.slice(0, data.length - 20);
    const t = supstanceData.slice(0, supstanceData.length - 1);
    draw(d, t);
    d3.select(this.element.nativeElement).select('button').on('click', () => {
      if (toggle) {
        draw(data, supstanceData);
      } else {
        draw(d, t);
      }
      toggle = !toggle;
    });
    // data end ----------------------------------
  }
}
