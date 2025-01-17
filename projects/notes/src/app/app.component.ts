import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SeriesListComponent } from './shared/data/series-list/series-list.component';
import { KatexSettingsComponent } from './shared/katex-settings/katex-settings.component';

const darkClassName = 'darkMode';
const lightClassName = '';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [FlexModule, MatToolbar, MatIconButton, RouterLink, MatIcon, MatSidenavContainer, MatSidenav, SeriesListComponent, KatexSettingsComponent, MatSidenavContent, RouterOutlet]
})
export class AppComponent {
  @HostBinding('class') className = lightClassName;

  constructor(private overlay: OverlayContainer) { }

  protected isDarkTheme(): boolean {
    return this.className === darkClassName;
  }

  protected toggleTheme(): void {
    if (this.className === darkClassName) {
      this.overlay.getContainerElement().classList.remove(darkClassName);
      this.className = lightClassName;
    } else {
      this.overlay.getContainerElement().classList.add(darkClassName);
      this.className = darkClassName;
    }
  }
}
