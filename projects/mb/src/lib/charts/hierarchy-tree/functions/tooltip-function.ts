import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a function returning a text string which will be displayed as a tooltip for a node.
 *
 * Several simple implementations of this method are provided.
 * - **emptyTooltips** will return an empty string for all nodes.
 * - **pathTooltips** will return node path separated by '/' characters.
 * - **pathValueTooltips** will return node path separated by '/' characters and an optional value on a separate line.
 */
export type HierarchyTreeTooltipFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => string;

/**
 * Provides an implementation of the **HierarchyTreeTooltipFunction** type.
 *
 * For each node, this function returns an empty string.
 */
export const emptyTooltips: HierarchyTreeTooltipFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => '';

const format = d3.format(',d');

export const pathParentTooltips: HierarchyTreeTooltipFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => {
  let text = d.data.name ? d.data.name : '???';
  while (d.parent && d.parent != null) {
    d = d.parent;
    if (d.data.name) {
      text = d.data.name + '/' + text;
    }
  }
  return text;
};

/**
 * Provides an implementation of the **HierarchyTreeTooltipFunction** type.
 *
 * For each node, this function returns its path separated by new lines.
 */
export const pathTooltips: HierarchyTreeTooltipFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) =>
  `${d.ancestors().map((t: d3.HierarchyNode<HierarchyTreeNode>) => t.data.name).reverse().join('\n')}`;

/**
 * Provides an implementation of the **HierarchyTreeTooltipFunction** type.
 *
 * For each node, this function returns its path separated by new lines and an optional value.
 */
export const pathValueTooltips: HierarchyTreeTooltipFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) =>
  `${d.ancestors().map((t: d3.HierarchyNode<HierarchyTreeNode>) => t.data.name).reverse().join('\n')}${d.data.value ? '\n' + format(d.data.value) : ''}`;
