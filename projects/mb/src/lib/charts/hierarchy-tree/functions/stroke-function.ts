import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a function called when a node is displayed and returning a string representing a stroke color.
 */
export type HierarchyTreeStrokeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => string;

/**
 * Provides an implementation of the *'no stroke color'* **HierarchyTreeStrokeFunction** type.
 */
export const noStroke: HierarchyTreeStrokeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => '';

/**
 * Provides an implementation of the *'transparent'* **HierarchyTreeStrokeFunction** type.
 */
export const transparentStroke: HierarchyTreeStrokeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 'transparent';

/**
 * Provides an implementation of the *'black stroke color'* **HierarchyTreeStrokeFunction** type.
 */
export const blackStroke: HierarchyTreeStrokeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 'black';

/**
 * Provides an implementation of the *'white stroke color'* **HierarchyTreeStrokeFunction** type.
 */
export const whiteStroke: HierarchyTreeStrokeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 'white';
