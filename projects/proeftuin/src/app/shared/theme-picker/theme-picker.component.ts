import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Theme } from './theme';
import { ThemeManagerService } from './theme-manager.service';
import { ThemeStorageService } from './theme-storage.service';

@Component({
    selector: 'app-theme-picker',
    templateUrl: 'theme-picker.component.html',
    styleUrls: ['theme-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  private queryParamSubscription = Subscription.EMPTY;
  currentTheme!: Theme;

  themes: Theme[] = [
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'deeppurple-amber',
      isDark: false,
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      name: 'pink-bluegrey',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      name: 'purple-green',
      isDark: true,
    },
    {
      primary: '#ffeb3b',
      accent: '#FFC107',
      name: 'yellow-amber',
      isDark: true,
    },
    {
      primary: '#795548',
      accent: '#4caf50',
      name: 'brown-green',
      isDark: true,
    },
  ];

  constructor(
    public themeManagerService: ThemeManagerService,
    private themeStorageService: ThemeStorageService,
    private activatedRoute: ActivatedRoute) {
    this.installTheme(this.themeStorageService.getStoredThemeName());
  }

  ngOnInit() {
    this.queryParamSubscription = this.activatedRoute.queryParamMap
      .pipe(map(params => params.get('theme')), filter(Boolean))
      .subscribe((themeName: string) => this.installTheme(themeName));
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  installTheme(themeName: string | null) {
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (theme.isDefault) {
      this.themeManagerService.removeTheme('theme');
    } else {
      this.themeManagerService.setTheme('theme', `assets/themes/${theme.name}.css`);
    }

    if (this.currentTheme) {
      this.themeStorageService.storeTheme(this.currentTheme);
    }
  }
}
