import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { TripleExponentialMovingAverageLengthParams, TripleExponentialMovingAverageSmoothingFactorParams, TripleExponentialMovingAverageParamsComponent, OhlcvChartSelectorModule } from 'mb';
import { LineStyle } from 'mb';
import { Tema } from './tema.interface';

@Component({
    selector: 'app-tema-params',
    templateUrl: './tema-params.component.html',
    styleUrls: ['./tema-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      NgIf,
      MatIconButton,
      MatIcon,
      TripleExponentialMovingAverageParamsComponent,
      OhlcvChartSelectorModule,
    ]
})
export class TemaParamsComponent {

  /** Specifies the input values. */
  @Input() set initial(tema: Tema) {
    this.current = tema;
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly removed: EventEmitter<Tema> = new EventEmitter<Tema>();

  /** Event emitted when the indicator has been changed by the user. */
  @Output() readonly changed: EventEmitter<Tema> = new EventEmitter<Tema>();

  protected current!: Tema;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: TripleExponentialMovingAverageLengthParams | TripleExponentialMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
