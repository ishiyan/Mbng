import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { JurikMovingAverageParams } from 'mb';
import { JurikMovingAverageParamsComponent } from 'mb';
import { LineStyle, LineStyleSelectorComponent } from 'mb';

import { Jma } from './jma.interface';

@Component({
  selector: 'app-jma-params',
  templateUrl: './jma-params.component.html',
  styleUrls: ['./jma-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatIconButton,
    LineStyleSelectorComponent,
    JurikMovingAverageParamsComponent
  ]
})
export class JmaParamsComponent {

  /** Specifies the input values. */
  readonly initial = input.required<Jma>();

  constructor() {
    effect(() => {
      this.current = this.initial();
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly removed = output<Jma>();

  /** Event emitted when the indicator has been changed by the user. */
  readonly changed = output<Jma>();

  protected current!: Jma;

  protected updateStyle(style: LineStyle) {
    this.current.style = style;
    this.changed.emit(this.current);
  }

  protected updateParams(params: JurikMovingAverageParams) {
    this.current.params = params;
    this.changed.emit(this.current);
  }

  protected remove(): void {
    this.removed.emit(this.current);
  }
}
