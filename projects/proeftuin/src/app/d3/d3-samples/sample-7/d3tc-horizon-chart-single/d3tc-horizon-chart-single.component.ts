import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily';

@Component({
  selector: 'd3-sample-d3tc-horizon-chart-single',
  templateUrl: './d3tc-horizon-chart-single.component.html',
  styleUrls: ['./d3tc-horizon-chart-single.component.scss']
})
export class D3tcHorizonChartSingleComponent implements OnInit {
  private theWidth = 700;
  private theHeight = 40;
  private theBands = 3;
  private theMode = 'mirror';
  private theInterpolation = d3.curveCatmullRom;
  private theColors = ['#08519c', '#bdd7e7', '#bae4b3', '#006d2c'];
  private horizonData!: (number | Date | null)[][];
  private svg: any;
  private g: any;
  private chart: any;
  @Input() set width(value: number) {
    this.theWidth = value;
    if (this.svg) {
      this.svg.attr('width', value);
      this.g.call(this.chart.duration(0).width(value));
    }
  }
  @Input() set height(value: number) {
    this.theHeight = value;
    if (this.svg) {
      this.svg.attr('height', value);
      this.g.call(this.chart.duration(0).height(value));
    }
  }
  @Input() set bands(value: number) {
    this.theBands = value;
    if (this.g) {
      this.g.call(this.chart.duration(0).bands(value));
    }
  }
  @Input() set mode(value: string) {
    this.theMode = value;
    if (this.g) {
      this.g.call(this.chart.duration(500).mode(value));
    }
  }
  @Input() set colors(value: string[]) {
    this.theColors = value;
    if (this.g) {
      this.g.call(this.chart.duration(500).colors(value));
    }
  }
  @Input() set interpolation(value: any) {
    this.theInterpolation = value;
    if (this.g) {
      this.g.call(this.chart.duration(500).interpolate(value));
    }
  }
  @Input() set data(value: D3Ohlcv[]) {
    const mean = value.map(c => c.close).reduce((p, v) => p + v, 0) / value.length;
    this.horizonData = value.map(c => [c.date, c.close ? (c.close - mean) : null]);
    if (this.g) {
      this.g.data([this.horizonData]).call(this.chart);
    }
  }

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.svg = d3.select(this.element.nativeElement).select('svg').attr('width', this.theWidth).attr('height', this.theHeight);
    this.g = this.svg.append('g');
    this.chart = d3tc.horizonChart().width(this.theWidth).height(this.theHeight).bands(this.theBands)
      .mode(this.theMode).colors(this.theColors).interpolate(this.theInterpolation).defined((d: any) => d[1]);
    this.g.data([this.horizonData]).call(this.chart);
  }
}
