import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a function called when a node is displayed and returning a fill color opacity number in the range of [0, 1].
 */
export type HierarchyTreeFillOpacityFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, maxHeight: number) => number;

/**
 * Provides an *'transparent'* implementation of the **HierarchyTreeFillOpacityFunction** type.
 */
export const transparentFillOpacity: HierarchyTreeFillOpacityFunction = (d: d3.HierarchyNode<HierarchyTreeNode>, maxHeight: number) => 0;

/**
 * Provides an *'opaque'* implementation of the **HierarchyTreeFillOpacityFunction** type.
 */
export const opaqueFillOpacity: HierarchyTreeFillOpacityFunction = (d: d3.HierarchyNode<HierarchyTreeNode>, maxHeight: number) => 1;

/**
 * Provides an *'linear'* implementation of the **HierarchyTreeFillOpacityFunction** type.
 */
export const linearFillOpacity: HierarchyTreeFillOpacityFunction = (d: d3.HierarchyNode<HierarchyTreeNode>, maxHeight: number) =>
  1 - (d.depth - 1) / (maxHeight * 1.9);
