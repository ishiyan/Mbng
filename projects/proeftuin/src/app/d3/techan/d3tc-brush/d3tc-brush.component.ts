import { Component, ElementRef, ViewEncapsulation, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, afterNextRender, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily-big';

@Component({
  selector: 'app-d3-techan-d3tc-brush',
  templateUrl: './d3tc-brush.component.html',
  styleUrls: ['./d3tc-brush.component.scss'],
  encapsulation: ViewEncapsulation.None, // does not see css without this
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class D3tcBrushComponent implements OnDestroy {
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

    const margin = { top: 10, bottom: 20, right: 80, left: 35 };
    const marginNav = { top: this.svgheight() - 30 - 40, bottom: 40, right: margin.right, left: margin.left };

    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const svg: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight())
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = marginNav.top - margin.top - margin.bottom;
    const heightNav = this.svgheight() - marginNav.top - marginNav.bottom;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = primitives.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const yVolume = d3.scaleLinear().range([y(0) as number, y(0.3) as number]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const xNav = primitives.scale.financetime().range([0, width]);
    const yNav = d3.scaleLinear().range([heightNav, 0]);
    const brush = d3.brushX().extent([[0, 0], [width, heightNav]]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const candlestick = primitives.plot.candlestick().xScale(x).yScale(y);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const volume = primitives.plot.volume().xScale(x).yScale(yVolume);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const close = primitives.plot.closeline().xScale(xNav).yScale(yNav);
    // const area = d3.area().curve(d3.curveMonotoneX)
    //     .x(function(d) { return xNav(d['time']); }).y0(heightNav).y1(function(d) { return yNav(d['close']); });

    const accessor = candlestick.accessor();

    const xAxisBottom = d3.axisBottom(x);
    const xAxisNavBottom = d3.axisBottom(xNav);
    const yAxisLeft = d3.axisLeft(y);
    // const yAxisNavLeft = d3.axisLeft(yNav).ticks(0);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ohlcAnnotationLeft = primitives.plot.axisannotation().axis(yAxisLeft).orient('left')
      .format(d3.format(',.2f'));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const timeAnnotationBottom = primitives.plot.axisannotation().axis(xAxisBottom).orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d')).width(65).translate([0, height]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const crosshair = primitives.plot.crosshair().xScale(x).yScale(y)
      .xAnnotation(timeAnnotationBottom).yAnnotation(ohlcAnnotationLeft);

    const focus = svg.append('g').attr('class', 'focus').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    focus.append('clipPath').attr('id', 'clip')
      .append('rect').attr('x', 0).attr('y', y(1)).attr('width', width).attr('height', y(0) as number - y(1) as number);
    focus.append('g').attr('class', 'volume').attr('clip-path', 'url(#clip)');
    focus.append('g').attr('class', 'candlestick').attr('clip-path', 'url(#clip)');
    focus.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    focus.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text('Price');
    focus.append('g').attr('class', 'crosshair').call(crosshair);

    const nav = svg.append('g').attr('class', 'context')
      .attr('transform', 'translate(' + marginNav.left + ',' + marginNav.top + ')');
    nav.append('g').attr('class', 'close');
    // nav.append('g').attr('class', 'area');
    nav.append('g').attr('class', 'pane');
    nav.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + heightNav + ')');
    // nav.append('g').attr('class', 'y axis').call(yAxisNavLeft);

    function draw() {
      const candlestickSelection = focus.select('g.candlestick');
      const datum = candlestickSelection.datum();
      y.domain(primitives.scale.plot.ohlc(datum.slice.apply(datum, x.zoomable().domain()), accessor).domain());
      candlestickSelection.call(candlestick);
      focus.select('g.volume').call(volume);

      // Using refresh method is more efficient as it does not perform any data joins
      // Use this if underlying data is not changing
      svg.select('g.candlestick').call(candlestick.refresh);

      focus.select('g.x.axis').call(xAxisBottom);
      focus.select('g.y.axis').call(yAxisLeft);
    }

    function brushed(event: any) {
      const zoomable = x.zoomable();
      const zoomableNav = xNav.zoomable();
      zoomable.domain(zoomableNav.domain());
      if (event.selection !== null) {
        zoomable.domain(event.selection.map(zoomable.invert));
      }
      draw();
    }

    brush.on('end', brushed);

    // data begin ----------------------------------
    x.domain(data.map(accessor.time));
    xNav.domain(x.domain());
    y.domain(primitives.scale.plot.ohlc(data, accessor).domain());
    yNav.domain(y.domain());
    yVolume.domain(primitives.scale.plot.volume(data).domain());

    focus.select('g.candlestick').datum(data);
    focus.select('g.volume').datum(data);

    nav.select('g.close').datum(data).call(close);
    // nav.select('g.area').datum(data).call(area);
    nav.select('g.x.axis').call(xAxisNavBottom);

    // Associate the brush with the scale and render the brush only AFTER a domain has been applied
    nav.select('g.pane').call(brush).selectAll('rect').attr('height', heightNav);

    x.zoomable().domain(xNav.zoomable().domain());
    draw();
    // data end ----------------------------------
  }
}
