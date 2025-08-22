import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { LayoutSettingsService, LayoutMode } from './layout-settings.service';

@Component({
  selector: 'app-layout-settings',
  templateUrl: './layout-settings.component.html',
  styleUrls: ['./layout-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSlideToggle
  ]
})
export class LayoutSettingsComponent {
  readonly layoutSettings = inject(LayoutSettingsService);

  protected onLayoutChange(mode: LayoutMode): void {
    this.layoutSettings.layoutMode.set(mode);
  }
}
