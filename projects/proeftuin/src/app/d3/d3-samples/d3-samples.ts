import { D3Sample } from './d3-sample';

export const treeNodes: D3Sample[] = [
  {
    name: 'Hilbert chart', route: 'sample-5'
  }, {
    name: 'Horizon chart', route: 'sample-7'
  }, {
    name: 'Here be dragons!', route: 'sample-6'
  }, {
    name: 'D3',
    children: [
      {name: 'Random bar chart', route: 'sample-1'},
      {name: 'Draggable brush', route: 'sample-2'},
      {name: 'Brush & zoom area chart', route: 'sample-3'},
      {name: 'Real-time chart', route: 'sample-8'}
    ]
  }, {
    name: 'Techan', route: 'sample-4'
  }
];
