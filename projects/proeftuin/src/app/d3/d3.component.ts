import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import {NestedTreeControl} from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTree, MatTreeNodeDef, MatTreeNode, MatTreeNodeToggle, MatNestedTreeNode, MatTreeNodePadding, MatTreeNodeOutlet } from '@angular/material/tree';

import { D3Sample } from './d3-samples/d3-sample';
import { treeNodes } from './d3-samples/d3-samples';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

@Component({
    selector: 'app-d3-sample-collection',
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.component.scss'],
    imports: [MatToolbar, MatButton, MatIcon, MatSidenavContainer, MatSidenav, MatTree, MatTreeNodeDef, MatTreeNode, MatTreeNodeToggle, RouterLinkActive, RouterLink, MatNestedTreeNode, MatTreeNodePadding, MatTreeNodeOutlet, MatSidenavContent, RouterOutlet]
})
export class D3Component {
  public sample: D3Sample = treeNodes[0];
  public treeControl = new NestedTreeControl<D3Sample>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<D3Sample>();

  constructor(router: Router) {
    const routeUrl = router.routerState.snapshot.url;
    for (const node of treeNodes) {
      const n = D3Component.findEqual(node, routeUrl);
      if (n) {
        this.sample = n;
        break;
      }
    }
    if (!this.sample) {
      for (const node of treeNodes) {
        const n = D3Component.findFirst(node);
        if (n) {
          this.sample = n;
          break;
        }
      }
    }
    this.dataSource.data = treeNodes;
  }

  private static findEqual(node: D3Sample, routeUrl: string): D3Sample | undefined {
    if (node.route) {
      const url = '/d3/' + node.route;
      if (routeUrl === url) {
        return node;
      }
    }
    if (node.children) {
      for (const child of node.children) {
        const n = D3Component.findEqual(child, routeUrl);
        if (n) {
          return n;
        }
      }
    }
    return undefined;
  }

  private static findFirst(node: D3Sample): D3Sample | undefined {
    if (node.route) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const n = D3Component.findFirst(child);
        if (n) {
          return n;
        }
      }
    }
    return undefined;
  }

  public hasChild = (_: number, node: D3Sample) => !!node.children && node.children.length > 0;
}
