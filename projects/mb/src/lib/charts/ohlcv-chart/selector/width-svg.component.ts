import { ChangeDetectionStrategy, Component, ElementRef, PLATFORM_ID, effect, inject, input, afterNextRender, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'mb-width-svg',
    templateUrl: './width-svg.component.html',
    styleUrls: ['./width-svg.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidthSvgComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private val = 1;
  value = input.required<number>();

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

  private inlineSvgContent(width: number) {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const e = this.elementRef.nativeElement;
    if (!e || e === null) {
      return;
    }
    
    e.innerHTML =
      '<svg width="70" height="6" viewBox="0 0 70 6" xmlns="http://www.w3.org/2000/svg">' +
      `<line x1="0" y1="3" x2="69" y2="3" stroke-width="${width}"></line></svg>`;
  }
}
