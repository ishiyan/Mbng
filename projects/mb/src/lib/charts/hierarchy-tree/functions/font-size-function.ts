import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a function returning a label font size for a given node.
 */
export type HierarchyTreeFontSizeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => number;

/**
 * Provides an *'equal font size 8'* implementation of the **HierarchyTreeFontSizeFunction** type.
 */
export const equalFontSize8: HierarchyTreeFontSizeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 8;

/**
 * Provides an *'equal font size 10'* implementation of the **HierarchyTreeFontSizeFunction** type.
 */
export const equalFontSize10: HierarchyTreeFontSizeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 10;

/**
 * Provides an *'equal font size 12'* implementation of the **HierarchyTreeFontSizeFunction** type.
 */
export const equalFontSize12: HierarchyTreeFontSizeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 12;

/**
 * Provides an *'equal font size 14'* implementation of the **HierarchyTreeFontSizeFunction** type.
 */
export const equalFontSize14: HierarchyTreeFontSizeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 14;

/**
 * Provides an *'equal font size 16'* implementation of the **HierarchyTreeFontSizeFunction** type.
 */
export const equalFontSize16: HierarchyTreeFontSizeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 16;

/**
 * Provides an *'equal font size 18'* implementation of the **HierarchyTreeFontSizeFunction** type.
 */
export const equalFontSize18: HierarchyTreeFontSizeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) => 18;

/**
 * Provides an *'linear font size'* implementation of the **HierarchyTreeFontSizeFunction** type.
 */
export const linearFontSize: HierarchyTreeFontSizeFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  d.depth < 2 ? 18 : (d.depth < 3 ? 16 : (d.depth < 4 ? 12 : 10));
