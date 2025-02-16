import { Directive, ElementRef, OnChanges, SimpleChanges, input, inject, effect } from '@angular/core';

import { MathJaxService } from './math-jax.service';

//const MathJax = (window as any).MathJax || {};

/** Typeset the content or expressions using MathJax library. */
@Directive({
  selector: '[mbMathJax]',
})
export class MathJaxDirective implements OnChanges {
  private readonly mathJaxService = inject(MathJaxService);
  private readonly element = inject(ElementRef);

  /** An input MathJax expression. */
  public readonly mbMathJax = input<string>();

  constructor() {
    effect(() => {
      const expr = this.mbMathJax();
      if (expr) {
        console.log('directive effect:', expr);
        this.render(expr);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const expressions = changes['mbMathJax'];
    console.log('directive changes 0:', expressions);
    if (!expressions) {
      return;
    }

    const s = expressions.currentValue as string;
    console.log('directive changes 1:', s);
    this.render(s);
  }

  render(s: string) {
    this.mathJaxService.render(s, this.element.nativeElement);
  }
}
