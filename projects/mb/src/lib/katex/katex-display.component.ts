import { AfterContentInit, ChangeDetectionStrategy, PLATFORM_ID, Component, ElementRef, afterNextRender, inject, signal, DOCUMENT } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KatexOptions } from 'katex';

import { KatexSettingsService } from './katex-settings.service';
import { KatexDirective } from './katex.directive';

/** KaTeX settings taken from  https://katex.org/docs/options.html. */
const defaultOptions: KatexOptions = {
  throwOnError: false,
  strict: true,
  displayMode: true, // Display or inline mode.
  output: 'html', // html (HTML only), mathml (MathML only), htmlAndMathml (both).
  leqno: false, // Set to true to place equation tags to the left instead of right.
  fleqn: false // Set to true to align equations left instead of center.
};

const empty = '';

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

  protected options = signal<KatexOptions>(this.initialSettings());
  protected expression = empty;
  protected hidden = false;

  constructor() {
    afterNextRender({
      write: () => {
        this.render();

        this.settings.tagLeftObservable().subscribe({next: () => {
          this.options.set(this.initialSettings());
        }});

        this.settings.equationLeftObservable().subscribe({next: () => {
          this.options.set(this.initialSettings());
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

    if (this.expression === empty) {
      this.expression = this.element.nativeElement.innerText;
      this.hidden = true;
    }
  }

  private initialSettings(): KatexOptions {
    return { ...defaultOptions, leqno: this.settings.tagLeft, fleqn: this.settings.equationLeft };
  }
}
