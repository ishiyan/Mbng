import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

import { DynamicColorService } from './dynamic-color.service';
import { DynamicThemingService } from './dynamic-theming.service';
import { DynamicThemingVariant } from './dynamic-theming-variant.enum';
import { DynamicThemingParameters } from './generate';

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
  ]
})
export class DynamicThemingComponent {
  protected readonly DynamicThemingVariant = DynamicThemingVariant;

  protected readonly dtsSvc = inject(DynamicThemingService);
  protected readonly dcsSvc = inject(DynamicColorService);

  // Output parameter for current DynamicThemingParameters
  parametersChange = output<DynamicThemingParameters>();
  
  // Input signals for controlling visibility
  showTertiary = input<boolean>(true);
  showContrast = input<boolean>(true);
  showVariant = input<boolean>(true);
  showSpecVersion = input<boolean>(true);
  showPlatform = input<boolean>(true);
  showRememberTheme = input<boolean>(true);

  constructor() {
    effect(() => {
      const currentParams = this.dtsSvc.currentParameters();
      this.parametersChange.emit(currentParams);
    });
  }
}
