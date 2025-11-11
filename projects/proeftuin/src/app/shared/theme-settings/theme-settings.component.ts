import { ChangeDetectionStrategy, Component, inject, input, signal, ElementRef, ViewChild } from '@angular/core';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewContainerRef, TemplateRef } from '@angular/core';

import { LightDarkPreferenceComponent } from 'projects/mb/src/lib/theming/light-dark-preference.component'
import { DynamicThemingComponent } from 'projects/mb/src/lib/theming/dynamic-theming.component'
import { downloadCSS, downloadSCSS } from 'projects/mb/src/lib/theming/download'
import { DynamicThemingParameters } from 'projects/mb/src/lib/theming/generate'
import { DynamicThemingPreset } from 'projects/mb/src/lib/theming/dynamic-theming-preset.interface';
import { DynamicThemingPresetService } from 'projects/mb/src/lib/theming/dynamic-theming-preset.service';

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.component.html',
  styleUrls: ['./theme-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatMiniFabButton,
    MatIconButton,
    MatIcon,
    DynamicThemingComponent,
    LightDarkPreferenceComponent
  ]
})
export class ThemeSettingsComponent {
  @ViewChild('themeButton', { read: ElementRef }) themeButton!: ElementRef;
  @ViewChild('themeSettingsTemplate') themeSettingsTemplate!: TemplateRef<any>;

  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private presetSvc = inject(DynamicThemingPresetService);
  private overlayRef: OverlayRef | null = null;

  protected params: DynamicThemingParameters | null = null;
  protected isOpen = false;
  
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
  downloadThemeCSS = input<boolean>(true);

  protected readonly themePresets = signal<DynamicThemingPreset[]>(
    this.presetSvc.createDefaultPresets()
  );

  toggleThemeSettings(): void {
    if (this.isOpen) {
      this.closeThemeSettings();
    } else {
      this.openThemeSettings();
    }
  }

  private openThemeSettings(): void {
    if (this.overlayRef) {
      return;
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.themeButton)
      .withPositions([
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 8 },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -8 }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'theme-settings-overlay'
    });

    const templatePortal = new TemplatePortal(this.themeSettingsTemplate, this.viewContainerRef);
    this.overlayRef.attach(templatePortal);
    this.isOpen = true;

    // Close when backdrop is clicked
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeThemeSettings();
    });

    // Close on Escape key
    this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.closeThemeSettings();
      }
    });
  }

  closeThemeSettings(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.isOpen = false;
    }
  }

  protected downloadScssStyle(): void {
    if (this.params) {
      downloadSCSS(this.params, true);
    }
    this.closeThemeSettings();
  }

  protected downloadCssStyle(): void {
    if (this.params) {
      downloadCSS(this.params, true);
    }
    this.closeThemeSettings();
  }
}