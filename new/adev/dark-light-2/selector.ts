import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import {DOCUMENT, Location, isPlatformBrowser} from '@angular/common';
import {ChangeDetectionStrategy, Component, DestroyRef, PLATFORM_ID, inject} from '@angular/core';
import {ConnectionPositionPair} from '@angular/cdk/overlay';

import {IconComponent} from './icon.component';
import {Theme, ThemeManager} from './theme-manager.service';

type MenuType = 'social' | 'theme-picker' | 'version-picker';

@Component({
  selector: 'div.adev-nav',
  imports: [CdkMenu, CdkMenuItem, CdkMenuTrigger, IconComponent],
  templateUrl: './selector.html',
  styleUrls: ['selector.scss', 'mini-menu.scss', 'nav-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation {
  private readonly themeManager = inject(ThemeManager);


  miniMenuPositions = [
    new ConnectionPositionPair(
      {originX: 'end', originY: 'center'},
      {overlayX: 'start', overlayY: 'center'},
    ),
    new ConnectionPositionPair(
      {originX: 'end', originY: 'top'},
      {overlayX: 'start', overlayY: 'top'},
    ),
  ];

  theme = this.themeManager.theme;
  openedMenu: MenuType | null = null;

  setTheme(theme: Theme): void {
    this.themeManager.setTheme(theme);
  }

  openMenu(menuType: MenuType): void {
    this.openedMenu = menuType;
  }

  closeMenu(): void {
    this.openedMenu = null;
  }
}