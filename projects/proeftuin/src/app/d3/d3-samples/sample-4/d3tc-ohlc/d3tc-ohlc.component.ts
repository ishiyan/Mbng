import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily';


@Component({
  selector: 'd3-sample-d3tc-ohlc',
  templateUrl: './d3tc-ohlc.component.html',
  styleUrls: ['./d3tc-ohlc.component.scss'],
  encapsulation: ViewEncapsulation.None // does not see css without this
})
export class D3tcOhlcComponent implements OnInit {
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
    const ohlc = d3tc.plot.ohlc().xScale(x).yScale(y);
    const accessor = ohlc.accessor();
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    function draw(dat: D3Ohlcv[]) {
      x.domain(dat.map(accessor.d));
      y.domain(d3tc.scale.plot.ohlc(dat, accessor).domain());
      svg.selectAll('g.ohlc').datum(dat).call(ohlc);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }

    // data begin ----------------------------------
    svg.append('g').attr('class', 'ohlc');
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '12')
      .style('text-anchor', 'end').text('Price');
    let toggle = true;
    const d: D3Ohlcv[] = data.slice(0, data.length - 20);
    draw(d);
    d3.select(this.element.nativeElement).select('button').on('click', () => { draw(toggle ? data : d); toggle = !toggle; });
    // data end ----------------------------------
  }
}
