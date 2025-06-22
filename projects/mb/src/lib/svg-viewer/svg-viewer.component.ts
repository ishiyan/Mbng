import { Component, ElementRef, ChangeDetectionStrategy, PLATFORM_ID, input, inject, afterNextRender, effect, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'mb-svg-viewer',
    templateUrl: './svg-viewer.component.html',
    styleUrls: ['./svg-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush    
})
export class SvgViewerComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly httpClient = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly src = input.required<string>();
  readonly scaleToContainer = input(false);

  constructor() {
    effect(() => {
      this.fetchAndInlineSvgContent(this.src());
    });
    afterNextRender({
      write: () => {
        this.fetchAndInlineSvgContent(this.src());
      }
    });
}

  private inlineSvgContent(template: string) {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const e = this.elementRef.nativeElement;
    if (!e || e === null) {
      return;
    }

    e.innerHTML = template;
    if (this.scaleToContainer()) {
      const svg = e.querySelector('svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
  }

  private fetchAndInlineSvgContent(path: string): void {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }
    this.httpClient.get(path, { responseType: 'text' }).subscribe(svgResponse => {
      this.inlineSvgContent(svgResponse);
    });
  }
}
