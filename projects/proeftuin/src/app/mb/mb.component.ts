import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTree, MatTreeNodeDef, MatTreeNode, MatTreeNodeToggle, MatNestedTreeNode, MatTreeNodePadding, MatTreeNodeOutlet } from '@angular/material/tree';

import { MbSample } from './mb-samples/mb-sample';
import { treeNodes } from './mb-samples/mb-samples';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

@Component({
    selector: 'mb-sample-collection',
    templateUrl: './mb.component.html',
    styleUrls: ['./mb.component.scss'],
    imports: [MatToolbar, MatButton, MatIcon, MatSidenavContainer, MatSidenav, MatTree, MatTreeNodeDef, MatTreeNode, MatTreeNodeToggle, RouterLinkActive, RouterLink, MatNestedTreeNode, MatTreeNodePadding, MatTreeNodeOutlet, MatSidenavContent, RouterOutlet]
})
export class MbComponent {
  public sample: MbSample = treeNodes[0];
  public treeControl = new NestedTreeControl<MbSample>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<MbSample>();

  private static findEqual(node: MbSample, routeUrl: string): MbSample | undefined {
    if (node.route) {
      const url = '/mb/' + node.route;
      if (routeUrl === url) {
        return node;
      }
    }
    if (node.children) {
      for (const child of node.children) {
        const n = MbComponent.findEqual(child, routeUrl);
        if (n) {
          return n;
        }
      }
    }
    return undefined;
  }

  private static findFirst(node: MbSample): MbSample | undefined {
    if (node.route) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const n = MbComponent.findFirst(child);
        if (n) {
          return n;
        }
      }
    }
    return undefined;
  }

  public hasChild = (_: number, node: MbSample) => !!node.children && node.children.length > 0;

  constructor(router: Router) {
    const routeUrl = router.routerState.snapshot.url;
    for (const node of treeNodes) {
      const n = MbComponent.findEqual(node, routeUrl);
      if (n) {
        this.sample = n;
        break;
      }
    }
    if (!this.sample) {
      for (const node of treeNodes) {
        const n = MbComponent.findFirst(node);
        if (n) {
          this.sample = n;
          break;
        }
      }
    }
    this.dataSource.data = treeNodes;
  }
}
