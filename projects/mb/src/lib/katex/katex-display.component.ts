import { AfterContentInit, ChangeDetectionStrategy, PLATFORM_ID, Component, ElementRef, afterNextRender, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { KatexOptions } from 'katex';

import { KatexSettingsService } from './katex-settings.service';
import { KatexDirective } from './katex.directive';

/** KaTeX settings taken from  https://katex.org/docs/options.html. */
const defaultOptions: KatexOptions = {
  throwOnError: false,
  strict: true,
  displayMode: true,
  output: 'html', // Set to 'mathml' to display TeX source.
  leqno: false, // Set to true to place equation tags to the left instead of right.
  fleqn: false // Set to true to align equations left instead of center.
};

/** Component to render a TeX input in display mode with optional equation tag. */
@Component({
    selector: 'mb-kd',
    templateUrl: './katex-display.component.html',
    styleUrls: ['./katex-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [KatexDirective]
})
export class KatexDisplayComponent implements AfterContentInit {
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
    
        this.settings.tagLeftObservable().subscribe({next: s => {
          this.options = { ...defaultOptions, leqno: s };
        }});
    
        this.settings.equationLeftObservable().subscribe({next: s => {
          this.options = { ...defaultOptions, fleqn: s };
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
