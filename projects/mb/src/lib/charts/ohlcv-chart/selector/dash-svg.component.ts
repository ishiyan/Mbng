import { ChangeDetectionStrategy, Component, ElementRef, OnInit, effect, inject, input } from '@angular/core';

@Component({
    selector: 'mb-dash-svg',
    templateUrl: './dash-svg.component.html',
    styleUrls: ['./dash-svg.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashSvgComponent implements OnInit {
  private elementRef = inject(ElementRef);

  private val = '';
  value = input.required<string>();

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

  private inlineSvgContent(dash: string) {
    this.elementRef.nativeElement.innerHTML =
      '<svg width="70" height="6" viewBox="0 0 70 6" xmlns="http://www.w3.org/2000/svg">' +
      `<line x1="0" y1="3" x2="69" y2="3" stroke-width="1" stroke-dasharray="${dash}"></line></svg>`;
  }
}
