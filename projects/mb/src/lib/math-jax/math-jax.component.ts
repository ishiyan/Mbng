import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MathJaxDirective } from './math-jax.directive';

@Component({
    selector: 'mb-mathjax',
    templateUrl: './math-jax.component.html',
    styleUrls: ['./math-jax.component.scss'],
    imports: [MathJaxDirective]
})
export class MathJaxComponent implements OnChanges {
  @Input() expression!: string;

  @ViewChild(MathJaxDirective)
  mathJaxDirective!: MathJaxDirective;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: SimpleChanges): void {
    if (this.mathJaxDirective) {
      this.mathJaxDirective.typeset(this.expression);
    }
  }
}
