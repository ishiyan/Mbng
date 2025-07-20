import {Component, OnDestroy, inject} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {ThemePicker} from '../theme-picker/theme-picker';
import {AppLogo} from '../logo/logo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  imports: [
    MatButton,
    MatIconButton,
    RouterLink,
    RouterLinkActive,
    ThemePicker,
    AppLogo,
    NgTemplateOutlet,
  ],
})
export class NavBar {
}