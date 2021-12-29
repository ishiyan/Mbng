import { Component, Input, ElementRef, OnChanges, ChangeDetectionStrategy, ViewEncapsulation, HostListener } from '@angular/core';
import * as d3 from 'd3';

import { computeDimensions } from '../../compute-dimensions';
import { HierarchyTreeNode } from '../hierarchy-tree';
import { HierarchyTreeSumFunction, sumNumberOfLeafNodes } from '../functions/sum-function';
import { HierarchyTreeSortFunction, sortAscending, sortDescending, sortNone } from '../functions/sort-function';
import { HierarchyTreeLabelFunction, nameLabels } from '../functions/label-function';
import { HierarchyTreeTooltipFunction, pathTooltips } from '../functions/tooltip-function';
import { HierarchyTreeTapFunction, doNothingTap } from '../functions/tap-function';
import { HierarchyTreeFillFunction, coolFill } from '../functions/fill-function';
import { HierarchyTreeStrokeFunction, blackStroke } from '../functions/stroke-function';
import { HierarchyTreeStrokeWidthFunction, linearStrokeWidth } from '../functions/stroke-width-function';
import { HierarchyTreeFillOpacityFunction, opaqueFillOpacity } from '../functions/fill-opacity-function';
import { HierarchyTreeFontSizeFunction, linearFontSize } from '../functions/font-size-function';

const defaultDiameter = 300;
const defaultTransitionMsec = 750;
const ascending = 'asc';
const descending = 'desc';
const defaultZoom = true;
const defaultLabelFill = 'white';
const defaultLabelShadow = '0px 0px 8px #000000';
const defaultLabelMinRadius = 1;
const defaultPadding = 3;
const defaultFlat = false;
const defaultRootCircle = false;

@Component({
  selector: 'mb-circlepack',
  templateUrl: './circlepack.component.html',
  styleUrls: ['./circlepack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CirclepackComponent implements OnChanges {
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

  /** A function returning a text string which will be displayed as a label for a node. */
  @Input() labelFunc: HierarchyTreeLabelFunction = nameLabels;

  /** A minimum node radius for which label will be displayed. */
  @Input() labelMinRadius: number = defaultLabelMinRadius;

  /** A fill color to draw labels. */
  @Input() labelFill: string = defaultLabelFill;

  /** A shadow style to draw labels. */
  @Input() labelShadow: string = defaultLabelShadow;

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
  @Input() strokeFunc: HierarchyTreeStrokeFunction = blackStroke;

  /** A function returning a stroke color of a node. */
  @Input() strokeWidthFunc: HierarchyTreeStrokeWidthFunction = linearStrokeWidth;

  /** A positive number defining the padding between circles. */
  @Input() padding: number = defaultPadding;

  /** A diameter of the sunburst. */
  @Input() diameter: number | string = defaultDiameter;

  /** The data hierarchy to use. */
  @Input() data!: HierarchyTreeNode;

  /** If the hierarchy should be flatterned to an array of a leaf nodes. */
  @Input() flat: boolean = defaultFlat;

  /** If the roor circle is visible. */
  @Input() rootCircle: boolean = defaultRootCircle;

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
    const svg: any = sel.append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', s).attr('height', s).attr('viewBox', `-${s2} -${s2} ${s} ${s}`)
      .on('click', (event: any) => zoom(event, root));

    const sortFunc: HierarchyTreeSortFunction = this.sort === ascending ?
      sortAscending : (this.sort === descending ? sortDescending : sortNone);
    const pack = (d: HierarchyTreeNode) => {
      let rootNode = d3.hierarchy(d)
        .sum(this.sumFunc);
      if (sortFunc !== sortNone) {
        rootNode = rootNode.sort((a: d3.HierarchyNode<HierarchyTreeNode>, b: d3.HierarchyNode<HierarchyTreeNode>) => sortFunc(a, b));
      }
      return d3.pack<HierarchyTreeNode>().size([s, s]).padding(this.padding)(rootNode);
    };
    let root = pack(dat);
    if (this.flat) {
      const datFlat: HierarchyTreeNode = { children: [] };
      for (const leaf of root.leaves()) {
        datFlat.children?.push(leaf.data);
      }
      root = pack(datFlat);
    }

    let focus = root;
    const node = svg.append('g')
      .selectAll('circle')
      .data(this.rootCircle ? root.descendants() : root.descendants().slice(1))
      .join('circle')
      .attr('fill', /*(d: d3.HierarchyCircularNode<HierarchyTreeNode>) => */this.fillFunc/*(d)*/)
      .attr('fill-opacity', (d: d3.HierarchyNode<HierarchyTreeNode>) =>
        this.fillOpacityFunc(d as d3.HierarchyCircularNode<HierarchyTreeNode>, root.height))
      .attr('stroke', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.strokeFunc(d))
      .attr('stroke-width', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.strokeWidthFunc(d))
      // .style('cursor',  (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => !this.flat && d.children ? 'pointer' : 'arrow')
      .on('click', (event: any, d: d3.HierarchyCircularNode<HierarchyTreeNode>) => { event.stopPropagation(); clicked(event, d); });

    const labelFillOpacity = (d: d3.HierarchyCircularNode<HierarchyTreeNode>) =>
      (d.parent === focus && d.r >= this.labelMinRadius) ? 1 : 0;

    const label = svg.append('g')
      .style('fill', this.labelFill)
      .style('text-shadow', this.labelShadow)
      .style('user-select', 'none')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .selectAll('text')
      .data(root.descendants())
      .enter().append('text')
        .style('fill-opacity', labelFillOpacity)
        .style('font-size', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.labelFontSizeFunc(d));
    // single -line labels:
    // .text((d: d3.HierarchyNode<HierarchyTreeNode>) => this.labelFunction(d));
    // multi-line labels:
    label.selectAll('tspan')
      .data((d: d3.HierarchyCircularNode<HierarchyTreeNode>) => this.labelFunc(d).split(/\s+/g))
      .join('tspan')
        .attr('x', 0)
        .attr('y', (d: any, i: number, nodes: any) => `${i - nodes.length / 2 + 0.8}em`)
        .text((d: string) => d);

    const clicked = (event: any, d: d3.HierarchyCircularNode<HierarchyTreeNode>) => {
      this.tapFunc(d);
      if (this.zoom && !this.flat && d.children && focus !== d) {
        /* d.children && focus !== d && */ zoom(event, d);
      }
    };

    let view: d3.ZoomView;
    const zoomTo = (v: d3.ZoomView) => {
      view = v;
      const k = s / v[2];
      label.attr('transform', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) =>
        `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k + this.labelFontSizeFunc(d) / 4})`);
      node.attr('transform', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) =>
        `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr('r', (d: d3.HierarchyCircularNode<HierarchyTreeNode>) => d.r * k);
    };

    const zoom = (event: any, d: d3.HierarchyCircularNode<HierarchyTreeNode>) => {
      const focus0 = focus;
      focus = d;
      const transition = svg.transition().duration(this.transitionMsec)
        .tween('zoom', () => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return (t: any) => zoomTo(i(t));
      });
      label.transition(transition).style('fill-opacity', labelFillOpacity);
    };

    node.append('title')
      .text((d: d3.HierarchyNode<HierarchyTreeNode>) => this.tooltipFunc(d));

    zoomTo([root.x, root.y, root.r * 2]);
  }
}
