import { Component, OnInit, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatRadioChange, MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import * as d3 from 'd3';

import { Bar } from 'projects/mb/src/lib/data/entities/bar';

import { dataOhlcvDaily } from '../../data/data-bar-daily';
import { D3tcHorizonChartSingleComponent } from '../d3tc-horizon-chart-single/d3tc-horizon-chart-single.component';

@Component({
    selector: 'app-d3-d3tc-horizon-chart-bands',
    templateUrl: './d3tc-horizon-chart-bands.component.html',
    styleUrls: ['./d3tc-horizon-chart-bands.component.scss'],
    imports: [MatFormField, MatSelect, FormsModule, MatOption, MatInput, MatRadioGroup, MatRadioButton, D3tcHorizonChartSingleComponent]
})
export class D3tcHorizonChartBandsComponent implements OnInit {
  readonly container = viewChild.required<ElementRef>('container');
  data: Bar[] = dataOhlcvDaily;
  width = 900;
  height = 40;
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

  colorChanged(event: MatRadioChange) {
    this.color = this.colors[+event.value];
  }

  ngOnInit() {
    const w = this.container().nativeElement.getBoundingClientRect().width;
    const margin = { right: 12, left: 12 };
    this.width = w - margin.left - margin.right;
  }
}
