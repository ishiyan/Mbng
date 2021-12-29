import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a function called when a node is displayed and returning a number representing a stroke width.
 */
export type HierarchyTreeStrokeWidthFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => number;

/**
 * Provides an implementation of the *'no stroke width'* **HierarchyTreeStrokeWidthFunction** type.
 */
export const noStrokeWidth: HierarchyTreeStrokeWidthFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 0;

/**
 * Provides  a *'thin'* implementation of the *'linear stroke width'* **HierarchyTreeStrokeWidthFunction** type.
 */
export const linearStrokeWidthThin: HierarchyTreeStrokeWidthFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  d.depth < 2 ? 1 : (d.depth < 3 ? 0.6 : (d.depth < 4 ? 0.3 : 0.1));

/**
 * Provides a *'normal'* implementation of the *'linear stroke width'* **HierarchyTreeStrokeWidthFunction** type.
 */
export const linearStrokeWidth: HierarchyTreeStrokeWidthFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  d.depth < 2 ? 2 : (d.depth < 3 ? 1 : (d.depth < 4 ? 0.5 : 0.1));

/**
 * Provides a *'thick'* implementation of the *'linear stroke width'* **HierarchyTreeStrokeWidthFunction** type.
 */
export const linearStrokeWidthThick: HierarchyTreeStrokeWidthFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  d.depth < 2 ? 3 : (d.depth < 3 ? 1.5 : (d.depth < 4 ? 0.7 : 0.5));

/**
 * Provides an *'extra-thick'* implementation of the *'linear stroke width'* **HierarchyTreeStrokeWidthFunction** type.
 */
export const linearStrokeWidthExtraThick: HierarchyTreeStrokeWidthFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  d.depth < 2 ? 4 : (d.depth < 3 ? 2 : (d.depth < 4 ? 1 : 0.5));
