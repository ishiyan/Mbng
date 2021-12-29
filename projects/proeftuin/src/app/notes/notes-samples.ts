import { NotesSample } from './notes-sample';

export const treeNodes: NotesSample[] = [
  {
    name: 'Asset Management simulations',
    children: [
      {
        name: 'Hierarchies',
        children: [
          { name: 'Demo', header: 'Visualising hierarchical data', route: 'am/hi/d1' },
          { name: 'Industry classifications', header: 'Industry classifications', route: 'am/hi/d2' }
        ]
      },
      {
        name: 'Fixed mix',
        children: [
          { name: 'Single', header: 'AM fixed mix single', route: 'am/fm/s1' },
          { name: 'Single interactive', header: 'AM fixed mix single interactive', route: 'am/fm/s2' },
          { name: 'Buckets', header: 'AM fixed mix buckets', route: 'am/fm/b1' },
          { name: 'Buckets interactive', header: 'AM fixed mix buckets interactive', route: 'am/fm/b2' }
        ]
      }
    ]
  }
];
