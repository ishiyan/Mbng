import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';

import { KatexSettingsService } from 'mb';

@Component({
  selector: 'app-katex-settings',
  templateUrl: './katex-settings.component.html',
  styleUrls: ['./katex-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSlideToggle, MatIcon]
})
export class KatexSettingsComponent {
  protected settings = inject(KatexSettingsService);

  protected sourceInitial: boolean;
  protected tagLeftInitial: boolean;
  protected equationLeftInitial: boolean;

  constructor() {
    const settings = this.settings;
    this.sourceInitial = settings.source;
    this.tagLeftInitial = settings.tagLeft;
    this.equationLeftInitial = settings.equationLeft;
  }

  protected sourceChanged(event: MatSlideToggleChange) {
    this.settings.source = event.checked;
  }

  protected tagLeftChanged(event: MatSlideToggleChange) {
    this.settings.tagLeft = event.checked;
  }

  protected equationLeftChanged(event: MatSlideToggleChange) {
    this.settings.equationLeft = event.checked;
  }
}
