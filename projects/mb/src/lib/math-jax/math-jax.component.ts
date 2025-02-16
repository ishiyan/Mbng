import { ChangeDetectionStrategy, Component, viewChild, input, effect } from '@angular/core';

import { MathJaxDirective } from './math-jax.directive';

@Component({
  selector: 'mb-mathjax',
  templateUrl: './math-jax.component.html',
  styleUrls: ['./math-jax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MathJaxDirective]
})
export class MathJaxComponent {
  readonly expression = input.required<string>();
  readonly mathJaxDirective = viewChild.required(MathJaxDirective);

  constructor() {
    effect(() => {
      const expr = this.expression();
      const mathJaxDirective = this.mathJaxDirective();
      mathJaxDirective.render(expr);
    });
  }
}
