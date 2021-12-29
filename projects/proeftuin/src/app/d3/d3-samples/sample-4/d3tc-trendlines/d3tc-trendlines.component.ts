import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily';

@Component({
  selector: 'd3-sample-d3tc-trendlines',
  templateUrl: './d3tc-trendlines.component.html',
  styleUrls: ['./d3tc-trendlines.component.scss'],
  encapsulation: ViewEncapsulation.None // does not see css without this
})
export class D3tcTrendlinesComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const data: D3Ohlcv[] = dataOhlcvDaily;

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('width', w)
      .attr('height', this.svgheight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight - margin.top - margin.bottom;

    const x = d3tc.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const candlestick = d3tc.plot.candlestick().xScale(x).yScale(y);
    const accessor = candlestick.accessor();
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const valueText = svg.append('text').style('text-anchor', 'end').attr('class', 'coords').attr('x', width - 15).attr('y', 15);

    function refreshText(z: any) {
      const timeFormat = d3.timeFormat('%Y-%m-%d');
      const valueFormat = d3.format(',.2f');
      valueText.text(
        'start: [' + timeFormat(z.start.date) + ', ' + valueFormat(z.start.value) +
        '] end: [' + timeFormat(z.end.date) + ', ' + valueFormat(z.end.value) + ']'
      );
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

    const trendline = d3tc.plot.trendline().xScale(x).yScale(y).on('mouseenter', enter).on('mouseout', out).on('drag', drag);

    function draw(dat: D3Ohlcv[], trendlineDat: any) {
      x.domain(dat.map(accessor.d));
      y.domain(d3tc.scale.plot.ohlc(dat, accessor).domain());
      svg.selectAll('g.candlestick').datum(dat).call(candlestick);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
      svg.selectAll('g.trendlines').datum(trendlineDat).call(trendline).call(trendline.drag);
    }

    // data begin ----------------------------------
    svg.append('g').attr('class', 'candlestick');
    svg.append('g').attr('class', 'trendlines');
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em')
      .style('text-anchor', 'end').text('Price');

    const trendlineData = [
      { start: { date: new Date(2014, 1, 23), value: 25.91 }, end: { date: new Date(2014, 7, 24), value: 30.79 } },
      { start: { date: new Date(2014, 10, 15), value: 29.54 }, end: { date: new Date(2014, 11, 16), value: 25.69 } }
    ];
    let toggle = true;
    const d: D3Ohlcv[] = data.slice(0, data.length - 20);
    const t = trendlineData.slice(0, trendlineData.length - 1);
    draw(d, t);
    d3.select(this.element.nativeElement).select('button').on('click', () => {
      if (toggle) {
        draw(data, trendlineData);
      } else {
        draw(d, t);
      }
      toggle = !toggle;
    });
    // data end ----------------------------------
  }
}
