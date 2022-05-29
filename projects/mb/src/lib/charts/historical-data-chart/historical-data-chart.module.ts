import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

import { SvgViewerModule } from '../../svg-viewer/svg-viewer.module';

import { HistoricalDataChartComponent } from './historical-data-chart.component';
import { HistoricalDataTableComponent } from './historical-data-table.component';
import { HistoricalDataDownloadComponent } from './historical-data-download.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTableModule,
        SvgViewerModule
    ],
    exports: [
        HistoricalDataChartComponent,
        HistoricalDataTableComponent,
        HistoricalDataDownloadComponent
    ],
    declarations: [
        HistoricalDataChartComponent,
        HistoricalDataTableComponent,
        HistoricalDataDownloadComponent
    ],
    providers: [
    ]
})
export class HistoricalDataChartModule { }
