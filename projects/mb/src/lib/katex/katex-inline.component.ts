import { AfterContentInit, ChangeDetectionStrategy, PLATFORM_ID, Component, ElementRef, inject, afterNextRender } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { KatexOptions } from 'katex';

import { KatexSettingsService } from './katex-settings.service';
import { KatexDirective } from './katex.directive';

/** KaTeX settings taken from  https://katex.org/docs/options.html. */
const defaultOptions: KatexOptions = {
  throwOnError: false,
  strict: true,
  displayMode: false,
  output: 'html' // Set to 'mathml' to display TeX source.
};

/** Component to render a TeX input in inline mode. */
@Component({
    selector: 'mb-ki',
    templateUrl: './katex-inline.component.html',
    styleUrls: ['./katex-inline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [KatexDirective]
})
export class KatexInlineComponent implements AfterContentInit {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly element = inject(ElementRef);
  private readonly settings = inject(KatexSettingsService);

  protected options: KatexOptions = defaultOptions;
  protected expression = '';
  protected hidden = false;

  constructor() {
    afterNextRender({
      write: () => {
        this.render();
        this.settings.sourceObservable().subscribe({next: s => {
          this.options = { ...defaultOptions, output: s ? 'mathml' : 'html' };
        }});
      }
    });
  }
  
  // Angular 19: components are not guaranteed to be hydrated before the callback runs.
  // You must use caution when directly reading or writing the DOM and layout.
  // KaTex is not rendered without this lifecycle hook.
  ngAfterContentInit(): void {
    this.render();
  }

  private render () {
    if (!isPlatformBrowser(this.platformId) || !this.document || this.document === null) {
      return;
    }

    const tex = this.element.nativeElement.innerText;
    this.expression = tex;
    this.hidden = true;
  }
}
