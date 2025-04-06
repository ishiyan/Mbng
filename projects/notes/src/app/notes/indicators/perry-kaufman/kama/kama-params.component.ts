import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { KaufmanAdaptiveMovingAverageLengthParams, KaufmanAdaptiveMovingAverageSmoothingFactorParams } from 'mb';
import { KaufmanAdaptiveMovingAverageParamsComponent } from 'mb';
import { LineStyle, LineStyleSelectorComponent } from 'mb';

import { Kama } from './kama.interface';

@Component({
  selector: 'app-kama-params',
  templateUrl: './kama-params.component.html',
  styleUrls: ['./kama-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    KaufmanAdaptiveMovingAverageParamsComponent
  ]
})
export class KamaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Kama>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Kama>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Kama>();

  protected current!: Kama;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: KaufmanAdaptiveMovingAverageLengthParams | KaufmanAdaptiveMovingAverageSmoothingFactorParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
