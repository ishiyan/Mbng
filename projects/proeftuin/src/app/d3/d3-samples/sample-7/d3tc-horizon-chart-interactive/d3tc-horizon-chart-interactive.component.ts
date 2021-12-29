import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import * as d3 from 'd3';
// @ts-ignore
import * as d3tc from '../../../../shared/d3tc';

import { D3Ohlcv } from '../../data/d3-ohlcv';
import { dataOhlcvDaily } from '../../data/data-ohlcv-daily-big';

@Component({
  selector: 'd3-sample-d3tc-horizon-chart-interactive',
  templateUrl: './d3tc-horizon-chart-interactive.component.html',
  styleUrls: ['./d3tc-horizon-chart-interactive.component.scss']
})
export class D3tcHorizonChartInteractiveComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() svgheight: any;
  bands = 1;
  mode = 'mirror';
  interpolations = [
    { value: d3.curveLinear, viewValue: 'd3.curveLinear' },
    { value: d3.curveStep, viewValue: 'd3.curveStep' },
    { value: d3.curveStepBefore, viewValue: 'd3.curveStepBefore' },
    { value: d3.curveStepAfter, viewValue: 'd3.curveStepAfter' },
    { value: d3.curveBasis, viewValue: 'd3.curveBasis' },
    { value: d3.curveCatmullRom, viewValue: 'd3.curveCatmullRom' },
    { value: d3.curveCardinal, viewValue: 'd3.curveCardinal' },
    { value: d3.curveNatural, viewValue: 'd3.curveNatural' },
    { value: d3.curveMonotoneX, viewValue: 'd3.curveMonotoneX' },
    { value: d3.curveMonotoneY, viewValue: 'd3.curveMonotoneY' }
  ];
  interpolation = this.interpolations[0].value;
  colors = [
    ['#08519c', '#bdd7e7', '#bae4b3', '#006d2c'],
    ['#4575b4', '#e0f3f8', '#fee090', '#d73027'],
    ['#e06c4c', '#f5d2ca', '#c0e2f0', '#1da4d1'],
    ['#313695', '#abd9e9', '#fee090', '#d73027'],
    ['#5e4fa2', '#e6f598', '#fee08b', '#9e0142'],
    ['#551b01', '#f89d97', '#c8ffd4', '#014e1f']
  ];
  color = this.colors[0];

  private svg: any;
  private chart: any;
  private height!: number;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    const data: D3Ohlcv[] = dataOhlcvDaily;
    const w = this.container.nativeElement.getBoundingClientRect().width;
    const margin = { left: 12, right: 12 };
    const width = w - margin.left - margin.right;
    this.height = this.svgheight;
    this.svg = d3.select(this.element.nativeElement).select('svg').attr('width', width).attr('height', this.height).append('g');
    const mean = data.map(c => c.close).reduce((p, v) => p + v, 0) / data.length;
    const horizonData = data.map(c => [c.date, c.close ? (c.close - mean) : null]);
    this.chart = d3tc.horizonChart().width(width).height(this.height / this.bands).bands(this.bands).mode(this.mode)
      .interpolate(this.interpolation).colors(this.color).defined((d: any) => d[1]);
    this.svg.data([horizonData]).call(this.chart);
  }

  bandsChanged(event: number) {
    const n = Math.max(1, +event);
    this.svg.call(this.chart.duration(500).height(this.height / n).bands(n));
  }

  modeChanged(event: MatSelectChange) {
    this.svg.call(this.chart.duration(500).mode(event.value));
  }

  interpolationChanged(event: MatSelectChange) {
    this.svg.call(this.chart.duration(500).interpolate(event.value));
  }

  colorChanged(event: MatRadioChange) {
    this.svg.call(this.chart.duration(500).colors(this.colors[+event.value]));
  }
}
