import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTree, MatTreeNodeDef, MatTreeNodeToggle, MatNestedTreeNode, MatTreeNodePadding, MatTreeNodeOutlet } from '@angular/material/tree';

import { NotesSample } from './notes-sample';
import { treeNodes } from './notes-samples';

@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
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
export class NotesComponent {
  public sample: NotesSample = treeNodes[0];
  public treeControl = new NestedTreeControl<NotesSample>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<NotesSample>();

  private static findEqual(node: NotesSample, routeUrl: string): NotesSample | undefined {
    if (node.route) {
      const url = '/notes/' + node.route;
      if (routeUrl === url) {
        return node;
      }
    }
    if (node.children) {
      for (const child of node.children) {
        const n = NotesComponent.findEqual(child, routeUrl);
        if (n) {
          return n;
        }
      }
    }
    return undefined;
  }

  private static findFirst(node: NotesSample): NotesSample | undefined {
    if (node.route) {
      return node;
    }
    if (node.children) {
      for (const child of node.children) {
        const n = NotesComponent.findFirst(child);
        if (n) {
          return n;
        }
      }
    }
    return undefined;
  }

  public hasChild = (_: number, node: NotesSample) => !!node.children && node.children.length > 0;

  constructor() {
    const router = inject(Router);
    const routeUrl = router.routerState.snapshot.url;
    for (const node of treeNodes) {
      const n = NotesComponent.findEqual(node, routeUrl);
      if (n) {
        this.sample = n;
        break;
      }
    }
    if (!this.sample) {
      for (const node of treeNodes) {
        const n = NotesComponent.findFirst(node);
        if (n) {
          this.sample = n;
          break;
        }
      }
    }
    this.dataSource.data = treeNodes;
  }
}
