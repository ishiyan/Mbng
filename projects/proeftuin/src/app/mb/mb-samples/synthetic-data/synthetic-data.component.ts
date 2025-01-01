import { Component, ElementRef, ViewChild } from '@angular/core';

import { TemporalEntityKind } from 'projects/mb/src/lib/data/entities/temporal-entity-kind.enum';
import { SyntheticDataParameters } from 'projects/mb/src/lib/data/generators/synthetic-data-parameters';
import { SyntheticDataService } from 'projects/mb/src/lib/data/generators/synthetic-data.service';
import { SnackBarService } from 'projects/mb/src/lib/snack-bar/snack-bar.service';
import { HistoricalData } from 'projects/mb/src/lib/data/historical-data';

@Component({
    selector: 'mb-sample-synthetic-data',
    templateUrl: './synthetic-data.component.html',
    styleUrls: ['./synthetic-data.component.scss'],
    standalone: false
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
