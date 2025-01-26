import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, inject } from '@angular/core';
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
export class KatexDisplayComponent implements AfterContentInit, OnInit {
  private element = inject(ElementRef);
  private settings = inject(KatexSettingsService);

  protected options: KatexOptions = defaultOptions;
  protected expression = '';
  protected hidden = false;

  ngOnInit(): void {
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

  ngAfterContentInit(): void {
    const tex = this.element.nativeElement.innerText;
    this.expression = tex;
    this.hidden = true;
  }
}
