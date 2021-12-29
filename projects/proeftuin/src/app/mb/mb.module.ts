import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';

import { MbRoutingModule } from './mb-routing.module';
import { MbComponent } from './mb.component';

import { SyntheticDataModule } from './mb-samples/synthetic-data/synthetic-data.module';
import { OhlcvChartStudyModule } from './mb-samples/ohlcv-chart-study/ohlcv-chart-study.module';
import { InstrumentsTableModule } from './mb-samples/instruments-table/instruments-table.module';
import { SampleSparklineModule } from './mb-samples/components/sparkline/sample-sparkline.module';
import { SampleMultilineModule } from './mb-samples/components/multiline/sample-multiline.module';
import { SampleStacklineModule } from './mb-samples/components/stackline/sample-stackline.module';
import { SampleSunburstModule } from './mb-samples/components/sunburst/sample-sunburst.module';
import { SampleIcicleModule } from './mb-samples/components/icicle/sample-icicle.module';
import { SampleTreemapModule } from './mb-samples/components/treemap/sample-treemap.module';
import { SampleCirclepackModule } from './mb-samples/components/circlepack/sample-circlepack.module';
import { SampleVoronoiModule } from './mb-samples/components/voronoi/sample-voronoi.module';
import { SampleSwatchesModule } from './mb-samples/components/swatches/sample-swatches.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTreeModule,
    MbRoutingModule,
    SyntheticDataModule,
    OhlcvChartStudyModule,
    InstrumentsTableModule,
    SampleSparklineModule,
    SampleMultilineModule,
    SampleStacklineModule,
    SampleCirclepackModule,
    SampleSunburstModule,
    SampleIcicleModule,
    SampleTreemapModule,
    SampleCirclepackModule,
    SampleVoronoiModule,
    SampleSwatchesModule
  ],
  declarations: [
    MbComponent
  ]
})
export class MbModule { }
