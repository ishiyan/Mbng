import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

/** Typeset the content or expressions using MathJax library. */
@Directive({
  selector: '[mbMathJax]'
})
export class MathJaxDirective implements OnChanges {
  /** An input MathJax expression. */
  @Input()
  public mbMathJax!: string;

  /** The associated native element. */
  readonly element: HTMLElement;

  private static isMathJax(expression: string): boolean {
    return !!expression?.match(/(?:\$|\\\(|\\\[|\\begin\{.*?})/);
  }

  /** Fixes few issues with MathJax strings. */
  private static fixMathJaxBugs(jax: string): string {
    return jax
      // Line break error.
      .replace(/<br \/>/gi, '<br/> ')
      // Automatic breakline.
      .replace(/[$]([\s\S]+?)[$]/gi, (m, p: string, o, s) =>
        p.includes('\\\\') && !p.includes('\\begin')
          ? `$\\begin{align*}${p}\\end{align*}$`
          : `$${p}$`);
  }

  private static typeset(code: () => void) {
    if (MathJax?.startup) {
      MathJax.startup.promise = MathJax.startup.promise
        .then(() => {
          code();
          return MathJax.typesetPromise ? MathJax.typesetPromise() : null;
        })
        .catch((err: Error) =>
          console.error('MathJax Typeset failed: ' + err.message)
        );
      return MathJax.startup.promise;
    } else {
      code();
    }
  }

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const expressions = changes['mbMathJax'];
    if (!expressions) {
      return;
    }

    const s = expressions.currentValue as string;
    this.typeset(s);
  }

  typeset(s: string) {
    if (MathJaxDirective.isMathJax(s)) {
      const fixed = MathJaxDirective.fixMathJaxBugs(s);
      MathJaxDirective.typeset(() => {
        this.element.innerHTML = `<span class='jax-process'>${fixed}</span>`;
      });
    } else {
      this.element.innerHTML = s;
    }
  }
}
