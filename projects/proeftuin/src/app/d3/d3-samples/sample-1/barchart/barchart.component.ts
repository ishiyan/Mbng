import { Component, ElementRef, input, viewChild, ChangeDetectionStrategy, PLATFORM_ID, HostListener, inject, effect, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-sample-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarchartComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = viewChild.required<ElementRef>('chart');
  public readonly data = input.required<Array<any>>();
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  private width!: number;
  private height!: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() {
    afterNextRender({
      write: () => {
        this.createChart();
        this.updateChart();
      }
    });
    effect(() => {
      this.data();
      this.updateChart();
    });
  }

  @HostListener('window:resize', [])
  createChart() {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const element = this.elementRef().nativeElement;
    let w = element.offsetWidth;
    let h = element.offsetHeight;

    this.width = w - this.margin.left - this.margin.right;
    this.height = h - this.margin.top - this.margin.bottom;
    const sel = d3.select(element);
    sel.select('svg').remove();

    const svg: any = sel.append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', w)
      .attr('height', h)
      .attr('viewBox', `0 0 ${w} ${h}`);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.data().map(d => d[0]);
    const yDomain = [0, d3.max(this.data(), d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data().length]).range(['green', 'blue'] as any[]);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    if (!this.chart) {
      return;
    }

    // update scales & axis
    const data = this.data();
    this.xScale.domain(data.map(d => d[0]));
    this.yScale.domain([0, d3.max(data, d => d[1])]);
    this.colors.domain([0, data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', (d: any) => this.xScale(d[0]))
      .attr('y', (d: any) => this.yScale(d[1]))
      .attr('width', (d: any) => this.xScale.bandwidth())
      .attr('height', (d: any) => this.height - this.yScale(d[1]))
      .style('fill', (d: any, i: any) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.xScale(d[0]))
      .attr('y', (d: any) => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d: any, i: any) => this.colors(i))
      .transition()
      .delay((d: any, i: any) => i * 10)
      .attr('y', (d: any) => this.yScale(d[1]))
      .attr('height', (d: any) => this.height - this.yScale(d[1]));
  }
}
