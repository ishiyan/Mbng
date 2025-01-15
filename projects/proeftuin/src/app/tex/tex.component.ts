import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';

import { Category } from './categories/category';
import { categories } from './categories/categories';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { TexListComponent } from './tex-list/tex-list.component';

@Component({
    selector: 'app-tex-sample-collection',
    templateUrl: './tex.component.html',
    styleUrls: ['./tex.component.scss'],
    imports: [MatToolbar, MatButton, MatIcon, MatSidenavContainer, MatSidenav, MatNavList, NgFor, MatListItem, RouterLinkActive, RouterLink, MatSidenavContent, MatSlideToggle, FormsModule, TexListComponent]
})
export class TexComponent {
  public readonly categories: Category[] = categories;
  public category: Category = categories[0];
  public renderMathJax = true;
  public renderKatex = true;

  constructor(router: Router) {
    const routeUrl = router.routerState.snapshot.url;
    for (const cat of categories) {
      const url = '/tex/' + cat.route;
      if (routeUrl === url) {
        this.category = cat;
        break;
      }
    }
  }

}
