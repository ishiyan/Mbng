import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

import { SeriesListComponent } from './shared/data/series-list/series-list.component';
import { ContentSettingsComponent } from './shared/content-settings/content-settings.component';
import { ThemeSettingsComponent } from './shared/theme-settings/theme-settings.component';
import { LayoutSettingsComponent } from './shared/layout-settings/layout-settings.component';

import { DynamicColorTokensComponent } from 'mb';
import { LightDarkToggleComponent } from 'mb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatToolbar,
    RouterOutlet,
    MatIconButton,
    MatIcon,
    MatDivider,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    SeriesListComponent,
    ContentSettingsComponent,
    ThemeSettingsComponent,
    DynamicColorTokensComponent,
    LightDarkToggleComponent,
    LayoutSettingsComponent
  ]
})
export class AppComponent {
}
