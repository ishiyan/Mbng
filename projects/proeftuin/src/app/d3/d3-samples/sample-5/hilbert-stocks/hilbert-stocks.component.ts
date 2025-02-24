import { Component, OnInit, ElementRef, inject } from '@angular/core';
import * as d3 from 'd3';

import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily-big';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as hilbert from '../hilbert';

@Component({
    selector: 'app-d3-sample-hilbert-stocks',
    templateUrl: './hilbert-stocks.component.html',
    styleUrls: ['./hilbert-stocks.component.scss']
})
export class HilbertStocksComponent implements OnInit {
  private element = inject(ElementRef);


  ngOnInit() {
    const w = 500;
    const svg: any = d3.select(this.element.nativeElement).select('svg')
      .attr('class', 'hilbert').attr('opacity', 1).attr('width', w + 10).attr('height', w + 30);

    const plot = (chart: any, lev: number, curve: any, data: Bar[]) => {
      const open = 'open';
      const dat: number[] = data.map((d): number => +d[open]);
      const level2 = Math.pow(2, lev / 2); // 1 << lev
      const x = d3.scaleLinear().domain([-.5, level2]).range([0, w]);
      const size = x(1) as number - x(0) as number + 1;
      console.log('level', lev, 'level2:', level2, 'size:', size);
      const min = Math.max(.0001, d3.min(dat) ?? 0);
      const max = d3.max(dat) ?? 1;
      const delta = max - min;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const colour = d3.scaleLog<string>().domain([Math.max(.0001, d3.min(dat)), d3.max(dat)]).range(['#00c', '#f90']);

      chart.append('text').attr('x', '5').attr('dy', '1em').text('rdsa@xams');
      const vis = chart.append('g').attr('transform', 'translate(5,25)');
      const square = vis.selectAll('rect').data(curve);
      square.enter().append('rect');
      square.exit().remove();
      vis.selectAll('rect')
        // .style('fill', function (d, i) { return isNaN(dat[i]) ? '#000f' : colour(dat[i]); })
        //.style('fill', (d: any, i: any) => dat[i] ? colour(dat[i]) : '#000f')
        .style('fill', (d: any, i: any) => dat[i] ? d3.interpolateViridis((dat[i]-min)/delta) : '#000f')
        .attr('x', (d: any) => x(d[0] - .5))
        .attr('y', (d: any) => x(d[1] - .5))
        .attr('width', size)
        .attr('height', size);
    };

    const level = 14;
    plot(svg, level, dataOhlcvDaily.map((d, i) => hilbert.d2xy(level, i)), dataOhlcvDaily);
  }
}
