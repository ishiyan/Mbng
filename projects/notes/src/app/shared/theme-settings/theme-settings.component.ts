import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { DynamicThemingComponent, LightDarkPreferenceComponent } from 'mb'
import { DynamicThemingParameters, downloadSCSS } from 'mb'
import { DynamicThemingPreset, DynamicThemingPresetService } from 'mb';

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
  private presetSvc = inject(DynamicThemingPresetService);
  protected params: DynamicThemingParameters|null = null;
  
  // Input signals for controlling visibility
  dynamicTheming = input<boolean>(true);
  dynamicThemingShowPresets = input<boolean>(true);
  dynamicThemingShowGenerator = input<boolean>(true);
  dynamicThemingShowTertiary = input<boolean>(true);
  dynamicThemingShowContrast = input<boolean>(true);
  dynamicThemingShowVariant = input<boolean>(true);
  dynamicThemingShowSpecVersion = input<boolean>(true);
  dynamicThemingShowPlatform = input<boolean>(true);
  dynamicThemingShowColorDisc = input<boolean>(true);
  dynamicThemingShowRememberTheme = input<boolean>(true);
  lightDark = input<boolean>(true);
  downloadThemeSCSS = input<boolean>(true);

  protected readonly themePresets = signal<DynamicThemingPreset[]>(
    this.presetSvc.createDefaultPresets()
  );

  protected downloadScssStyle(): void {
    if (this.params) {
      downloadSCSS(this.params, true);
    }
  }
}
