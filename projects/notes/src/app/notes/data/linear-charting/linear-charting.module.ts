import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { LinearChartModule } from 'projects/mb/src/lib/charts/linear-chart/linear-chart.module';

//import { BarSeriesSelectModule } from '../../../shared/data/bar-series/bar-series-select/bar-series-select.module';
import { SeriesSelectModule } from '../../../shared/data/series-select/series-select.module';
import { LinearChartingComponent } from './linear-charting.component';
import { LinearChartingRoutingModule } from './linear-charting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    LinearChartModule,
    //BarSeriesSelectModule,
    SeriesSelectModule,
    LinearChartingRoutingModule
  ],
  declarations: [
    LinearChartingComponent
  ]
})
export class LinearChartingModule { }
