import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { TripleExponentialMovingAverageLengthParams, TripleExponentialMovingAverageSmoothingFactorParams } from 'mb';
import { TripleExponentialMovingAverageParamsComponent, LineStyleSelectorComponent } from 'mb';
import { LineStyle } from 'mb';
import { Tema } from './tema.interface';

@Component({
  selector: 'app-tema-params',
  templateUrl: './tema-params.component.html',
  styleUrls: ['./tema-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    TripleExponentialMovingAverageParamsComponent
  ]
})
export class TemaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Tema>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Tema>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Tema>();

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
