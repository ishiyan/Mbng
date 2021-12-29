import { ElementRef, Injectable } from '@angular/core';
import { KatexOptions, render, renderToString } from 'katex';

@Injectable()
export class KatexService {

  render(expression: string, element: ElementRef, options?: KatexOptions) {
    return render(expression, element.nativeElement, options);
  }

  renderToString(expression: string, options?: KatexOptions): string {
    return renderToString(expression, options);
  }
}
