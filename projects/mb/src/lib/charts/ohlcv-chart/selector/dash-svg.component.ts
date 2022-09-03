import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mb-dash-svg',
  templateUrl: './dash-svg.component.html',
  styleUrls: ['./dash-svg.component.scss']
})
export class DashSvgComponent implements OnInit {
  private val = '';
  @Input() set value(v: string) {
    this.val = v;
    this.inlineSvgContent(v);
  }
  get value(): string {
    return this.val;
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.inlineSvgContent(this.value);
  }

  private inlineSvgContent(dash: string) {
    this.elementRef.nativeElement.innerHTML =
      '<svg width="40" height="6" viewBox="0 0 40 6" xmlns="http://www.w3.org/2000/svg">' +
      `<line x1="0" y1="3" x2="59" y2="3" stroke-width="1" stroke-dasharray="${dash}"></line></svg>`;
  }
}
