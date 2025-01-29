import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { DoubleExponentialMovingAverageLengthParams, DoubleExponentialMovingAverageSmoothingFactorParams, DoubleExponentialMovingAverageParamsComponent, OhlcvChartSelectorModule } from 'mb';
import { LineStyle } from 'mb';

import { Dema } from './dema.interface';

@Component({
    selector: 'app-dema-params',
    templateUrl: './dema-params.component.html',
    styleUrls: ['./dema-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgIf,
      MatIconButton,
      MatIcon,
      DoubleExponentialMovingAverageParamsComponent,
      OhlcvChartSelectorModule
    ]
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
