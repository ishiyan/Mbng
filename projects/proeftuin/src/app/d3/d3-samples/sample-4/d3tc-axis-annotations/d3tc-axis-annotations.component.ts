import { Component, ElementRef, ViewEncapsulation, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, HostListener, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButton } from '@angular/material/button';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-sample-d3tc-axis-annotations',
  templateUrl: './d3tc-axis-annotations.component.html',
  styleUrls: ['./d3tc-axis-annotations.component.scss'],
  encapsulation: ViewEncapsulation.None, // does not see annotation css without this
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton]
})
export class D3tcAxisAnnotationsComponent {
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

    const margin = { top: 20, right: 50 + 20, bottom: 20, left: 50 + 20 };
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

    const xAxisBottom = d3.axisBottom(x);
    const xAxisTop = d3.axisTop(x);
    const yAxisLeft = d3.axisLeft(y);
    const yAxisRight = d3.axisRight(y);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ohlcAnnotationLeft = primitives.plot.axisannotation().axis(yAxisLeft).orient('left')
      .accessor(accessor).format(d3.format(',.2f'));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ohlcAnnotationRight = primitives.plot.axisannotation().axis(yAxisRight).orient('right')
      .accessor(accessor).format(d3.format(',.2f')).translate([width, 0]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const timeAnnotationBottom = primitives.plot.axisannotation().axis(xAxisBottom).orient('bottom')
      .accessor(accessor.time).format(d3.timeFormat('%Y-%m-%d')).width(65);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const timeAnnotationTop = primitives.plot.axisannotation().axis(xAxisTop).orient('top')
      .accessor(accessor.time).format(d3.timeFormat('%Y-%m-%d')).width(65);

    function draw(dat: Bar[], topData: any, leftData: any, rightData: any, bottomData: any) {
      x.domain(dat.map(accessor.time));
      y.domain(primitives.scale.plot.ohlc(dat, accessor).domain());

      svg.selectAll('g.candlestick').datum(dat).call(candlestick);
      svg.selectAll('g.x.axis.bottom').call(xAxisBottom);
      svg.selectAll('g.x.axis.top').call(xAxisTop);
      svg.selectAll('g.y.axis.left').call(yAxisLeft);
      svg.selectAll('g.y.axis.right').call(yAxisRight);

      svg.selectAll('g.x.annotation.top').datum(topData).call(timeAnnotationTop);
      svg.selectAll('g.y.annotation.left').datum(leftData).call(ohlcAnnotationLeft);
      svg.selectAll('g.y.annotation.right').datum(rightData).call(ohlcAnnotationRight);
      svg.selectAll('g.x.annotation.bottom').datum(bottomData).call(timeAnnotationBottom);
    }

    // data begin ----------------------------------
    svg.append('g').attr('class', 'candlestick');
    svg.append('g').attr('class', 'x axis top');
    svg.append('g').attr('class', 'x axis bottom').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis left');
    svg.append('g').attr('class', 'y axis right').attr('transform', 'translate(' + width + ',0)');
    svg.append('g').attr('class', 'y annotation left');
    svg.append('g').attr('class', 'x annotation bottom').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y annotation right');
    svg.append('g').attr('class', 'x annotation top');

    let toggle = true;
    const d: Bar[] = data.slice(0, data.length - 20);
    draw(d, [data[80]], [data[130], data[0]], [data[80]], [data[30]]);
    d3.select(this.element.nativeElement).select('button').on('click', () => {
      if (toggle) {
        draw(data, [data[80]], [data[131], data[100]], [data[188], data[80]], [data[30], data[100]]);
      } else {
        draw(d, [data[80]], [data[130], data[0]], [data[80]], [data[30]]);
      }
      toggle = !toggle;
    });
    // data end ----------------------------------
  }
}
