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

const twoPi = 2 * Math.PI;
const gradPerRad = 180 / Math.PI;
const defaultDiameter = 300;
const allLevels = 0;
const defaultTransitionMsec = 750;
const ascending = 'asc';
const descending = 'desc';
const defaultZoom = false;
const defaultLabelFill = 'white';

@Component({
  selector: 'mb-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SunburstComponent implements OnChanges {
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

  /** A diameter of the sunburst. */
  @Input() diameter: number | string = defaultDiameter;

  /** The data hierarchy to use. */
  @Input() data!: HierarchyTreeNode;

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
    const computed = computeDimensions(this.elementRef, this.diameter, this.diameter, defaultDiameter, defaultDiameter);
    const s = Math.max(computed[0], computed[1]);
    const s2 = s / 2;
    const svg: any = sel.append('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', s).attr('height', s).attr('viewBox', `0 0 ${s} ${s}`);
    const g = svg.append('g')
      .attr('transform', `translate(${s2},${s2})`);

    const sortFunc: HierarchyTreeSortFunction = this.sort === ascending ?
      sortAscending : (this.sort === descending ? sortDescending : sortNone);
    const partition = (d: HierarchyTreeNode) => {
      let rootNode = d3.hierarchy(d).sum(this.sumFunc);
      if (sortFunc !== sortNone) {
        rootNode = rootNode.sort((a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) => sortFunc(a, b));
      }
      return d3.partition().size([twoPi, rootNode.height + 1])(rootNode);
    };
    const root = partition(dat);
    root.each((d: any) => d.current = d);

    const n = (this.levels < 1 ? root.height : this.levels) + 1;
    const radius = s / (2 * n);
    const arc = d3.arc<d3.HierarchyRectangularNode<HierarchyTreeNode>>()
      .startAngle((d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => d.x0)
      .endAngle((d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => d.x1)
      .padAngle((d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => d.y0 * radius)
      .outerRadius((d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => Math.max(d.y0 * radius, d.y1 * radius - 1));

    const arcVisible = (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => d.y1 <= n && d.y0 >= 1 && d.x1 > d.x0;
    const labelVisible = (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) =>
      d.y1 <= n && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.05; // orriginally 0.03
    const labelTransform = (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => {
      const x = (d.x0 + d.x1) / 2 * gradPerRad;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    };

    const clicked = (event: any, p: d3.HierarchyRectangularNode<HierarchyTreeNode>) => {
      this.tapFunc(p);
      if (this.zoom && p.children) {
        parent.datum(p.parent || root);
        root.each((d: any) => d.target = {
          x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * twoPi,
          x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * twoPi,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        });
        const t = g.transition().duration(this.transitionMsec);
        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
          .tween('data', (d: any) => {
              const i = d3.interpolate(d.current, d.target);
              return (w: any) => d.current = i(w);
          })
          .filter((d: any) => arcVisible(d.current) || arcVisible(d.target))
          .attr('fill-opacity', (d: any) => arcVisible(d.target) ?
            this.fillOpacityFunc(d as d3.HierarchyRectangularNode<HierarchyTreeNode>, root.height) : 0)
          .attrTween('d', (d: any) => () => arc(d.current));

        label.filter((d: any) => arcVisible(d.current) || labelVisible(d.target)).transition(t)
          .attr('fill-opacity', (d: any) => +labelVisible(d.target))
          .attrTween('transform', (d: any) => () => labelTransform(d.current));
      }
    };

    const path = g.append('g')
      .selectAll('path')
      .data(root.descendants().slice(1))
      .join('path')
        .attr('fill', /*(d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => */this.fillFunc/*(d)*/)
        .attr('fill-opacity', (d: any) => arcVisible(d.current) ?
          this.fillOpacityFunc(d as d3.HierarchyRectangularNode<HierarchyTreeNode>, root.height) : 0)
        .attr('d', (d: any) => arc(d.current))
        .on('click', clicked);

    path.append('title')
      .text((d: d3.HierarchyNode<HierarchyTreeNode>) => this.tooltipFunc(d));

    const label = g.append('g')
        .attr('pointer-events', 'none')
        .attr('text-anchor', 'middle')
        .style('user-select', 'none')
        .style('fill', this.labelFill)
      .selectAll('text')
      .data(root.descendants().slice(1))
      .join('text')
        .attr('font-size', (d: d3.HierarchyRectangularNode<HierarchyTreeNode>) => this.labelFontSizeFunc(d))
        .attr('dy', '0.35em')
        .attr('fill-opacity', (d: any) => +labelVisible(d.current))
        .attr('transform', (d: any) => labelTransform(d.current))
        .text((d: d3.HierarchyNode<HierarchyTreeNode>) => this.labelFunc(d));

    const parent = g.append('circle')
      .datum(root)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('click', clicked);
  }
}
