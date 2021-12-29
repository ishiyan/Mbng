import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily';

@Component({
  selector: 'd3-sample-d3tc-multiple-small-plots',
  templateUrl: './d3tc-multiple-small-plots.component.html',
  styleUrls: ['./d3tc-multiple-small-plots.component.scss']
})
export class D3tcMultipleSmallPlotsComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;

  ngOnInit() {
    const data: D3Ohlcv[] = dataOhlcvDaily;

    function chart(id: string, fullWidth: number, fullHeight: number) {
      const margin = { top: 20, right: 20, bottom: 20, left: 40 };
      const svg: any = d3.select(id)
        .attr('width', fullWidth)
        .attr('height', fullHeight)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      const width = fullWidth - margin.left - margin.right;
      const height = fullHeight - margin.top - margin.bottom;

      const x = d3tc.scale.financetime().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);
      const candlestick = d3tc.plot.candlestick().xScale(x).yScale(y);
      const accessor = candlestick.accessor();
      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      function draw(dat: any) {
        x.domain(dat.map(accessor.d));
        y.domain(d3tc.scale.plot.ohlc(dat, accessor).domain());
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
      const d: D3Ohlcv[] = data.slice(0, data.length - 20);
      draw(d);
      d3.select('#d3tc-candlesticks-button').on('click', () => { draw(toggle ? data : d); toggle = !toggle; });
      // data end ----------------------------------
    }

    const w = this.container.nativeElement.getBoundingClientRect().width / 3;
    const h = this.svgheight;

    chart('#d3tc-multiple-small-plots-1', w, h);
    chart('#d3tc-multiple-small-plots-2', w, h);
    chart('#d3tc-multiple-small-plots-3', w, h);
  }
}
