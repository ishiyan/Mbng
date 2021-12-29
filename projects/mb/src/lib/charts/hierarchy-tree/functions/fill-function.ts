import * as d3 from 'd3';

import { HierarchyTreeNode } from '../hierarchy-tree';

/**
 * Defines a function called when a node is displayed and returning a string representing a fill color.
 */
export type HierarchyTreeFillFunction = (
  d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>,
  minValue: number,
  maxValue: number) => string;

const fourPi = 4 * Math.PI;

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will uss the
 * **d3.interpolateRainbow** to fill a node acconding to the middle angle of the angular sector it occupies.
 */
export const rainbowMiddleFill: HierarchyTreeFillFunction = ((d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => {
  const t = (d.x1 + d.x0) / fourPi;
  return d3.interpolateRainbow(t);
  // return d3.interpolateViridis(t);
  // return d3.interpolateHslLong("yellow", "blue")(t);
}) as HierarchyTreeFillFunction;

export const gradientValueFill = (
  d: d3.HierarchyNode<HierarchyTreeNode>,
  minValue: number,
  maxValue: number,
  colorFirst: string,
  colorLast: string,
  invert: boolean = false,
  brighter: boolean = false,
  darker: boolean = false) => {
  const func = (t: any) => d3.interpolateHslLong(colorFirst, colorLast)(t);
  return interpolationValueFill(d, minValue, maxValue, func, invert, brighter, darker);
};

export const interpolationValueFill = (
  d: d3.HierarchyNode<HierarchyTreeNode>,
  minValue: number,
  maxValue: number,
  func: any,
  invert: boolean = false,
  brighter: boolean = false,
  darker: boolean = false) => {
  const delta = maxValue === minValue ? 1 : (maxValue - minValue);
  const v = d.value ? d.value : (d.data.value ? d.data.value : 0);
  const t = (v - minValue) / delta;
  let theColor = invert ? d3.hsl(func(1 - t)) : d3.hsl(func(t));
  if (brighter) {
    theColor = theColor.brighter();
  } else if (darker === darker) {
    theColor = theColor.darker();
  }
  return theColor.hex();
};

// ------------------------------------------------------------------------------------------
// Fill colors based on a node value within the value range.
// Used in Voronoi flat diagrams.
// ------------------------------------------------------------------------------------------

export const coolValueFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateCool, false, false, false);
export const coolValueFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateCool, true, false, false);
export const warmValueFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateWarm, false, false, false);
export const warmValueFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateWarm, true, false, true);
export const viridisValueFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateViridis, false, false, false);
export const viridisValueFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateViridis, true, false, true);
export const bluesValueFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateBlues, false, false, true);
export const bluesValueFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateBlues, true, false, true);
export const rainbowValueFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateRainbow, false, false, true);
export const rainbowValueFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateRainbow, true, false, true);
export const greensValueFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateGreens, false, false, true);
export const greensValueFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateGreens, true, false, true);
export const greysValueFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateGreys, false, false, true);
export const greysValueFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>, minValue: number, maxValue: number) =>
  interpolationValueFill(d, minValue, maxValue, d3.interpolateGreys, true, false, true);

export const gradientFill = (
  d: d3.HierarchyNode<HierarchyTreeNode>,
  colorFirst: string,
  colorLast: string,
  invert: boolean = false,
  brighter: boolean = false,
  darker: boolean = false,
  lighterWithDepth: boolean = true) => {
    const func = (t: any) => d3.interpolateHslLong(colorFirst, colorLast)(t);
    return interpolationFill(d, func, invert, brighter, darker, lighterWithDepth);
  };

export const interpolationFill = (
  d: d3.HierarchyNode<HierarchyTreeNode>,
  func: any,
  invert: boolean = false,
  brighter: boolean = false,
  darker: boolean = false,
  lighterWithDepth: boolean = true) => {
  let firstLevel = d;
  while (firstLevel.depth > 1 && firstLevel.parent != null) {
    firstLevel = firstLevel.parent;
  }
  let root = firstLevel;
  while (root.parent != null) {
    root = root.parent;
  }
  const rootChildren = root.children ? root.children : [];
  const index = rootChildren.indexOf(firstLevel);
  // const t = index ? index / (rootChildren.length + 1) : 0;
  const t = index ? index / rootChildren.length : 0;
  let theColor = invert ? d3.hsl(func(1 - t)) : d3.hsl(func(t));
  if (brighter) {
    theColor = theColor.brighter();
  } else if (darker === darker) {
    theColor = theColor.darker();
  }
  if (lighterWithDepth) {
    const depth = d.depth;
    theColor.l += depth === 1 ? 0 : depth * .1;
  }
  return theColor.hex();
};

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * **d3.interpolateCool** to fill a node acconding to the first-level node number and then makes
 * color lighter depending on a node depth.
 */
export const coolFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateCool);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * inverted **d3.interpolateCool** to fill a node acconding to the first-level node number and
 * then makes color lighter depending on a node depth.
 */
export const coolFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateCool, true);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * **d3.interpolateWarm** to fill a node acconding to the first-level node number and then makes
 * color lighter depending on a node depth.
 */
export const warmFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateWarm);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * inverted **d3.interpolateWarm** to fill a node acconding to the first-level node number and
 * then makes color lighter depending on a node depth.
 */
export const warmFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateWarm, true, false, true);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * **d3.interpolateViridis** to fill a node acconding to the first-level node number and then makes
 * color lighter depending on a node depth.
 */
export const viridisFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateViridis);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * inverted **d3.interpolateViridis** to fill a node acconding to the first-level node number and
 * then makes color lighter depending on a node depth.
 */
export const viridisFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateViridis, true, false, true);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * **d3.interpolateBlues** to fill a node acconding to the first-level node number and then makes
 * color lighter depending on a node depth.
 */
export const bluesFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateBlues, false, false, true);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * inverted **d3.interpolateBlues** to fill a node acconding to the first-level node number and
 * then makes color lighter depending on a node depth.
 */
export const bluesFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateBlues, true, false, true);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * **d3.interpolateRainbow** to fill a node acconding to the first-level node number and then makes
 * color lighter depending on a node depth.
 */
export const rainbowFill: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateRainbow);

/**
 * Provides an implementation of the **HierarchyTreeFillFunction** type which will use the
 * inverted **d3.interpolateRainbow** to fill a node acconding to the first-level node number and
 * then makes color lighter depending on a node depth.
 */
export const rainbowFillInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateRainbow, true);

// ------------------------------------------------------------------------------------------
// Fill colors based on first-level ancestor of a node without lightening depending on depth.
// Used in Voronoi diagrams.
// ------------------------------------------------------------------------------------------

export const coolFillFirstLevel: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateCool, false, false, false, false);

export const coolFillFirstLevelInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateCool, true, false, false, false);

export const warmFillFirstLevel: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateWarm, false, false, false, false);

export const warmFillFirstLevelInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateWarm, true, false, true, false);

export const viridisFillFirstLevel: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateViridis, false, false, false, false);

export const viridisFillFirstLevelInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateViridis, true, false, true, false);

export const bluesFillFirstLevel: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateBlues, false, false, true, false);

export const bluesFillFirstLevelInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateBlues, true, false, true, false);

export const rainbowFillFirstLevel: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateRainbow, false, false, true, false);

export const rainbowFillFirstLevelInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateRainbow, true, false, true, false);

export const greensFillFirstLevel: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateGreens, false, false, true, false);

export const greensFillFirstLevelInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateGreens, true, false, true, false);

export const greysFillFirstLevel: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateGreys, false, false, true, false);

export const greysFillFirstLevelInverted: HierarchyTreeFillFunction =
  (d: d3.HierarchyRectangularNode<HierarchyTreeNode> | d3.HierarchyCircularNode<HierarchyTreeNode>) =>
  interpolationFill(d, d3.interpolateGreys, true, false, true, false);
