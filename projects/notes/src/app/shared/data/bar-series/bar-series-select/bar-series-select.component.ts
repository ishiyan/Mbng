import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SparklineConfiguration } from 'projects/mb/src/lib/charts/sparkline/sparkline-configuration.interface';

import { BarSeries } from '../bar-series.interface';
import { BarSeriesService } from '../bar-series.service';

// Since we use hardcoded palette, here is the hadcoded primary color:
// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=009688
const primaryColor = '#009688';

@Component({
  selector: 'app-bar-series-select',
  templateUrl: './bar-series-select.component.html',
  styleUrls: ['./bar-series-select.component.scss']
})
export class BarSeriesSelectComponent implements OnInit {
  protected seriesArray!: BarSeries[];
  protected selected!: BarSeries;
  protected labelText = '';
  protected configFill: SparklineConfiguration = {
    fillColor: primaryColor, strokeColor: undefined, strokeWidth: 1
  };

  /** Event emitted when the selection has been changed. */
  @Output() selectionChange: EventEmitter<BarSeries> = new EventEmitter<BarSeries>();

  /** Specifies the sparkline fill color. */
  @Input() set color(c: string) {
    if (c && c != null && c.length > 0) {
      this.configFill.fillColor = c;
      this.configFill = { ...this.configFill };
    }
  }

  /** Specifies the label of the form field. */
  @Input() set label(text: string) {
    if (text && text != null) {
      this.labelText = text;
    }
  }
 
  constructor(private barSeriesService: BarSeriesService) {
    this.seriesArray = this.barSeriesService.get();
    this.selected = this.seriesArray[0];
  }

  ngOnInit(): void {
    this.selectionChange.emit(this.selected);
    this.barSeriesService.getObservable().subscribe(ar => {
      this.seriesArray = ar;
      if (!ar.includes(this.selected)) {
        this.selected = ar[0];
      }
    });
  }

  protected changed(selection: BarSeries): void {
    this.selectionChange.emit(selection);
  }
}
