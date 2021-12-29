import { Directive, ElementRef, EventEmitter, Input, Output, OnChanges, } from '@angular/core';
import { KatexOptions } from 'katex';

import { KatexService } from './katex.service';

@Directive({
  selector: '[mbKatex]',
})
export class KatexDirective implements OnChanges {
  @Input() mbKatex!: string;
  @Input() options!: KatexOptions;
  @Output() hasError = new EventEmitter<any>();

  constructor(private element: ElementRef, private katexService: KatexService) { }

  ngOnChanges() {
    try {
      this.katexService.render(this.mbKatex, this.element, this.options);
    } catch (e) {
      this.hasError.emit(e);
    }
  }
}
