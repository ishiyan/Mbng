import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily-big';
// @ts-ignore
import * as hilbert from '../hilbert';

@Component({
  selector: 'd3-sample-hilbert-stocks',
  templateUrl: './hilbert-stocks.component.html',
  styleUrls: ['./hilbert-stocks.component.scss']
})
export class HilbertStocksComponent implements OnInit {

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const w = 500;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('class', 'hilbert').attr('opacity', 1).attr('width', w + 10).attr('height', w + 30);

    const plot = (chart: any, lev: number, curve: any, data: D3Ohlcv[]) => {
      const open = 'open';
      const dat: number[] = data.map((d): number => +d[open]);
      const level2 = Math.pow(2, lev / 2); // 1 << lev
      const x = d3.scaleLinear().domain([-.5, level2]).range([0, w]);
      // @ts-ignore
      const colour = d3.scaleLog<string>().domain([Math.max(.0001, d3.min(dat)), d3.max(dat)]).range(['#00c', '#f90']);

      chart.append('text').attr('x', '5').attr('dy', '1em').text('rdsa@xams');
      const vis = chart.append('g').attr('transform', 'translate(5,25)');
      const square = vis.selectAll('rect').data(curve);
      square.enter().append('rect');
      square.exit().remove();
      vis.selectAll('rect')
        // .style('fill', function (d, i) { return isNaN(dat[i]) ? '#000' : colour(dat[i]); })
        .style('fill', (d: any, i: any) => dat[i] ? colour(dat[i]) : '#000')
        .attr('x', (d: any) => x(d[0] - .5))
        .attr('y', (d: any) => x(d[1] - .5))
        .attr('width', x(1) as number - x(0) as number + 1)
        .attr('height', x(1) as number - x(0) as number + 1);
    };

    const level = 12;
    plot(svg, level, dataOhlcvDaily.map((d, i) => hilbert.d2xy(level, i)), dataOhlcvDaily);
  }
}
