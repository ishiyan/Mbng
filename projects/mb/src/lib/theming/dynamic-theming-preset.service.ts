import { Injectable } from '@angular/core';
import { hexFromArgb } from '@material/material-color-utilities';
import { DynamicThemingParameters, generateLightDynamicScheme } from './generate';
import { DynamicThemingPreset } from './dynamic-theming-preset.interface';

@Injectable({
  providedIn: 'root'
})
export class DynamicThemingPresetService {
  
  /**
   * Generates a DynamicThemingPreset with calculated secondary color
   */
  createPreset(
    name: string,
    displayName: string,
    parameters: DynamicThemingParameters,
    description?: string
  ): DynamicThemingPreset {
    
    // Generate scheme to extract secondary color
    const scheme = generateLightDynamicScheme(parameters);
    const secondaryColor = hexFromArgb(scheme.secondary);
    
    return {
      name,
      displayName,
      primaryColor: parameters.primaryColor,
      secondaryColor,
      tertiaryColor: parameters.useTertiaryColor ? parameters.tertiaryColor : parameters.primaryColor,
      parameters
    };
  }

  /**
   * Creates presets similar to existing theme pickers
   */
  createDefaultPresets(): DynamicThemingPreset[] {
    const presets: DynamicThemingPreset[] = [];

    const defaultParams = {
      useTertiaryColor: false,
      variant: 6, // Fidelity
      specVersion: '2025' as const,
      contrastLevel: 0,
      platform: 'phone' as const
    };

    const presetConfigs = [
      // Angular prebuilt
      { name: 'ng-azure-blue', displayName: /*'Angular Azure Blue'*/'', primary: '#005cbb', tertiary: '#343dff' },
      { name: 'ng-cyan-orange', displayName: /*'Angular Cyan Orange'*/'', primary: '#00dddd', tertiary: '#ffb787' },
      { name: 'ng-magenta-violet', displayName: /*'Angular Magenta Violet'*/'', primary: '#ffabf3', tertiary: '#d5baff' },
      { name: 'ng-rose-red', displayName: /*'Angular Rose Red'*/'', primary: '#ba005c', tertiary: '#c00100' },
      // Other
      { name: 'azure-blue', displayName: /*'Azure Blue'*/'', primary: '#0061A4', tertiary: '#7C5DFA' },
      { name: 'material-purple', displayName: /*'Material Purple'*/'', primary: '#6200EE', tertiary: '#03DAC6' },
      { name: 'forest-green', displayName: /*'Forest Green'*/'', primary: '#1B5E20', tertiary: '#FF6F00' },
      { name: 'sunset-orange', displayName: /*'Sunset Orange'*/'', primary: '#FF5722', tertiary: '#795548' },
      { name: 'ocean-teal', displayName: /*'Ocean Teal'*/'', primary: '#00838F', tertiary: '#E91E63' },
      { name: 'royal-indigo', displayName: /*'Royal Indigo'*/'', primary: '#303F9F', tertiary: '#FFC107' },
    ];

    presetConfigs.forEach(config => {
      const params = new DynamicThemingParameters(
        config.primary,
        config.tertiary,
        defaultParams.useTertiaryColor = true,
        defaultParams.variant,
        defaultParams.specVersion,
        defaultParams.contrastLevel,
        defaultParams.platform
      );

      presets.push(this.createPreset(config.name, config.displayName, params));
    });

    return presets;
  }
}