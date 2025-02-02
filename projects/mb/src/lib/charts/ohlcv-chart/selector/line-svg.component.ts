import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, input } from '@angular/core';

import { LineStyle } from './line-style';

@Component({
    selector: 'mb-line-svg',
    templateUrl: './line-svg.component.html',
    styleUrls: ['./line-svg.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSvgComponent {
  private elementRef = inject(ElementRef);

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
  }

  private inlineSvgContent(v: LineStyle) {
    this.elementRef.nativeElement.innerHTML =
      '<svg width="90" height="6" viewBox="0 0 90 6" xmlns="http://www.w3.org/2000/svg">' +
      `<line x1="0" y1="3" x2="89" y2="3" stroke-width="${v.width}" stroke-dasharray="${v.dash}" stroke="${v.color}"></line></svg>`;
  }
}
