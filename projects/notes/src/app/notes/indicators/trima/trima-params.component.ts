import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { LineStyle, TriangularMovingAverageParamsComponent, OhlcvChartSelectorModule } from 'mb';
import { TriangularMovingAverageParams } from 'mb';

import { Trima } from './trima.interface';

@Component({
    selector: 'app-trima-params',
    templateUrl: './trima-params.component.html',
    styleUrls: ['./trima-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgIf,
      MatIconButton,
      MatIcon,
      TriangularMovingAverageParamsComponent,
      OhlcvChartSelectorModule,
    ]
})
export class TrimaParamsComponent {

  /** Specifies the input values. */
  @Input() set initial(trima: Trima) {
    this.current = trima;
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly removed: EventEmitter<Trima> = new EventEmitter<Trima>();

  /** Event emitted when the indicator has been changed by the user. */
  @Output() readonly changed: EventEmitter<Trima> = new EventEmitter<Trima>();

  protected current!: Trima;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: TriangularMovingAverageParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
