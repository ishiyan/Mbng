import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { DynamicThemingComponent, LightDarkPreferenceComponent } from 'mb'
import { DynamicThemingParameters, downloadSCSS } from 'mb'

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.component.html',
  styleUrls: ['./theme-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatMiniFabButton,
    MatIcon,
    DynamicThemingComponent,
    LightDarkPreferenceComponent
  ]
})
export class ThemeSettingsComponent {
  protected params: DynamicThemingParameters|null = null;

  protected downloadScssStyle(): void {
    if (this.params) {
      downloadSCSS(this.params, true);
    }
  }
}
