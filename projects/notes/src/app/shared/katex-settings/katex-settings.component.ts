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
  protected readonly settings = inject(KatexSettingsService);

  protected tagLeftInitial: boolean = this.settings.tagLeft;
  protected equationLeftInitial: boolean = this.settings.equationLeft;

  protected tagLeftChanged(event: MatSlideToggleChange) {
    this.settings.tagLeft = event.checked;
  }

  protected equationLeftChanged(event: MatSlideToggleChange) {
    this.settings.equationLeft = event.checked;
  }
}
