import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily';
import { dataOhlcvIntraday } from '../../data/data-ohlcv-intraday';

@Component({
  selector: 'd3-sample-d3tc-finance-time',
  templateUrl: './d3tc-finance-time.component.html',
  styleUrls: ['./d3tc-finance-time.component.scss'],
  encapsulation: ViewEncapsulation.None // does not see css without this
})
export class D3tcFinanceTimeComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const dataDaily: D3Ohlcv[] = dataOhlcvDaily;
    const dataIntraday: D3Ohlcv[] = dataOhlcvIntraday;

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('width', w)
      .attr('height', this.svgheight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight - margin.top - margin.bottom;

    const zoom = d3.zoom();
    const x = d3.scaleTime().range([0, width]);
    const xUtc = d3.scaleUtc().range([0, width]);
    const xIntraday = d3.scaleTime().range([0, width]);
    const xIntradayUtc = d3.scaleUtc().range([0, width]);

    const time = d3tc.scale.financetime().range([0, width]);
    const timeNonClamped = d3tc.scale.financetime().range([0, width]);
    const timeUtcNonClamped = d3tc.scale.financetime.utc().range([0, width]);
    const intradayTime = d3tc.scale.financetime().range([0, width]);
    const intradayTimeNonClamped = d3tc.scale.financetime().range([0, width]);
    const intradayUtcTimeNonClamped = d3tc.scale.financetime.utc().range([0, width]);

    let timeInit: any;
    let timeNonClampedInit: any;
    let timeUtcNonClampedInit: any;
    let intradayTimeInit: any;
    let intradayTimeNonClampedInit: any;
    let intradayUtcTimeNonClampedInit: any;

    const xAxisD3 = d3.axisBottom(x);
    const xAxisD3Utc = d3.axisBottom(xUtc);
    const xAxisD3Intraday = d3.axisBottom(xIntraday);
    const xAxisD3IntradayUtc = d3.axisBottom(xIntradayUtc);

    const xAxis = d3.axisBottom(time);
    const xAxisNonClamped = d3.axisBottom(timeNonClamped);
    const xAxisUtcNonClamped = d3.axisBottom(timeUtcNonClamped);
    const xAxisIntraday = d3.axisBottom(intradayTime);
    const xAxisIntradayNonClamped = d3.axisBottom(intradayTimeNonClamped);
    const xAxisIntradayUtcNonClamped = d3.axisBottom(intradayUtcTimeNonClamped);

    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.05 + ')')
      .attr('y', -6)
      .text('Finance time intraday (clamped zoom)');
    svg.append('g')
      .attr('class', 'x axis intraday clamped')
      .attr('transform', 'translate(0,' + height * 0.05 + ')');

    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.15 + ')')
      .attr('y', -6)
      .text('Finance time intraday (non clamped zoom)');
    svg.append('g')
      .attr('class', 'x axis intraday nonclamped')
      .attr('transform', 'translate(0,' + height * 0.15 + ')');

    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.25 + ')')
      .attr('y', -6)
      .text('Finance time intraday UTC (non clamped zoom)');
    svg.append('g')
      .attr('class', 'x axis intraday-utc nonclamped')
      .attr('transform', 'translate(0,' + height * 0.25 + ')');

    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.35 + ')')
      .attr('y', -6)
      .text('D3 Time Intraday');
    svg.append('g')
      .attr('class', 'x axis d3 intraday')
      .attr('transform', 'translate(0,' + height * 0.35 + ')');

    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.45 + ')')
      .attr('y', -6)
      .text('D3 time intraday UTC');
    svg.append('g')
      .attr('class', 'x axis d3 intraday-utc')
      .attr('transform', 'translate(0,' + height * 0.45 + ')');

    svg.append('g')
      .attr('class', 'x axis daily clamped')
      .attr('transform', 'translate(0,' + height * 0.6 + ')');
    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.6 + ')')
      .attr('y', -6)
      .text('Finance time daily (clamped zoom)');

    svg.append('g')
      .attr('class', 'x axis daily nonclamped')
      .attr('transform', 'translate(0,' + height * 0.7 + ')');
    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.7 + ')')
      .attr('y', -6)
      .text('Finance time daily (non clamped zoom)');

    svg.append('g')
      .attr('class', 'x axis daily-utc nonclamped')
      .attr('transform', 'translate(0,' + height * 0.8 + ')');
    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.8 + ')')
      .attr('y', -6)
      .text('Finance time daily UTC (non clamped zoom)');

    svg.append('g')
      .attr('class', 'x axis d3 daily')
      .attr('transform', 'translate(0,' + height * 0.9 + ')');
    svg.append('text')
      .attr('transform', 'translate(0,' + height * 0.9 + ')')
      .attr('y', -6)
      .text('D3 time daily');

    svg.append('g')
      .attr('class', 'x axis d3 daily-utc')
      .attr('transform', 'translate(0,' + height + ')');
    svg.append('text')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('y', -6)
      .text('D3 time daily UTC');

    svg.append('rect').attr('class', 'pane').attr('width', width).attr('height', height).call(zoom);

    function draw() {
      svg.select('g.x.axis.d3.daily').call(xAxisD3);
      svg.select('g.x.axis.d3.daily-utc').call(xAxisD3Utc);
      svg.select('g.x.axis.daily.clamped').call(xAxis);
      svg.select('g.x.axis.daily.nonclamped').call(xAxisNonClamped);
      svg.select('g.x.axis.daily-utc.nonclamped').call(xAxisUtcNonClamped);
      svg.select('g.x.axis.d3.intraday').call(xAxisD3Intraday);
      svg.select('g.x.axis.d3.intraday-utc').call(xAxisD3IntradayUtc);
      svg.select('g.x.axis.intraday.clamped').call(xAxisIntraday);
      svg.select('g.x.axis.intraday.nonclamped').call(xAxisIntradayNonClamped);
      svg.select('g.x.axis.intraday-utc.nonclamped').call(xAxisIntradayUtcNonClamped);
    }

    function zoomed(event: any) {
      const transform = event.transform;
      time.zoomable().domain(transform.rescaleX(timeInit).domain());
      timeNonClamped.zoomable().domain(transform.rescaleX(timeNonClampedInit).domain());
      timeUtcNonClamped.zoomable().domain(transform.rescaleX(timeUtcNonClampedInit).domain());
      intradayTime.zoomable().domain(transform.rescaleX(intradayTimeInit).domain());
      intradayTimeNonClamped.zoomable().domain(transform.rescaleX(intradayTimeNonClampedInit).domain());
      intradayUtcTimeNonClamped.zoomable().domain(transform.rescaleX(intradayUtcTimeNonClampedInit).domain());
      xAxisD3.scale(transform.rescaleX(x));
      xAxisD3Utc.scale(transform.rescaleX(xUtc));
      xAxisD3Intraday.scale(transform.rescaleX(xIntraday));
      xAxisD3IntradayUtc.scale(transform.rescaleX(xIntradayUtc));
      draw();
    }

    zoom.on('zoom', zoomed);
    const accessor = d3tc.accessor.ohlc();

    // data begin ----------------------------------
    const d3evDaily = d3.extent(dataDaily, d => d.date);
    const vDaily = dataDaily.map(d => d.date);
    // @ts-ignore
    x.domain(d3evDaily);
    // @ts-ignore
    xUtc.domain(d3evDaily);
    timeInit = time.domain(vDaily).zoomable().copy();
    timeNonClampedInit = timeNonClamped.domain(vDaily).zoomable().clamp(false).copy();
    timeUtcNonClampedInit = timeUtcNonClamped.domain(vDaily).zoomable().clamp(false).copy();

    const d3evIntraday = d3.extent(dataIntraday, d => d.date);
    const vIntraday = dataIntraday.map(d => d.date);
    // @ts-ignore
    xIntraday.domain(d3evIntraday);
    // @ts-ignore
    xIntradayUtc.domain(d3evIntraday);
    intradayTimeInit = intradayTime.domain(vIntraday).zoomable().copy();
    intradayTimeNonClampedInit = intradayTimeNonClamped.domain(vIntraday).zoomable().clamp(false).copy();
    intradayUtcTimeNonClampedInit = intradayUtcTimeNonClamped.domain(vIntraday).zoomable().clamp(false).copy();
    draw();
    // data end ----------------------------------
  }
}
