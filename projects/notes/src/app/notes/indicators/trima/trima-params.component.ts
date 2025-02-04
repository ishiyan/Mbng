import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { LineStyle, LineStyleSelectorComponent } from 'mb';
import { TriangularMovingAverageParams, TriangularMovingAverageParamsComponent } from 'mb';

import { Trima } from './trima.interface';

@Component({
  selector: 'app-trima-params',
  templateUrl: './trima-params.component.html',
  styleUrls: ['./trima-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    TriangularMovingAverageParamsComponent,
    LineStyleSelectorComponent
  ]
})
export class TrimaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Trima>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Trima>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Trima>();

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
