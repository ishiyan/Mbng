import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { KatexOptions } from 'katex';

import { KatexDirective } from './katex.directive';

@Component({
    selector: 'mb-katex',
    templateUrl: './katex.component.html',
    styleUrls: ['./katex.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [KatexDirective]
})
export class KatexComponent {
  readonly expression = input.required<string>();
  readonly options = input<KatexOptions>({});
  readonly hasError = output<any>();

  public outputError(error: any): void {
    this.hasError.emit(error);
  }
}
