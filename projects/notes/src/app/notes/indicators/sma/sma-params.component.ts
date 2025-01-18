import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { SimpleMovingAverageParams, SimpleMovingAverageModule, OhlcvChartSelectorModule } from 'mb';
import { LineStyle } from 'mb';

import { Sma } from './sma.interface';

@Component({
    selector: 'app-sma-params',
    templateUrl: './sma-params.component.html',
    styleUrls: ['./sma-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgIf,
      MatIconButton,
      MatIcon,
      OhlcvChartSelectorModule,
      SimpleMovingAverageModule,
    ]
})
export class SmaParamsComponent {

  /** Specifies the input values. */
  @Input() set initial(sma: Sma) {
    this.current = sma;
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly removed: EventEmitter<Sma> = new EventEmitter<Sma>();

  /** Event emitted when the indicator has been changed by the user. */
  @Output() readonly changed: EventEmitter<Sma> = new EventEmitter<Sma>();

  protected current!: Sma;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: SimpleMovingAverageParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
