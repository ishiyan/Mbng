import { ElementRef, Injectable } from '@angular/core';
import katex from 'katex';
import KatexOptions from 'katex';

@Injectable()
export class KatexService {

  render(expression: string, element: ElementRef, options?: KatexOptions) {
    return katex.render(expression, element.nativeElement, options);
  }

  renderToString(expression: string, options?: KatexOptions): string {
    return katex.renderToString(expression, options);
  }
}
