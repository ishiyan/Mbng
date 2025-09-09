import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTree, MatTreeNodeDef, MatTreeNodeToggle, MatNestedTreeNode, MatTreeNodePadding, MatTreeNodeOutlet } from '@angular/material/tree';

import { D3Sample } from './d3-sample';
import { treeNodes } from './d3-samples';

@Component({
  selector: 'app-d3-sample-collection',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButton,
    MatIcon,
    MatToolbar,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatTree,
    MatTreeNodeDef,
    MatTreeNodeToggle,
    MatNestedTreeNode,
    MatTreeNodePadding,
    MatTreeNodeOutlet
  ]
})
export class D3Component {
  public sample: D3Sample = treeNodes[0];
  public treeControl = new NestedTreeControl<D3Sample>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<D3Sample>();

  constructor() {
    const router = inject(Router);
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
