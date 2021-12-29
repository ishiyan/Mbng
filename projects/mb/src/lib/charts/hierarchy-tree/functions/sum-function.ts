import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a value function returning a non-negative number which will be called by the
 * **sum** method of the **d3.HierarchyNode<Datum>** interface for all nodes in a hierarchy tree.
 *
 * The relative sizes of all nodes will be defined based on values this method returns.
 * Several simple implementations of this method are provided.
 * - **sumNumberOfLeafNodes** will return **0** or **1** per node depending on the presense of child nodes.
 * This will result in node sizes being proportional to the number of leaf sub-nodes.
 * - **sumNumberOfNodes** will return **1** for all hierarchy tree nodes.
 * This will result in node sizes being proportional to the number of sub-nodes.
 * - **sumNodeValues** will return the numeric value of the **value** property or **0** if it is undefined.
 * This will result in node sizes being proportional to the cumulative value of sub-nodes.
 */
export type HierarchyTreeSumFunction = (d: HierarchyTreeNode) => number;

/**
 * Provides an implementation of the **HierarchyTreeSumFunction** type.
 *
 * This function returns **0** or **1** per hierarchy tree node depending on the presense of child nodes.
 *
 * This will result in node sizes being proportional to the number of leaf nodes.
 */
export const sumNumberOfLeafNodes: HierarchyTreeSumFunction = (d: HierarchyTreeNode) => d.children ? 0 : 1;

/**
 * Provides an implementation of the **HierarchyTreeSumFunction** type.
 *
 * This function returns **1** for all hierarchy tree nodes.
 *
 * This will result in node sizes being proportional to the number of sub-nodes.
 */
export const sumNumberOfNodes: HierarchyTreeSumFunction = (d: HierarchyTreeNode) => 1;

/**
 * Provides an implementation of the **HierarchyTreeSumFunction** type.
 *
 * For each node, this function returns the numeric value of the **value** property or **0** if it is undefined.
 *
 * This will result in node sizes being proportional to the cumulative value of sub-nodes.
 */
export const sumNodeValues: HierarchyTreeSumFunction = (d: HierarchyTreeNode) => d.value ? d.value : 0;
