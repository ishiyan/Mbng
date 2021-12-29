import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from './categories/category';
import { categories } from './categories/categories';

@Component({
  selector: 'tex-sample-collection',
  templateUrl: './tex.component.html',
  styleUrls: ['./tex.component.scss']
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
