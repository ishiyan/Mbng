import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy, ViewEncapsulation, HostListener } from '@angular/core';
import * as d3 from 'd3';

import { computeDimensions } from '../../compute-dimensions';
import { HierarchyTreeNode } from '../hierarchy-tree';
import { HierarchyTreeSumFunction, sumNumberOfLeafNodes } from '../functions/sum-function';
import { HierarchyTreeSortFunction, sortAscending, sortDescending, sortNone } from '../functions/sort-function';
import { HierarchyTreeLabelFunction, emptyLabels } from '../functions/label-function';
import { HierarchyTreeTooltipFunction, pathTooltips } from '../functions/tooltip-function';
import { HierarchyTreeTapFunction, doNothingTap } from '../functions/tap-function';
import { HierarchyTreeFillFunction, coolFill } from '../functions/fill-function';
import { HierarchyTreeFillOpacityFunction, opaqueFillOpacity } from '../functions/fill-opacity-function';
import { HierarchyTreeFontSizeFunction, linearFontSize } from '../functions/font-size-function';

const defaultWidth = 800;
const defaultHeight = 600;
const allLevels = 0;
const defaultTransitionMsec = 750;
const ascending = 'asc';
const descending = 'desc';
const defaultZoom = false;
const defaultRootVisible = false;
const defaultLabelFill = 'white';
const deltaX = 4;
const deltaY = 16;

@Component({
  selector: 'mb-icicle',
  templateUrl: './icicle.component.html',
  styleUrls: ['./icicle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IcicleComponent implements OnChanges {
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

  /** If the chart is zoomable. Tapping on a sector zooms in, tapping in the center zooms out. */
  @Input() zoom: boolean = defaultZoom;

  /** Zoomable transition duration in milliseconds. */
  @Input() transitionMsec: number = defaultTransitionMsec;

  /** A number of hierarchy levels to display or **0** to display all levels. */
  @Input() levels: number = allLevels;

  /** A function returning a text string which will be displayed as a label for a node. */
  @Input() labelFunc: HierarchyTreeLabelFunction = emptyLabels;

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

  /** A width of the icicle. */
  @Input() width: number | string = defaultWidth;

  /** A height of the icicle. */
  @Input() height: number | string = defaultHeight;

  /** The data hierarchy to use. */
  @Input() data!: HierarchyTreeNode;

  /** If the root node should be visible. */
  @Input() rootVisible: boolean = defaultRootVisible;

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
    const partition = (d: HierarchyTreeNode) => {
      let rootNode = d3.hierarchy(d).sum(this.sumFunc);
      if (sortFunc !== sortNone) {
        rootNode = rootNode.sort((a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) => sortFunc(a, b));
      }
      const n: number = (this.levels < 1 ? rootNode.height : this.levels) + (this.rootVisible ? 1 : 0);
      return d3.partition().size([computed[1], (rootNode.height + 1) * computed[0] / n])(rootNode);
    };
    const root = partition(dat);
    let focus = root;
    const rootWidth = this.rootVisible ? 0 : root.y1;

    const cell = svg.selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => `translate(${d.y0 - rootWidth },${d.x0})`);

    const rectHeight = (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
    const rect = cell.append('rect')
      .style('cursor', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => d.children && d.parent ? 'pointer' : 'arrow')
      .attr('width', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => d.y1 - d.y0 - 1)
      .attr('height', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => rectHeight(d))
      // .attr('fill', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => this.fillFunc(d, min, max))
      .attr('fill', this.fillFunc)
      .attr('fill-opacity', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) =>
        this.fillOpacityFunc(d as d3.HierarchyRectangularNode<HierarchyTreeNode>, root.height));

    const labelVisible = (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) =>
      /* d.y1 <= w && d.y0 >= 0 && */ d.x1 - d.x0 > (this.labelFontSizeFunc(d) + deltaY);
    const text = cell.append('text')
      .style('user-select', 'none')
      .attr('pointer-events', 'none')
      .attr('x', deltaX)
      .attr('y', deltaY)
      .style('fill', this.labelFill)
      .attr('fill-opacity', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => +labelVisible(d))
      .attr('font-size', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => this.labelFontSizeFunc(d));
    text.append('tspan')
      .text((d: d3.HierarchyNode<HierarchyTreeNode>) => this.labelFunc(d));

    cell.append('title')
      .text((d: d3.HierarchyNode<HierarchyTreeNode>) => this.tooltipFunc(d));

    const clicked = (event: any, p: d3.HierarchyRectangularNode<HierarchyTreeNode>) => {
      this.tapFunc(p);
      if (this.zoom && p.children) {
        focus = (focus === p && p.parent) ? p = p.parent : p;
        const delta = p === root ? rootWidth : 0;
        root.each((d: any) => d.target = {
          x0: (d.x0 - p.x0) / (p.x1 - p.x0) * h,
          x1: (d.x1 - p.x0) / (p.x1 - p.x0) * h,
          y0: d.y0 - p.y0 - delta,
          y1: d.y1 - p.y0 - delta
        });
        const t = cell.transition().duration(this.transitionMsec)
          .attr('transform', (d: any) => `translate(${d.target.y0},${d.target.x0})`);
        rect.transition(t)
          .attr('height', (d: any) => rectHeight(d.target));
        text.transition(t)
          .attr('fill-opacity', (d: any) => +labelVisible(d.target));
      }
    };

    rect.on('click', clicked);
  }
}
