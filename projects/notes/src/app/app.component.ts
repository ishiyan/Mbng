import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FlexModule } from '@angular/flex-layout/flex';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
  private overlay = inject(OverlayContainer);

  @HostBinding('class') className = lightClassName;

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
