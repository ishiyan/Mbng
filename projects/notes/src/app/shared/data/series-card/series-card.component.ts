import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';

import { SparklineConfiguration, SparklineComponent, MultilineComponent } from 'mb';
import { LineConfiguration } from 'mb';

import { Series } from '../series.interface';
import { primaryColor } from '../../theme-colors';

@Component({
  selector: 'app-series-card',
  templateUrl: './series-card.component.html',
  styleUrls: ['./series-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatIcon,
    MatIconButton,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    SparklineComponent,
    MultilineComponent
  ]
})
export class SeriesCardComponent {
  /** Specifies the scalar series. */
  readonly series = input.required<Series>();

  /** Specifies if the series can be removed. */
  readonly removable = input.required<boolean>();

  /** Event emitted when the series has been removed by the user. */
  readonly removed = output<Series>();

  protected readonly configSparkline: SparklineConfiguration = {
    fillColor: primaryColor, strokeColor: undefined, strokeWidth: 1
  };

  protected readonly configMultiline: LineConfiguration = {
    fillColor: undefined, strokeColor: primaryColor, strokeWidth: 1
  };

  protected remove(): void {
    this.removed.emit(this.series());
  }
}
