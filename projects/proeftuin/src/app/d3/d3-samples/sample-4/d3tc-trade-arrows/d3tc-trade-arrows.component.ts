import { Component, OnInit, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily';

@Component({
  selector: 'd3-sample-d3tc-trade-arrows',
  templateUrl: './d3tc-trade-arrows.component.html',
  styleUrls: ['./d3tc-trade-arrows.component.scss'],
  encapsulation: ViewEncapsulation.None // does not see css without this
})
export class D3tcTradeArrowsComponent implements OnInit {
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
    const valueText = svg.append('text').style('text-anchor', 'end').attr('class', 'coords').attr('x', width - 5).attr('y', 15);

    function refreshText(z: any) {
      const dateFormat = d3.timeFormat('%d-%b-%y');
      const valueFormat = d3.format(',.2f');
      valueText.text('Trade: ' + dateFormat(z.date) + ', ' + z.type + ', ' + valueFormat(z.price));
    }
    function enter(z: any) {
      valueText.style('display', 'inline');
      refreshText(z);
    }
    function out() {
      valueText.style('display', 'none');
    }

    const tradearrow = d3tc.plot.tradearrow().xScale(x).yScale(y)
      .orient((z: any) => z.type.startsWith('buy') ? 'up' : 'down').on('mouseenter', enter).on('mouseout', out);

    function draw(dat: D3Ohlcv[], trad: any) {
      x.domain(dat.map(accessor.d));
      y.domain(d3tc.scale.plot.ohlc(dat, accessor).domain());
      svg.selectAll('g.candlestick').datum(dat).call(candlestick);
      svg.selectAll('g.tradearrow').datum(trad).call(tradearrow);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }

    // data begin ----------------------------------
    svg.append('g').attr('class', 'candlestick');
    svg.append('g').attr('class', 'tradearrow');
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')');
    svg.append('g').attr('class', 'y axis')
      .append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em')
      .style('text-anchor', 'end').text('Price');
    const trades = [
      { date: data[67].date, type: 'buy', price: data[67].low, quantity: 1000 },
      { date: data[100].date, type: 'sell', price: data[100].high, quantity: 200 },
      { date: data[156].date, type: 'buy', price: data[156].open, quantity: 500 },
      { date: data[167].date, type: 'sell', price: data[167].close, quantity: 300 },
      { date: data[187].date, type: 'buy-pending', price: data[187].low, quantity: 300 }
    ];
    let toggle = true;
    const d: D3Ohlcv[] = data.slice(0, data.length - 20);
    const t = trades.slice(0, trades.length - 1);
    draw(d, t);
    d3.select(this.element.nativeElement).select('button').on('click', () => {
      if (toggle) {
        draw(data, trades);
      } else {
        draw(d, t);
      }
      toggle = !toggle;
    });
    // data end ----------------------------------
  }
}
