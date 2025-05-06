import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { FractalAdaptiveMovingAverageParams } from 'mb';
import { FractalAdaptiveMovingAverageParamsComponent } from 'mb';
import { LineStyle, LineStyleSelectorComponent } from 'mb';

import { Frama } from './frama.interface';

@Component({
  selector: 'app-frama-params',
  templateUrl: './frama-params.component.html',
  styleUrls: ['./frama-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    FractalAdaptiveMovingAverageParamsComponent
  ]
})
export class FramaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Frama>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Frama>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Frama>();

  protected current!: Frama;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: FractalAdaptiveMovingAverageParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
