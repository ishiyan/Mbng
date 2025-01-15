import { Component, ElementRef, ViewChild } from '@angular/core';

import { TemporalEntityKind } from 'projects/mb/src/lib/data/entities/temporal-entity-kind.enum';
import { SyntheticDataParameters } from 'projects/mb/src/lib/data/generators/synthetic-data-parameters';
import { SyntheticDataService } from 'projects/mb/src/lib/data/generators/synthetic-data.service';
import { SnackBarService } from 'projects/mb/src/lib/snack-bar/snack-bar.service';
import { HistoricalData } from 'projects/mb/src/lib/data/historical-data';
import { MatStepper, MatStep, MatStepLabel } from '@angular/material/stepper';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { GeneratorsModule } from '../../../../../../mb/src/lib/data/generators/generators.module';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { HistoricalDataChartModule } from '../../../../../../mb/src/lib/charts/historical-data-chart/historical-data-chart.module';

@Component({
    selector: 'mb-sample-synthetic-data',
    templateUrl: './synthetic-data.component.html',
    styleUrls: ['./synthetic-data.component.scss'],
    imports: [MatStepper, MatStep, MatStepLabel, MatButtonToggleGroup, MatButtonToggle, GeneratorsModule, MatButton, NgIf, HistoricalDataChartModule]
})
export class SyntheticDataComponent {
  readonly temporalEntityKinds = Object.keys(TemporalEntityKind);
  syntheticDataParameters: SyntheticDataParameters = new SyntheticDataParameters();
  historicalData: HistoricalData | undefined;
  historicalDataName: string | undefined;

  constructor(private element: ElementRef, private syntheticDataService: SyntheticDataService, private snackBarService: SnackBarService) {
  }

  @ViewChild('container', { static: true }) container!: ElementRef;

  generateData(): void {
    this.syntheticDataService.getSyntheticData(this.syntheticDataParameters)
      .subscribe({
        next: data => {
          this.historicalData = data;
          this.historicalDataName = data.name;
        },
        error: error => {
          this.historicalData = undefined;
          this.snackBarService.add(error as string);
          console.error(error as string);
        }
      });
  }
}
