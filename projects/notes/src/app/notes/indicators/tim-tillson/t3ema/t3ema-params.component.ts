import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { T3ExponentialMovingAverageLengthParams, T3ExponentialMovingAverageSmoothingFactorParams, T3ExponentialMovingAverageParamsComponent, LineStyleSelectorComponent } from 'mb';
import { LineStyle } from 'mb';

import { T3ema } from './t3ema.interface';

@Component({
    selector: 'app-t3ema-params',
    templateUrl: './t3ema-params.component.html',
    styleUrls: ['./t3ema-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgIf,
      MatIconButton,
      MatIcon,
      T3ExponentialMovingAverageParamsComponent,
      LineStyleSelectorComponent
    ]
})
export class T3emaParamsComponent {

  /** Specifies the input values. */
  @Input() set initial(t3ema: T3ema) {
    this.current = t3ema;
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly removed: EventEmitter<T3ema> = new EventEmitter<T3ema>();

  /** Event emitted when the indicator has been changed by the user. */
  @Output() readonly changed: EventEmitter<T3ema> = new EventEmitter<T3ema>();

  protected current!: T3ema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: T3ExponentialMovingAverageLengthParams | T3ExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
