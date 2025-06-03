import { ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, effect, inject, input, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { LineStyle } from './line-style';

@Component({
    selector: 'mb-line-svg',
    templateUrl: './line-svg.component.html',
    styleUrls: ['./line-svg.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSvgComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private val = new LineStyle();
  value = input.required<LineStyle>();

  constructor() {
    effect(() => {
      const v = this.value();
      if (this.val !== v) {
        this.val = v;
        this.inlineSvgContent(v);
      }
    });
    afterNextRender({
      write: () => {
        this.inlineSvgContent(this.val);
      }
    });
  }

  private inlineSvgContent(v: LineStyle) {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const e = this.elementRef.nativeElement;
    if (!e || e === null) {
      return;
    }

    e.innerHTML =
      '<svg width="90" height="6" viewBox="0 0 90 6" xmlns="http://www.w3.org/2000/svg">' +
      `<line x1="0" y1="3" x2="89" y2="3" stroke-width="${v.width}" stroke-dasharray="${v.dash}" stroke="${v.color}"></line></svg>`;
  }
}
