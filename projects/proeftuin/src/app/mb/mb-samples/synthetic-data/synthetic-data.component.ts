import { Component, ElementRef, viewChild, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatStepper, MatStep, MatStepLabel } from '@angular/material/stepper';

import { TemporalEntityKind } from 'projects/mb/src/lib/data/entities/temporal-entity-kind.enum';
import { SnackBarService } from 'projects/mb/src/lib/snack-bar/snack-bar.service';
import { SyntheticDataParameters } from 'projects/mb/src/lib/data/generators/synthetic-data-parameters';
import { SyntheticDataParametersComponent } from 'projects/mb/src/lib/data/generators/synthetic-data-parameters.component';
import { SyntheticDataService } from 'projects/mb/src/lib/data/generators/synthetic-data.service';
import { HistoricalData } from 'projects/mb/src/lib/data/historical-data';
import { HistoricalDataChartComponent } from 'projects/mb/src/lib/charts/historical-data-chart/historical-data-chart.component';
import { HistoricalDataTableComponent } from 'projects/mb/src/lib/charts/historical-data-chart/historical-data-table.component';

@Component({
  selector: 'mb-sample-synthetic-data',
  templateUrl: './synthetic-data.component.html',
  styleUrls: ['./synthetic-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatStepper,
    MatStep,
    MatStepLabel,
    SyntheticDataParametersComponent,
    HistoricalDataChartComponent,
    HistoricalDataTableComponent
  ]
})
export class SyntheticDataComponent {
  private element = inject(ElementRef);
  private syntheticDataService = inject(SyntheticDataService);
  private snackBarService = inject(SnackBarService);
  readonly container = viewChild.required<ElementRef>('container');

  readonly temporalEntityKinds = Object.keys(TemporalEntityKind);
  syntheticDataParameters: SyntheticDataParameters = new SyntheticDataParameters();
  historicalData: HistoricalData | undefined;
  historicalDataName: string | undefined;

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
