import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as rtc from './realTimeChart.js';

@Component({
  selector: 'd3-sample-real-time-chart',
  templateUrl: './real-time-chart.component.html',
  styleUrls: ['./real-time-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RealTimeChartComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;
  private chart: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const viewDiv: any = d3.select(this.element.nativeElement).select('#viewDiv');
    const width = w - margin.left - margin.right;
    const height = this.svgheight - margin.top - margin.bottom;

    // define time scale
    const timeScale = d3.scaleLinear().domain([300, 1700]).range([300, 1700]).clamp(true);

    // define value scale
    const valueScale = d3.scaleLinear().domain([0, 1]).range([30, 95]);

    // mean and deviation for time interval in milliseconds
    const meanMs = 2000;
    const dev = 500;

    // generate initial data
    const normal = d3.randomNormal(meanMs, dev);
    let currMs = new Date().getTime() - 300000 - 4000;
    const data = d3.range(300).map((d, i, arr) => {
      const val = valueScale(Math.random()); // random data
      // const val = Math.round((d % 60) / 60 * 95); // ramp data
      const int = Math.round(timeScale(normal()) as number);
      currMs += int;
      const t = new Date(currMs);
      return { interval: int, value: val, time: t, ts: currMs };
    });

    // create the real time chart
    const chart = rtc.realTimeChart()
      // .title('Chart Title').yTitle('Y Scale').xTitle('X Scale')
      .border(false).width(w).height(this.svgheight).barWidth(2)
      .left(margin.left).top(margin.top).right(margin.right).bottom(margin.bottom)
      .initialData(data);

    // invoke the chart (alternative invocation is chart(chartDiv);)
    viewDiv.append('div').attr('id', 'chartDiv').call(chart);

    // drive data into the chart roughly every second
    // in a normal use case, real time data would arrive through the network or some other mechanism
    // let d = 0;
    chart.isRunning(true);
    this.chart = chart;
    function dataGenerator() {
      const timeout = Math.round(timeScale(normal()) as number);
      setTimeout(() => {
        // create new data item
        const now = new Date();
        const item = {
          value: valueScale(Math.random()), // random data
          // value: Math.round((d++ % 60) / 60 * 95), // ramp data
          time: now,
          color: 'forestgreen',
          ts: now.getTime(),
          interval: timeout
        };

        // send the datum to the chart
        chart.datum(item);

        // do forever
        if (chart.isRunning()) {
          dataGenerator();
        }
      }, timeout);
    }

    // start the data generator
    dataGenerator();
  }

  ngOnDestroy() {
    this.chart.isRunning(false);
  }
}
