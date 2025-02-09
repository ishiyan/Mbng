import { Directive, ElementRef, PLATFORM_ID, input, output, inject, effect, afterNextRender } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { KatexOptions } from 'katex';

import { KatexService } from './katex.service';

@Directive({ selector: '[mbKatex]' })
export class KatexDirective {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef);
  private readonly katexService = inject(KatexService);

  readonly mbKatex = input.required<string>();
  readonly options = input.required<KatexOptions>();
  readonly renderString = input(false);
  readonly hasError = output<any>();

  constructor() {
    effect(() => {
      this.mbKatex();
      this.options();
      this.renderString();
      this.render();
    });
    afterNextRender({
      write: () => {
        this.render();
      }
    });
  }

  private render() {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    try {
      if (this.renderString()) {
        this.element.nativeElement.innerHtml = this.katexService.renderToString(this.mbKatex(), this.options());
      } else {
        this.katexService.render(this.mbKatex(), this.element, this.options());
      }
    } catch (e) {
      this.hasError.emit(e);
    }
  }
}
