import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily';

@Component({
  selector: 'd3-sample-d3tc-crosshair',
  templateUrl: './d3tc-crosshair.component.html',
  styleUrls: ['./d3tc-crosshair.component.scss']
})
export class D3tcCrosshairComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const data: D3Ohlcv[] = dataOhlcvDaily;

    const margin = { top: 20, right: 50 + 20, bottom: 20, left: 50 + 20 };
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('width', w)
      .attr('height', this.svgheight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight - margin.top - margin.bottom;
    const coordsText = svg.append('text').style('text-anchor', 'end').attr('class', 'coords').attr('x', width - 5).attr('y', 15);

    const x = d3tc.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const candlestick = d3tc.plot.candlestick().xScale(x).yScale(y);
    const accessor = candlestick.accessor();

    const xAxisBottom = d3.axisBottom(x);
    const xAxisTop = d3.axisTop(x);
    const yAxisLeft = d3.axisLeft(y);
    const yAxisRight = d3.axisRight(y);

    const ohlcAnnotationLeft = d3tc.plot.axisannotation().axis(yAxisLeft).orient('left')
      .format(d3.format(',.2f'));
    const ohlcAnnotationRight = d3tc.plot.axisannotation().axis(yAxisRight).orient('right')
      .translate([width, 0]);
    const timeAnnotationBottom = d3tc.plot.axisannotation().axis(xAxisBottom).orient('bottom')
      .format(d3.timeFormat('%Y-%m-%d')).width(65).translate([0, height]);
    const timeAnnotationTop = d3tc.plot.axisannotation().axis(xAxisTop).orient('top');

    function enter() {
      coordsText.style('display', 'inline');
    }

    function out() {
      coordsText.style('display', 'none');
    }

    function move(coords: any) {
      coordsText.text(timeAnnotationBottom.format()(coords.x) + ', ' + ohlcAnnotationLeft.format()(coords.y));
    }

    const crosshair = d3tc.plot.crosshair().xScale(x).yScale(y)
      .xAnnotation([timeAnnotationBottom, timeAnnotationTop]).yAnnotation([ohlcAnnotationLeft, ohlcAnnotationRight])
      .on('enter', enter).on('out', out).on('move', move);

    function draw(dat: D3Ohlcv[], topData: any, leftData: any, rightData: any, bottomData: any) {
      x.domain(dat.map(accessor.d));
      y.domain(d3tc.scale.plot.ohlc(dat, accessor).domain());

      svg.selectAll('g.candlestick').datum(dat).call(candlestick);
      svg.selectAll('g.x.axis.top').call(xAxisTop);
      svg.selectAll('g.x.axis.bottom').call(xAxisBottom);
      svg.selectAll('g.y.axis.left').call(yAxisLeft);
      svg.selectAll('g.y.axis.right').call(yAxisRight);

      svg.selectAll('g.crosshair').datum({ x: x.domain()[80], y: 67.5 }).call(crosshair).each((d: any) => move(d));
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
