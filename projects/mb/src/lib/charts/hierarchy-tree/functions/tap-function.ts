import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a function called when a node is tapped or clicked allowing to display a node information.
 * A zooming functionality is performed independently from this function.
 *
 * A default implementation does nothing when a node is tapped or clicked.
 */
export type HierarchyTreeTapFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => void;


/**
 * Provides a *'do nothing'* implementation of the **HierarchyTreeTapFunction** type.
 */
export const doNothingTap: HierarchyTreeTapFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => {};
