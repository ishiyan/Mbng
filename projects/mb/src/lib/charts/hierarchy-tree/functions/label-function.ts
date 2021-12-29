import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a function returning a text string which will be displayed as a label for a node.
 *
 * Several simple implementations of this method are provided.
 * - **nameLabels** will return node name or an empty string if the name is undefined.
 * - **valueLabels** will return node name or an empty string if the name is undefined.
 * - **emptyLabels** will return an empty string for all nodes.
 */
export type HierarchyTreeLabelFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => string;

/**
 * Provides an implementation of the **HierarchyTreeLabelFunction** type.
 *
 * For each node, this function returns its name or an empty string if the name is undefined.
 */
export const nameLabels: HierarchyTreeLabelFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => (d && d.data.name) ? d.data.name : '';

/**
 * Provides an implementation of the **HierarchyTreeLabelFunction** type.
 *
 * For each node, this function returns its value or an empty string if the value is undefined.
 */
export const valueLabels: HierarchyTreeLabelFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) =>
  d.data.value ? d.data.value.toString() : (d.value ? d.value.toString() : '');

/**
 * Provides an implementation of the **HierarchyTreeLabelFunction** type.
 *
 * For each node, this function returns an empty string.
 */
export const emptyLabels: HierarchyTreeLabelFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => '';
