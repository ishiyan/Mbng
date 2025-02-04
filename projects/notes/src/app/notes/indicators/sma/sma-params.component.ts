import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { SimpleMovingAverageParams, SimpleMovingAverageParamsComponent } from 'mb';
import { LineStyle, LineStyleSelectorComponent } from 'mb';

import { Sma } from './sma.interface';

@Component({
  selector: 'app-sma-params',
  templateUrl: './sma-params.component.html',
  styleUrls: ['./sma-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    SimpleMovingAverageParamsComponent
 ]
})
export class SmaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Sma>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Sma>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Sma>();

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
