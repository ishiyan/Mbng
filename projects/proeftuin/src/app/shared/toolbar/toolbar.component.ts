import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIconButton, MatAnchor } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    imports: [MatToolbar, MatToolbarRow, MatIconButton, MatIcon, NgFor, MatAnchor, RouterLink, ThemePickerComponent, NgIf]
})
export class ToolbarComponent {
  private map: any = {};
  private mapKeys: any = [];
  public secondRowOpen = true;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('mbrane-top', sanitizer.bypassSecurityTrustResourceUrl('assets/img/mbrane-top.svg'));
  }

  @Input() public set toolbarItems(input: any) {
    this.map = input;
    this.mapKeys = Object.keys(input);
  }

  public get items() {
    return this.map;
  }

  public get itemKeys() {
    return this.mapKeys;
  }
}
