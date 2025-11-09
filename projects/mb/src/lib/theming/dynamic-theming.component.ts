import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

import { ColorDiscPickerComponent } from '../colors/color-disc/color-disc-picker.component';
import { ColorRingPickerComponent } from '../colors/color-ring/color-ring-picker.component';
import { DynamicColorService } from './dynamic-color.service';
import { DynamicThemingService } from './dynamic-theming.service';
import { DynamicThemingVariant } from './dynamic-theming-variant.enum';
import { DynamicThemingParameters } from './generate';
import { DynamicThemingPreset } from './dynamic-theming-preset.interface';

@Component({
  selector: 'mb-dynamic-theming',
  templateUrl: './dynamic-theming.component.html',
  styleUrls: ['./dynamic-theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatSlider,
    MatSliderThumb,
    ColorDiscPickerComponent,
    ColorRingPickerComponent
  ]
})
export class DynamicThemingComponent {
  protected readonly DynamicThemingVariant = DynamicThemingVariant;

  protected readonly dtsSvc = inject(DynamicThemingService);
  protected readonly dcsSvc = inject(DynamicColorService);

  // Output parameter for current DynamicThemingParameters
  parametersChange = output<DynamicThemingParameters>();
  
  // Input signals for controlling visibility
  showPresets = input<boolean>(true);
  showGenerator = input<boolean>(true);
  showTertiary = input<boolean>(true);
  showContrast = input<boolean>(true);
  showVariant = input<boolean>(true);
  showSpecVersion = input<boolean>(true);
  showPlatform = input<boolean>(true);
  showRememberTheme = input<boolean>(true);
  showColorDisc = input<boolean>(true);
  
  // Input for theme presets
  presets = input<DynamicThemingPreset[]>([]);

  protected internalShowColorDisc = signal<boolean>(true);

  constructor() {
    effect(() => {
      const currentParams = this.dtsSvc.currentParameters();
      this.parametersChange.emit(currentParams);
    });
    effect(() => {
      this.internalShowColorDisc.set(this.showColorDisc());
    });
  }

  protected applyPreset(preset: DynamicThemingPreset): void {
    const params = preset.parameters;
    
    // Apply all parameters from the preset
    this.dtsSvc.primaryColor.set(params.primaryColor);
    this.dtsSvc.tertiaryColor.set(params.tertiaryColor);
    this.dtsSvc.useTertiaryColor.set(params.useTertiaryColor);
    this.dtsSvc.variant.set(params.variant);
    this.dtsSvc.contrastLevel.set(params.contrastLevel);
    this.dtsSvc.specVersion.set(params.specVersion);
    this.dtsSvc.platform.set(params.platform);
  }
}