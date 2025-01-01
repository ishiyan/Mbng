import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { KatexSettingsService } from 'mb';

@Component({
    selector: 'app-katex-settings',
    templateUrl: './katex-settings.component.html',
    styleUrls: ['./katex-settings.component.scss'],
    standalone: false
})
export class KatexSettingsComponent {

  protected sourceInitial: boolean;
  protected tagLeftInitial: boolean;
  protected equationLeftInitial: boolean;

  constructor(protected settings: KatexSettingsService) {
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
