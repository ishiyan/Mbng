import { ChangeDetectionStrategy, Component, DOCUMENT, HostBinding, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FlexModule } from '@angular/flex-layout/flex';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms'; // color selector

import { SeriesListComponent } from './shared/data/series-list/series-list.component';
import { KatexSettingsComponent } from './shared/katex-settings/katex-settings.component';
import { DynamicThemingService } from './dynamic-theme.service';
import { DynamicColorService } from './dynamic-color.service';

const darkClassName = 'darkMode';
const lightClassName = 'lightMode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule, // color selector
    RouterLink,
    FlexModule,
    MatToolbar,
    RouterOutlet,
    MatIconButton,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    SeriesListComponent,
    KatexSettingsComponent
  ]
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private overlay = inject(OverlayContainer);
  @HostBinding('class') className = lightClassName;

  protected isDarkTheme(): boolean {
    return this.className === darkClassName;
  }

  protected toggleTheme(): void {
    if (this.className === darkClassName) {
      // Remove and add from both document root and overlay container
      this.overlay.getContainerElement().classList.remove(darkClassName);
      this.document.documentElement.classList.remove(darkClassName);
      this.overlay.getContainerElement().classList.add(lightClassName);
      this.document.documentElement.classList.add(lightClassName);
      this.className = lightClassName;
    } else {
      // Remove and add to both document root and overlay container
      this.overlay.getContainerElement().classList.remove(lightClassName);
      this.document.documentElement.classList.remove(lightClassName);
      this.overlay.getContainerElement().classList.add(darkClassName);
      this.document.documentElement.classList.add(darkClassName);
      this.className = darkClassName;
    }
  }

  // Dynamic theme color
  dtsSvc = inject(DynamicThemingService);
  dcsSvc = inject(DynamicColorService);
  onPrimaryColorChange(event: any) {
    //console.log('Primary color changed:', event);
    this.dcsSvc.primaryColor.set(event);
  }
  onTertiaryColorChange(event: any) {
    //console.log('Tertiary color changed:', event);
    this.dcsSvc.tertiaryColor.set(event);
  }

}
