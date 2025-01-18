import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { LineStyle, WeightedMovingAverageModule, OhlcvChartSelectorModule } from 'mb';
import { WeightedMovingAverageParams } from 'mb';

import { Wma } from './wma.interface';

@Component({
    selector: 'app-wma-params',
    templateUrl: './wma-params.component.html',
    styleUrls: ['./wma-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgIf,
      MatIconButton,
      MatIcon,
      WeightedMovingAverageModule,
      OhlcvChartSelectorModule,
    ]
})
export class WmaParamsComponent {

  /** Specifies the input values. */
  @Input() set initial(wma: Wma) {
    this.current = wma;
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly removed: EventEmitter<Wma> = new EventEmitter<Wma>();

  /** Event emitted when the indicator has been changed by the user. */
  @Output() readonly changed: EventEmitter<Wma> = new EventEmitter<Wma>();

  protected current!: Wma;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: WeightedMovingAverageParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
