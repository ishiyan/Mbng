import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a value function to sort nodes by value which is called after summation assigning values to each node.
 *
 * Several simple implementations of this method are provided.
 * - **sortNone** returns **0** for all hierarchy tree nodes which results in no soring being done.
 * - **sortAscending** sorts nodes ascending by their value.
 * - **sortDescending** sorts nodes descending by their value.
 */
export type HierarchyTreeSortFunction = (a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) => number;

/**
 * Provides an implementation of the **HierarchyTreeSortFunction** type.
 *
 * This function returns **0** for all hierarchy tree nodes which results in no soring being done.
 */
export const sortNone: HierarchyTreeSortFunction = (a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) => 0;

/**
 * Provides an implementation of the **HierarchyTreeSortFunction** type.
 *
 * This function sorts nodes ascending by their value.
 */
export const sortAscending: HierarchyTreeSortFunction = (a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) =>
  ((b && b.value) ? b.value : 0) - ((a && a.value) ? a.value : 0);

/**
 * Provides an implementation of the **HierarchyTreeSortFunction** type.
 *
 * This function sorts nodes descending by their value.
 */
export const sortDescending: HierarchyTreeSortFunction = (a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) =>
  ((a && a.value) ? a.value : 0) - ((b && b.value) ? b.value : 0);
