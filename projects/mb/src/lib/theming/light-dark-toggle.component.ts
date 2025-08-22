import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { LightDarkService } from './light-dark.service';

@Component({
  selector: 'mb-light-dark-toggle',
  templateUrl: './light-dark-toggle.component.html',
  styleUrls: ['./light-dark-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconButton,
    MatIcon
  ]
})
export class LightDarkToggleComponent {
  private readonly svc = inject(LightDarkService);

  protected readonly currentIcon = computed(() => {
    return this.svc.isDark() ? 'light_mode' : 'dark_mode';
  });

  protected readonly ariaLabel = computed(() => {
    return `Switch to ${this.svc.isDark() ? 'light' : 'dark'} theme`;
  });

  protected toggle(): void {
    this.svc.toggle();
  }
}