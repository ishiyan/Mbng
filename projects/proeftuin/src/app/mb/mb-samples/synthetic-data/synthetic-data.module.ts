import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';

import { SnackBarModule } from 'projects/mb/src/lib/snack-bar/snack-bar.module';
import { SvgViewerModule } from 'projects/mb/src/lib/svg-viewer/svg-viewer.module';
import { HistoricalDataChartModule } from 'projects/mb/src/lib/charts/historical-data-chart/historical-data-chart.module';
import { GeneratorsModule } from 'projects/mb/src/lib/data/generators/generators.module';

import { SyntheticDataComponent } from './synthetic-data.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatStepperModule,
        SnackBarModule,
        SvgViewerModule,
        HistoricalDataChartModule,
        GeneratorsModule,
        SyntheticDataComponent
    ]
})
export class SyntheticDataModule { }
