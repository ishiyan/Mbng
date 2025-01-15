import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy, ViewEncapsulation, HostListener } from '@angular/core';
import { alea } from 'seedrandom';
import * as d3 from 'd3';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as d3vt from 'd3-voronoi-treemap';

import { computeDimensions } from '../../compute-dimensions';
import { HierarchyTreeNode } from '../hierarchy-tree';
import { HierarchyTreeSumFunction, sumNumberOfLeafNodes } from '../functions/sum-function';
import { HierarchyTreeSortFunction, sortAscending, sortDescending, sortNone } from '../functions/sort-function';
import { HierarchyTreeLabelFunction, nameLabels } from '../functions/label-function';
import { HierarchyTreeTooltipFunction, pathParentTooltips } from '../functions/tooltip-function';
import { HierarchyTreeTapFunction, doNothingTap } from '../functions/tap-function';
import { HierarchyTreeFillFunction, coolFill } from '../functions/fill-function';
import { HierarchyTreeStrokeFunction, blackStroke } from '../functions/stroke-function';
import { HierarchyTreeStrokeWidthFunction, linearStrokeWidth } from '../functions/stroke-width-function';
import { HierarchyTreeFillOpacityFunction, opaqueFillOpacity } from '../functions/fill-opacity-function';
import { HierarchyTreeFontSizeFunction, linearFontSize } from '../functions/font-size-function';

const grad2rad = Math.PI / 180;
const defaultShape = 'circle';
const defaultWidth = 300;
const defaultHeight = 300;
const ascending = 'asc';
const descending = 'desc';
const defaultLabelFill = 'white';
const defaultLabelShadow = '0px 0px 8px #000000';
const defaultLabelMinRatio = 0.1;
const defaultPadding = 3;
const defaultFlat = false;
const defaultConvergenceRatio = 0.01;
const defaultMinWeightRatio = 0.01;
const defaultMaxIterationCount = 50;

const shapeToEdgeCount = (choice: string) => {
  switch (choice) {
    case 'triangle': return 3;
    case 'diamond': return 4;
    case 'square': return 4;
    case 'pentagon': return 5;
    case 'hexagon': return 6;
    case 'heptagon': return 7;
    case 'octagon': return 8;
    default: return 100; // 'circle'
  }
};

const shapeToRotation = (choice: string) => {
  switch (choice) {
    case 'triangle': return 30 * grad2rad;
    case 'square': return 45 * grad2rad;
    case 'pentagon': return 54 * grad2rad;
    default: return 0; // 'circle', 'diamond', 'hexagon', 'heptagon', 'octagon'
  }
};

@Component({
    selector: 'mb-voronoi',
    templateUrl: './voronoi.component.html',
    styleUrls: ['./voronoi.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class VoronoiComponent implements OnChanges {
  /**
   * Defines a value function returning a non-negative number which will be called by the **sum**
   * method of the **d3.HierarchyNode<Datum>** interface for all nodes in a hierarchy tree.
   */
  @Input() sumFunc: HierarchyTreeSumFunction = sumNumberOfLeafNodes;

  /**
   * Defines how nodes are sorted after summation which assigns a value to all nodes. Allowed values are:
   * - *asc* sort ascending
   * - *desc* sort descending
   * - *none* unsorted
   */
  @Input() sort: string = ascending;

  /** A function returning a text string which will be displayed as a label for a node. */
  @Input() labelFunc: HierarchyTreeLabelFunction = nameLabels;

  /** A minimum ratio of a leaf node value within the all-leaf value range for which the label will be displayed. */
  @Input() labelMinRatio: number = defaultLabelMinRatio;

  /** A fill color to draw labels. */
  @Input() labelFill: string = defaultLabelFill;

  /** A shadow style to draw labels. */
  @Input() labelShadow: string = defaultLabelShadow;

  /** A font size used to draw the labels. */
  @Input() labelFontSizeFunc: HierarchyTreeFontSizeFunction = linearFontSize;

  /** A function returning a text string which will be displayed as a tooltip for a node. */
  @Input() tooltipFunc: HierarchyTreeTooltipFunction = pathParentTooltips;

  /** A function called when a node is tapped or clicked allowing to display a node information. */
  @Input() tapFunc: HierarchyTreeTapFunction = doNothingTap;

  /** A function returning a fill color of a node. */
  @Input() fillFunc: HierarchyTreeFillFunction = coolFill;

  /** A function returning a fill color opacity of a node. */
  @Input() fillOpacityFunc: HierarchyTreeFillOpacityFunction = opaqueFillOpacity;

  /** A function returning a stroke color of a node. */
  @Input() strokeFunc: HierarchyTreeStrokeFunction = blackStroke;

  /** A function returning a stroke color of a node. */
  @Input() strokeWidthFunc: HierarchyTreeStrokeWidthFunction = linearStrokeWidth;

  /** A padding in pixels surrounding the shape. */
  @Input() padding: number = defaultPadding;

  /** A width of the voronoi area. */
  @Input() width: number | string = defaultWidth;

  /** A height of the voronoi area. */
  @Input() height: number | string = defaultHeight;

  /** A shape of the voronoi area. */
  @Input() shape: string = defaultShape;

  /** In range (0, 1). Stops computation when cell area error <= convergenceRatio% of clipping polygon's area. */
  @Input() convergenceRatio: number = defaultConvergenceRatio;

  /**
   * In range (0, 1). Used to compute the minimum allowed weight. Default 0.01 means 1% of max weight.
   * Handles near-zero weights, and leaves enought space for cell hovering.
   */
  @Input() minWeightRatio: number = defaultMinWeightRatio;

  /**
   * Stops computation even if convergence is not reached.
   * Use a large amount for a sole converge-based computation stop.
   */
  @Input() maxIterationCount: number = defaultMaxIterationCount;

  /** The data hierarchy to use. */
  @Input() data!: HierarchyTreeNode;

  /** If the hierarchy should be flatterned to an array of a leaf nodes. */
  @Input() flat: boolean = defaultFlat;

  constructor(private elementRef: ElementRef) { }

  @HostListener('window:resize', [])
  public render(): void {
    const sel = d3.select(this.elementRef.nativeElement);
    sel.select('svg').remove();
    const dat = this.data;
    if (!dat || !dat.children || dat.children.length < 1) {
      return;
    }

    const p = this.padding;
    const p2 = p * 2;
    const computed = computeDimensions(this.elementRef, this.width, this.height, defaultWidth, defaultHeight);
    const w = computed[0] - p2;
    const h = computed[1] - p2;
    const w2 = w / 2;
    const h2 = h / 2;

    const sortFunc: HierarchyTreeSortFunction = this.sort === ascending ?
      sortAscending : (this.sort === descending ? sortDescending : sortNone);
    const hierarchy = (d: HierarchyTreeNode) => {
      let rootNode = d3.hierarchy(d).sum(this.sumFunc);
      if (sortFunc !== sortNone) {
        rootNode = rootNode.sort((a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) => sortFunc(a, b));
      }
      return rootNode;
    };

    let root = hierarchy(dat);
    if (this.flat) {
      const datFlat: HierarchyTreeNode = { name: 'root', children: [] };
      for (const leaf of root.leaves()) {
        datFlat.children?.push(leaf.data);
      }
      root = hierarchy(datFlat);
    }

    const edgeCount: number = shapeToEdgeCount(this.shape);
    const factor = 2 * Math.PI / edgeCount;
    const rotation: number = shapeToRotation(this.shape);
    const clippingPolygon = d3.range(edgeCount).map((i: number) => {
      const rad = rotation +  i * factor;
      return [w2 + w2 * Math.cos(rad), h2 + h2 * Math.sin(rad)];
    });

    // https://github.com/Kcnarf/d3-voronoi-treemap
    const voronoiTreeMap = d3vt.voronoiTreemap()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .prng(alea(12345))
      .convergenceRatio(this.convergenceRatio)
      .maxIterationCount(this.maxIterationCount)
      .minWeightRatio(this.minWeightRatio)
      .clip(clippingPolygon);
    voronoiTreeMap(root);
    const allNodes = root.descendants()
      .sort((a, b) => b.depth - a.depth)
      .map((d, i) => Object.assign({}, d, {id: i}));

    const allLeaves = allNodes.filter(d => !d.children);
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    for (const leaf of allLeaves) {
      if (leaf.value) {
        const v = leaf.value;
        if (v < min) {
          min = v;
        }
        if (v > max) {
          max = v;
        }
      }
    }

    const svg: any = sel.append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', w + p2).attr('height', h + p2).attr('viewBox', `0 0 ${w + p2} ${h + p2}`);

    const voronoi = svg.append('g')
      .attr('transform', `translate(${p},${p})`)
      .selectAll('path')
      .data(allNodes)
      .enter()
      .append('path')
      .attr('d', (d: any) => 'M' + d.polygon.join('L') + 'Z')
      .attr('fill', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => d.children ? 'transparent' : this.fillFunc(d, min, max))
      .attr('fill-opacity', (d: d3.HierarchyNode<HierarchyTreeNode>) =>
        d.children ? 0 : this.fillOpacityFunc(d as d3.HierarchyCircularNode<HierarchyTreeNode>, root.height))
      .attr('stroke', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.strokeFunc(d))
      .attr('stroke-width', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.strokeWidthFunc(d))
      .attr('pointer-events', (d: d3.HierarchyNode<HierarchyTreeNode>) => d.children ? 'none' : 'all')
      .on('click', (event: any, d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.tapFunc(d));

    voronoi.append('title')
      .text((d: d3.HierarchyNode<HierarchyTreeNode>) => d.children ? '' : this.tooltipFunc(d));

    const cutoff = min + this.labelMinRatio * (max - min);
    const labelFillOpacity = (d: d3.HierarchyCircularNode<HierarchyTreeNode>) =>
      d.value ? (d.value > cutoff ? 1 : 0) : 0;

    const label = svg.append('g')
      .attr('transform', `translate(${p},${p})`)
      .style('user-select', 'none')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(allLeaves)
      .enter()
      .append('text')
        .attr('transform', (d: any) => 'translate(' + [d.polygon.site.x, d.polygon.site.y] + ')')
        .style('fill', this.labelFill)
        .style('text-shadow', this.labelShadow)
        .style('fill-opacity', labelFillOpacity)
        .style('font-size', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.labelFontSizeFunc(d));

    label.selectAll('tspan')
      .data((d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.labelFunc(d).split(/\s+/g))
      .join('tspan')
      .attr('x', 0)
      .attr('y', (d: any, i: number, nodes: any) => `${i - nodes.length / 2 + 0.8}em`)
      .text((d: string) => d);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(changes: any) {
    this.render();
  }
}
