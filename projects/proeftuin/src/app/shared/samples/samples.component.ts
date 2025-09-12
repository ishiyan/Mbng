import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatTree, MatTreeNodeDef, MatTreeNodeToggle, MatTreeNode, MatTreeNodePadding } from '@angular/material/tree';

import { Sample } from './sample';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButton,
    MatIcon,
    MatToolbar,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatTree,
    MatTreeNodeDef,
    MatTreeNodeToggle,
    MatTreeNode,
    MatTreeNodePadding
  ]
})
export class SamplesComponent {
  treeNodes = input.required<Sample[]>();

  /** Prefix for the route, e.g. '/mb/', '/d3/' or '/tex/' */
  routePrefix = input.required<string>();

  /** Prefix for to display in the toolbar header, e.g. 'Mb', 'D3' or 'Tex' */
  headerPrefix = input.required<string>();
  
  protected sample: Sample | undefined;
  protected dataSource = this.treeNodes;

  protected childrenAccessor = (node: Sample) => node.children ?? [];
  protected hasChild = (_: number, node: Sample) => !!node.children && node.children.length > 0;

  private router = inject(Router);

  constructor() {
    effect(() => {
      const treeNodesValue = this.treeNodes();
      if (treeNodesValue && treeNodesValue.length > 0) {
        this.initialize(treeNodesValue);
      }
    });
  }

  private initialize(treeNodesValue: Sample[]) {
    this.sample = treeNodesValue[0];

    const routeUrl = this.router.routerState.snapshot.url;

    // Find the sample matching the current route
    for (const node of treeNodesValue) {
      const n = this.findEqual(node, routeUrl);
      if (n) {
        this.sample = n;
        break;
      }
    }

    // If no route match, find the first available sample
    if (!this.sample.route) {
      for (const node of treeNodesValue) {
        const n = SamplesComponent.findFirst(node);
        if (n) {
          this.sample = n;
          break;
        }
      }
    }
  }

  private findEqual(node: Sample, routeUrl: string): Sample | undefined {
    if (node.route) {
      const url = this.routePrefix() + node.route;
      if (routeUrl === url) {
        return node;
      }
    }
    if (node.children) {
      for (const child of node.children) {
        const n = this.findEqual(child, routeUrl);
        if (n) {
          return n;
        }
      }
    }
    return undefined;
  }

  private static findFirst(node: Sample): Sample | undefined {
    if (node.route) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const n = SamplesComponent.findFirst(child);
        if (n) {
          return n;
        }
      }
    }
    return undefined;
  }
}
