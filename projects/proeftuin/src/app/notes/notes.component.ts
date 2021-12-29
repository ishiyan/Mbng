import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { NotesSample } from './notes-sample';
import { treeNodes } from './notes-samples';

@Component({
  selector: 'mb-notes-collection',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
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

  constructor(router: Router) {
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
