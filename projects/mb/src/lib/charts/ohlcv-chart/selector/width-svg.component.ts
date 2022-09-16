import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mb-width-svg',
  templateUrl: './width-svg.component.html',
  styleUrls: ['./width-svg.component.scss']
})
export class WidthSvgComponent implements OnInit {
  private val = 1;
  @Input() set value(v: number) {
    if (this.val !== v) {
      this.val = v;
      this.inlineSvgContent(v);
    }
  }
  get value(): number {
    return this.val;
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.inlineSvgContent(this.value);
  }

  private inlineSvgContent(width: number) {
    this.elementRef.nativeElement.innerHTML =
      '<svg width="40" height="6" viewBox="0 0 40 6" xmlns="http://www.w3.org/2000/svg">' +
      `<line x1="0" y1="3" x2="59" y2="3" stroke-width="${width}"></line></svg>`;
  }
}
