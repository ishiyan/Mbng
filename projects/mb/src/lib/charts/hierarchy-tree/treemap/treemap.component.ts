import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy, ViewEncapsulation, HostListener } from '@angular/core';
import * as d3 from 'd3';

import { computeDimensions } from '../../compute-dimensions';
import { HierarchyTreeNode } from '../hierarchy-tree';
import { HierarchyTreeSumFunction, sumNumberOfLeafNodes } from '../functions/sum-function';
import { HierarchyTreeSortFunction, sortAscending, sortDescending, sortNone } from '../functions/sort-function';
import { HierarchyTreeLabelFunction, emptyLabels } from '../functions/label-function';
import { HierarchyTreeTooltipFunction, pathTooltips } from '../functions/tooltip-function';
import { HierarchyTreeTapFunction, doNothingTap } from '../functions/tap-function';
import { HierarchyTreeStrokeFunction, transparentStroke } from '../functions/stroke-function';
import { HierarchyTreeStrokeWidthFunction, linearStrokeWidth } from '../functions/stroke-width-function';
import { HierarchyTreeFillFunction, coolFill } from '../functions/fill-function';
import { HierarchyTreeFillOpacityFunction, opaqueFillOpacity } from '../functions/fill-opacity-function';
import { HierarchyTreeFontSizeFunction, linearFontSize } from '../functions/font-size-function';

const defaultWidth = 300;
const defaultHeight = 300;
const defaultPadding = 1;
const defaultRectangleRatio = 1.618;
const ascending = 'asc';
const descending = 'desc';
const defaultFlat = false;
const defaultLabelFill = 'white';
const defaultLabelMinRatio = 0.1;
const deltaX = 4;
const deltaY = 16;

@Component({
  selector: 'mb-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TreemapComponent implements OnChanges {
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
  @Input() labelFunc: HierarchyTreeLabelFunction = emptyLabels;

  /** A minimum ratio of a leaf node value within the all-leaf value range for which the label will be displayed. */
  @Input() labelMinRatio: number = defaultLabelMinRatio;

  /** A fill color to draw labels. */
  @Input() labelFill: string = defaultLabelFill;

  /** A font size used to draw the labels. */
  @Input() labelFontSizeFunc: HierarchyTreeFontSizeFunction = linearFontSize;

  /** A function returning a text string which will be displayed as a tooltip for a node. */
  @Input() tooltipFunc: HierarchyTreeTooltipFunction = pathTooltips;

  /** A function called when a node is tapped or clicked allowing to display a node information. */
  @Input() tapFunc: HierarchyTreeTapFunction = doNothingTap;

  /** A function returning a fill color of a node. */
  @Input() fillFunc: HierarchyTreeFillFunction = coolFill;

  /** A function returning a fill color opacity of a node. */
  @Input() fillOpacityFunc: HierarchyTreeFillOpacityFunction = opaqueFillOpacity;

  /** A function returning a stroke color of a node. */
  @Input() strokeFunc: HierarchyTreeStrokeFunction = transparentStroke;

  /** A function returning a stroke color of a node. */
  @Input() strokeWidthFunc: HierarchyTreeStrokeWidthFunction = linearStrokeWidth;

  /** A padding in pixels surrounding the shape. */
  @Input() padding: number = defaultPadding;

  /** A width of the icicle. */
  @Input() width: number | string = defaultWidth;

  /** A height of the icicle. */
  @Input() height: number | string = defaultHeight;

  /** If the width to height ratio for leaf rectangles. */
  @Input() rectangleRatio: number = defaultRectangleRatio;

  /** The data hierarchy to use. */
  @Input() data!: HierarchyTreeNode;

  /** If the hierarchy should be flatterned to an array of a leaf nodes. */
  @Input() flat: boolean = defaultFlat;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: any) {
    this.render();
  }

  @HostListener('window:resize', [])
  public render(): void {
    const sel = d3.select(this.elementRef.nativeElement);
    sel.select('svg').remove();
    const dat = this.data;
    if (!dat || !dat.children || dat.children.length < 1) {
      return;
    }

    const computed = computeDimensions(this.elementRef, this.width, this.height, defaultWidth, defaultHeight);
    const w = computed[0];
    const h = computed[1];
    const svg: any = sel.append('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', w).attr('height', h).attr('viewBox', `0 0 ${w} ${h}`);

    const sortFunc: HierarchyTreeSortFunction = this.sort === ascending ?
      sortAscending : (this.sort === descending ? sortDescending : sortNone);
    const squarify = (d: HierarchyTreeNode) => {
      let rootNode = d3.hierarchy(d).sum(this.sumFunc);
      if (sortFunc !== sortNone) {
        rootNode = rootNode.sort((a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) => sortFunc(a, b));
      }
      return d3.treemap().tile(d3.treemapSquarify.ratio(1)).size([w / this.rectangleRatio, h]).padding(this.padding).round(false)(rootNode);
    };
    let root = squarify(dat);
    if (this.flat) {
      const datFlat: HierarchyTreeNode = { children: [] };
      for (const leaf of root.leaves()) {
        datFlat.children?.push(leaf.data as HierarchyTreeNode);
      }
      root = squarify(datFlat);
    }
    const allLeaves = root.leaves();
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

    const cell = svg.selectAll('g')
      .data(allLeaves)
      .join('g')
      .attr('transform', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) =>
        `translate(${d.x0 * this.rectangleRatio},${d.y0})`);

    cell.append('rect')
      .attr('width', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) =>
        d.x1 * this.rectangleRatio - d.x0 * this.rectangleRatio)
      .attr('height', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) =>
        d.y1 - d.y0)
      .attr('fill', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) =>
        d.children ? 'transparent' : this.fillFunc(d, min, max))
      .attr('fill-opacity', (d: d3.HierarchyNode<HierarchyTreeNode>) =>
        d.children ? 0 : this.fillOpacityFunc(d as d3.HierarchyCircularNode<HierarchyTreeNode>, root.height))
      .attr('stroke', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.strokeFunc(d))
      .attr('stroke-width', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.strokeWidthFunc(d))
      .attr('pointer-events', (d: d3.HierarchyNode<HierarchyTreeNode>) => d.children ? 'none' : 'all')
      .on('click', (event: any, d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.tapFunc(d));

    const cutoff = min + this.labelMinRatio * (max - min);
    const labelText = (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => {
      const valueVisible = d.value ? (d.value > cutoff) : false;
      const vertVisible = (d.y1 - d.y0) > (this.labelFontSizeFunc(d) + deltaY);
      const horzVisible = (d.x1 - d.x0) > 50;
      return (valueVisible && vertVisible && horzVisible) ? this.labelFunc(d) : '';
    };

    const text = svg.selectAll('g')
      .selectAll('text')
      .data(allLeaves)
      .enter().append('text')
      .style('user-select', 'none')
      .attr('pointer-events', 'none')
      .attr('y', deltaY)
      .style('fill', this.labelFill)
      .attr('font-size', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => this.labelFontSizeFunc(d));
    text.append('tspan')
      .data((d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => labelText(d).split(/\s+/g))
      .join('tspan')
        .attr('x', deltaX)
        .attr('y', (d: any, i: number, nodes: any) => `${i - nodes.length / 3 + 2}em`)
        .text((d: string) => d);

    cell.append('title')
      .text((d: d3.HierarchyNode<HierarchyTreeNode>) => this.tooltipFunc(d));
  }
}
