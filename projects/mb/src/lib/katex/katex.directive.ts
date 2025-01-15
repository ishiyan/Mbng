import { Directive, ElementRef, EventEmitter, Input, Output, OnChanges, } from '@angular/core';
import { KatexOptions } from 'katex';

import { KatexService } from './katex.service';

@Directive({ selector: '[mbKatex]' })
export class KatexDirective implements OnChanges {
  @Input() mbKatex!: string;
  @Input() options!: KatexOptions;
  @Input() renderString = false;
  @Output() hasError = new EventEmitter<any>();

  constructor(private element: ElementRef, private katexService: KatexService) { }

  ngOnChanges() {
    try {
      if (this.renderString) {
        this.element.nativeElement.innerHtml =  this.katexService.renderToString(this.mbKatex, this.options);
      } else {
        this.katexService.render(this.mbKatex, this.element, this.options);
      }
    } catch (e) {
      this.hasError.emit(e);
    }
  }
}
