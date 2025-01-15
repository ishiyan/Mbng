import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { T2ExponentialMovingAverageLengthParams, T2ExponentialMovingAverageSmoothingFactorParams, T2ExponentialMovingAverageModule, OhlcvChartSelectorModule } from 'mb';
import { LineStyle } from 'mb';
import { T2ema } from './t2ema.interface';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-t2ema-params',
    templateUrl: './t2ema-params.component.html',
    styleUrls: ['./t2ema-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIconButton, MatIcon, T2ExponentialMovingAverageModule, NgIf, OhlcvChartSelectorModule]
})
export class T2emaParamsComponent {

  /** Specifies the input values. */
  @Input() set initial(t2ema: T2ema) {
    this.current = t2ema;
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly removed: EventEmitter<T2ema> = new EventEmitter<T2ema>();

  /** Event emitted when the indicator has been changed by the user. */
  @Output() readonly changed: EventEmitter<T2ema> = new EventEmitter<T2ema>();

  protected current!: T2ema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: T2ExponentialMovingAverageLengthParams | T2ExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
