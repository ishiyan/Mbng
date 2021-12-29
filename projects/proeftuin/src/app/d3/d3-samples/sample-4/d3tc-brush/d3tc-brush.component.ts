import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily-big';

@Component({
  selector: 'd3-sample-d3tc-brush',
  templateUrl: './d3tc-brush.component.html',
  styleUrls: ['./d3tc-brush.component.scss'],
  encapsulation: ViewEncapsulation.None // does not see css without this
})
export class D3tcBrushComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const data: D3Ohlcv[] = dataOhlcvDaily;

    const margin = { top: 10, bottom: 20, right: 80, left: 35 };
    const marginNav = { top: this.svgheight - 30 - 40, bottom: 40, right: margin.right, left: margin.left };

    const w = this.container.nativeElement.getBoundingClientRect().width;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('width', w)
      .attr('height', this.svgheight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = marginNav.top - margin.top - margin.bottom;
    const heightNav = this.svgheight - marginNav.top - marginNav.bottom;

    const x = d3tc.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const yVolume = d3.scaleLinear().range([y(0) as number, y(0.3) as number]);
    const xNav = d3tc.scale.financetime().range([0, width]);
    const yNav = d3.scaleLinear().range([heightNav, 0]);
    const brush = d3.brushX().extent([[0, 0], [width, heightNav]]);
    const candlestick = d3tc.plot.candlestick().xScale(x).yScale(y);
    const volume = d3tc.plot.volume().xScale(x).yScale(yVolume);
    const close = d3tc.plot.close().xScale(xNav).yScale(yNav);
    // const area = d3.area().curve(d3.curveMonotoneX)
    //     .x(function(d) { return xNav(d['date']); }).y0(heightNav).y1(function(d) { return yNav(d['close']); });

    const accessor = candlestick.accessor();

    const xAxisBottom = d3.axisBottom(x);
    const xAxisNavBottom = d3.axisBottom(xNav);
    const yAxisLeft = d3.axisLeft(y);
    // const yAxisNavLeft = d3.axisLeft(yNav).ticks(0);

    const ohlcAnnotationLeft = d3tc.plot.axisannotation().axis(yAxisLeft).orient('left')
      .format(d3.format(',.2f'));
    const timeAnnotationBottom = d3tc.plot.axisannotation().axis(xAxisBottom).orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d')).width(65).translate([0, height]);

    const crosshair = d3tc.plot.crosshair().xScale(x).yScale(y)
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
      y.domain(d3tc.scale.plot.ohlc(datum.slice.apply(datum, x.zoomable().domain()), accessor).domain());
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
    x.domain(data.map(accessor.d));
    xNav.domain(x.domain());
    y.domain(d3tc.scale.plot.ohlc(data, accessor).domain());
    yNav.domain(y.domain());
    yVolume.domain(d3tc.scale.plot.volume(data).domain());

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
