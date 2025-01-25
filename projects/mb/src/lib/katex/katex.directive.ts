import { Directive, ElementRef, OnChanges, input, output, inject } from '@angular/core';
import { KatexOptions } from 'katex';

import { KatexService } from './katex.service';

@Directive({ selector: '[mbKatex]' })
export class KatexDirective implements OnChanges {
  private element = inject(ElementRef);
  private katexService = inject(KatexService);

  readonly mbKatex = input.required<string>();
  readonly options = input.required<KatexOptions>();
  readonly renderString = input(false);
  readonly hasError = output<any>();

  ngOnChanges() {
    try {
      if (this.renderString()) {
        this.element.nativeElement.innerHtml =  this.katexService.renderToString(this.mbKatex(), this.options());
      } else {
        this.katexService.render(this.mbKatex(), this.element, this.options());
      }
    } catch (e) {
      this.hasError.emit(e);
    }
  }
}
