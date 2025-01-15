import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams, DoubleExponentialMovingAverageModule, OhlcvChartSelectorModule } from 'mb';
import { LineStyle } from 'mb';
import { Dema } from './dema.interface';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-dema-params',
    templateUrl: './dema-params.component.html',
    styleUrls: ['./dema-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIconButton, MatIcon, DoubleExponentialMovingAverageModule, NgIf, OhlcvChartSelectorModule]
})
export class DemaParamsComponent {

  /** Specifies the input values. */
  @Input() set initial(dema: Dema) {
    this.current = dema;
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly removed: EventEmitter<Dema> = new EventEmitter<Dema>();

  /** Event emitted when the indicator has been changed by the user. */
  @Output() readonly changed: EventEmitter<Dema> = new EventEmitter<Dema>();

  protected current!: Dema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: DoubleExponentialMovingAverageLengthParams | DoubleExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
