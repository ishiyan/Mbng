import { Component, ElementRef, OnInit, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'mb-svg-viewer',
    templateUrl: './svg-viewer.component.html',
    styleUrls: ['./svg-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush    
})
export class SvgViewerComponent implements OnInit {
  private elementRef = inject(ElementRef);
  private httpClient = inject(HttpClient);

  readonly src = input.required<string>();
  readonly scaleToContainer = input(false);

  ngOnInit() {
    this.fetchAndInlineSvgContent(this.src());
  }

  private inlineSvgContent(template: string) {
    this.elementRef.nativeElement.innerHTML = template;

    if (this.scaleToContainer()) {
      const svg = this.elementRef.nativeElement.querySelector('svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
  }

  private fetchAndInlineSvgContent(path: string): void {
    this.httpClient.get(path, { responseType: 'text' }).subscribe(svgResponse => {
      this.inlineSvgContent(svgResponse);
    });
  }
}
