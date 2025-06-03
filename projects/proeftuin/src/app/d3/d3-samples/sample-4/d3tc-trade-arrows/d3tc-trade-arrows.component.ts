import { Component, ElementRef, ViewEncapsulation, input, viewChild, inject, ChangeDetectionStrategy, PLATFORM_ID, HostListener, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButton } from '@angular/material/button';
import * as d3 from 'd3';

import { primitives } from 'projects/mb/src/lib/charts/d3-primitives';
import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';

@Component({
  selector: 'app-d3-sample-d3tc-trade-arrows',
  templateUrl: './d3tc-trade-arrows.component.html',
  styleUrls: ['./d3tc-trade-arrows.component.scss'],
  encapsulation: ViewEncapsulation.None, // does not see css without this
  changeDetection: ChangeDetectionStrategy.OnPush,    
  imports: [MatButton]
})
export class D3tcTradeArrowsComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef);
  readonly container = viewChild.required<ElementRef>('container');
  readonly svgheight = input<any>();

  constructor() {
    afterNextRender({
      write: () => {
        this.render();
      }
    });
  }

  @HostListener('window:resize', [])
  render() {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const data: Bar[] = dataOhlcvDaily;

    const margin = { top: 20, right: 20, bottom: 20, left: 40 };
    const w = this.container().nativeElement.getBoundingClientRect().width;
    d3.select(this.element.nativeElement).select('svg').remove();
    const svg: any = d3.select(this.element.nativeElement).append('svg')
      .attr('width', w)
      .attr('height', this.svgheight())
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const width = w - margin.left - margin.right;
    const height = this.svgheight() - margin.top - margin.bottom;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const x = primitives.scale.financetime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const candlestick = primitives.plot.candlestick().xScale(x).yScale(y);
    const accessor = candlestick.accessor();
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    const valueText = svg.append('text')
      .style('text-anchor', 'end')
      .attr('class', 'coords')
      .attr('x', width - 5)
      .attr('y', 15);

    function refreshText(z: any) {
      const dateFormat = d3.timeFormat('%d-%b-%y');
      const valueFormat = d3.format(',.2f');
      valueText.text(dateFormat(z.time) + ', ' + z.type + ', ' + z.quantity + '@' + valueFormat(z.price));
    }
    function enter(z: any) {
      valueText.style('display', 'inline');
      refreshText(z);
    }
    function out() {
      valueText.style('display', 'none');
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tradearrow = primitives.plot.tradearrow().xScale(x).yScale(y)
      .on('mouseenter', enter)
      .on('mouseout', out);

    function draw(dat: Bar[], trad: any) {
      x.domain(dat.map(accessor.time));
      y.domain(primitives.scale.plot.ohlc(dat, accessor).domain());
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
      { time: data[67].time, type: 'buy', price: data[67].low, quantity: 1000 },
      { time: data[100].time, type: 'sell', price: data[100].high, quantity: 200 },
      { time: data[156].time, type: 'buy', price: data[156].open, quantity: 500 },
      { time: data[167].time, type: 'sell', price: data[167].close, quantity: 300 },
      { time: data[187].time, type: 'buy-pending', price: data[187].low, quantity: 300 }
    ];
    let toggle = true;
    const d: Bar[] = data.slice(0, data.length - 20);
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
