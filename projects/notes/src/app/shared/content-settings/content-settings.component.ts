import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { KatexSettingsService } from 'mb';

import { ContentSettingsService } from './content-settings.service';

@Component({
  selector: 'app-content-settings',
  templateUrl: './content-settings.component.html',
  styleUrls: ['./content-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSlideToggle
  ]
})
export class ContentSettingsComponent {
  protected readonly katexSettings = inject(KatexSettingsService);
  protected readonly contentSettings = inject(ContentSettingsService);
  protected remember = false;
  
  // Input signals for controlling visibility
  enableChartEditing = input<boolean>(true);
  LeftAlignedEquations = input<boolean>(true);
  leftAlignedEquationNumbers = input<boolean>(true);
  rememberPreferences = input<boolean>(true);
}
