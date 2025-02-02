import { ChangeDetectionStrategy, Component, ElementRef, OnInit, effect, inject, input } from '@angular/core';

@Component({
    selector: 'mb-width-svg',
    templateUrl: './width-svg.component.html',
    styleUrls: ['./width-svg.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidthSvgComponent implements OnInit {
  private elementRef = inject(ElementRef);

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
  }

  ngOnInit() {
    this.inlineSvgContent(this.val);
  }

  private inlineSvgContent(width: number) {
    this.elementRef.nativeElement.innerHTML =
      '<svg width="70" height="6" viewBox="0 0 70 6" xmlns="http://www.w3.org/2000/svg">' +
      `<line x1="0" y1="3" x2="69" y2="3" stroke-width="${width}"></line></svg>`;
  }
}
