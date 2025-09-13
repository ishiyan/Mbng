import { Component, ElementRef, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-techan-d3tc-crosshair',
  templateUrl: './d3tc-crosshair.component.html',
  styleUrls: ['./d3tc-crosshair.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3tcCrosshairComponent implements OnDestroy {
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
    const coordsText = svg.append('text').style('text-anchor', 'end').attr('class', 'coords').attr('x', width - 5).attr('y', 15);

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
      .format(d3.format(',.2f'));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ohlcAnnotationRight = primitives.plot.axisannotation().axis(yAxisRight).orient('right')
      .translate([width, 0]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const timeAnnotationBottom = primitives.plot.axisannotation().axis(xAxisBottom).orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d')).width(65).translate([0, height]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const timeAnnotationTop = primitives.plot.axisannotation().axis(xAxisTop).orient('top');

    function enter() {
      coordsText.style('display', 'inline');
    }

    function out() {
      coordsText.style('display', 'none');
    }

    function move(coords: any) {
      coordsText.text(timeAnnotationBottom.format()(coords.x) + ', ' + ohlcAnnotationLeft.format()(coords.y));
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const crosshair = primitives.plot.crosshair().xScale(x).yScale(y)
      .xAnnotation([timeAnnotationBottom, timeAnnotationTop])
      .yAnnotation([ohlcAnnotationLeft, ohlcAnnotationRight])
      .on('enter', enter)
      .on('out', out)
      .on('move', move);

    function draw(dat: Bar[], topData: any, leftData: any, rightData: any, bottomData: any) {
      x.domain(dat.map(accessor.time));
      y.domain(primitives.scale.plot.ohlc(dat, accessor).domain());

      svg.selectAll('g.candlestick').datum(dat).call(candlestick);
      svg.selectAll('g.x.axis.top').call(xAxisTop);
      svg.selectAll('g.x.axis.bottom').call(xAxisBottom);
      svg.selectAll('g.y.axis.left').call(yAxisLeft);
      svg.selectAll('g.y.axis.right').call(yAxisRight);

      svg.selectAll('g.crosshair')
        .datum({ x: x.domain()[80], y: 67.5 })
        .call(crosshair)
        .each((d: any) => move(d));
    }

    // data begin ----------------------------------
    svg.append('g').attr('class', 'candlestick');
    svg.append('g').attr('class', 'x axis top');
    svg.append('g').attr('class', 'x axis bottom').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis left');
    svg.append('g').attr('class', 'y axis right').attr('transform', 'translate(' + width + ',0)');

    svg.append('g').attr('class', 'crosshair');
    svg.append('text').attr('x', 5).attr('y', 15).attr('class', 'coords').text('RDSA');
    draw(data, [data[80]], [data[131], data[100]], [data[188], data[80]], [data[30], data[100]]);
    // data end ----------------------------------
  }
}
