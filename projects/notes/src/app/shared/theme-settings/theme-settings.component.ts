import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
  
  // Input signals for controlling visibility
  dynamicTheming = input<boolean>(true);
  dynamicThemingShowTertiary = input<boolean>(true);
  dynamicThemingShowContrast = input<boolean>(true);
  dynamicThemingShowVariant = input<boolean>(true);
  dynamicThemingShowSpecVersion = input<boolean>(true);
  dynamicThemingShowPlatform = input<boolean>(true);
  dynamicThemingShowRememberTheme = input<boolean>(true);
  lightDark = input<boolean>(true);
  downloadThemeSCSS = input<boolean>(true);

  protected downloadScssStyle(): void {
    if (this.params) {
      downloadSCSS(this.params, true);
    }
  }
}
