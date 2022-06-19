import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
// zzz@ts-ignore
import { primitives } from 'projects/mb/src/lib/charts/d3-primitives' //'../../../../shared/d3tc';
import { Ohlcv } from 'projects/mb/src/lib/data/entities/ohlcv';

// import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'd3-sample-d3tc-candlesticks',
  templateUrl: './d3tc-candlesticks.component.html',
  styleUrls: ['./d3tc-candlesticks.component.scss']
})
export class D3tcCandlesticksComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const data: Ohlcv[] = dataOhlcvDaily;

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('width', w)
      .attr('height', this.svgheight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight - margin.top - margin.bottom;

    // @ts-ignore
    const x = primitives.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    // @ts-ignore
    const candlestick = primitives.plot.candlestick().xScale(x).yScale(y);
    const accessor = candlestick.accessor();
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    function draw(dat: Ohlcv[]) {
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
    const d: Ohlcv[] = data.slice(0, data.length - 20);
    draw(d);
    d3.select(this.element.nativeElement).select('button').on('click', () => { draw(toggle ? data : d); toggle = !toggle; });
    // data end ----------------------------------
  }
}
