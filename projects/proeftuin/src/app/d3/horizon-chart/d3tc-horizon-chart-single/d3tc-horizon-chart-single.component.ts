import { Component, OnInit, ElementRef, Input, inject } from '@angular/core';
import * as d3 from 'd3';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as d3tc from '../../../shared/d3tc';

import { Bar } from 'projects/mb/src/lib/data/entities/bar';

@Component({
  selector: 'app-d3-d3tc-horizon-chart-single',
  templateUrl: './d3tc-horizon-chart-single.component.html',
  styleUrls: ['./d3tc-horizon-chart-single.component.scss']
})
export class D3tcHorizonChartSingleComponent implements OnInit {
  private element = inject(ElementRef);

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
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set width(value: number) {
    this.theWidth = value;
    if (this.svg) {
      this.svg.attr('width', value);
      this.g.call(this.chart.duration(0).width(value));
    }
  }
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set height(value: number) {
    this.theHeight = value;
    if (this.svg) {
      this.svg.attr('height', value);
      this.g.call(this.chart.duration(0).height(value));
    }
  }
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set bands(value: number) {
    this.theBands = value;
    if (this.g) {
      this.g.call(this.chart.duration(0).bands(value));
    }
  }
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set mode(value: string) {
    this.theMode = value;
    if (this.g) {
      this.g.call(this.chart.duration(500).mode(value));
    }
  }
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set colors(value: string[]) {
    this.theColors = value;
    if (this.g) {
      this.g.call(this.chart.duration(500).colors(value));
    }
  }
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set interpolation(value: any) {
    this.theInterpolation = value;
    if (this.g) {
      this.g.call(this.chart.duration(500).interpolate(value));
    }
  }
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input() set data(value: Bar[]) {
    const mean = value.map(c => c.close).reduce((p, v) => p + v, 0) / value.length;
    this.horizonData = value.map(c => [c.time, c.close ? (c.close - mean) : null]);
    if (this.g) {
      this.g.data([this.horizonData]).call(this.chart);
    }
  }

  ngOnInit() {
    this.svg = d3.select(this.element.nativeElement).select('svg').attr('width', this.theWidth).attr('height', this.theHeight);
    this.g = this.svg.append('g');
    this.chart = d3tc.horizonChart().width(this.theWidth).height(this.theHeight).bands(this.theBands)
      .mode(this.theMode).colors(this.theColors).interpolate(this.theInterpolation).defined((d: any) => d[1]);
    this.g.data([this.horizonData]).call(this.chart);
  }
}
