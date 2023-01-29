import { Component } from '@angular/core';

/* eslint-disable max-len */
import { HierarchyTreeNode } from 'projects/mb/src/lib/charts/hierarchy-tree/hierarchy-tree';
import { HierarchyTreeSumFunction, sumNumberOfLeafNodes } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/sum-function';
import { HierarchyTreeFillFunction, coolFill, coolFillInverted, warmFill, warmFillInverted, viridisFill, viridisFillInverted, bluesFill, bluesFillInverted, rainbowFill, rainbowFillInverted } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { HierarchyTreeFillOpacityFunction, transparentFillOpacity, opaqueFillOpacity, linearFillOpacity } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-opacity-function';
import { HierarchyTreeStrokeFunction, noStroke, blackStroke, whiteStroke, transparentStroke } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/stroke-function';
import { HierarchyTreeStrokeWidthFunction, noStrokeWidth, linearStrokeWidthThin, linearStrokeWidth, linearStrokeWidthThick, linearStrokeWidthExtraThick } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/stroke-width-function';
import { HierarchyTreeTapFunction } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/tap-function';
import { pathParentTooltips } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/tooltip-function';
import { HierarchyTreeLabelFunction, nameLabels, valueLabels, emptyLabels } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/label-function';
import { HierarchyTreeFontSizeFunction, equalFontSize8, equalFontSize10, equalFontSize12, equalFontSize14, equalFontSize16, equalFontSize18, linearFontSize } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/font-size-function';

import { CountryHierarchyTreeNode, countries } from '../../../test-data/hierarchies/countries';

interface DiameterItam {
  value: number | string;
  key: string;
}

interface SumFunc {
  value: HierarchyTreeSumFunction;
  key: string;
}
const sumFuncArea: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.area ? d.area : 0;
const sumFuncPopulation: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.population ? d.population : 0;
const sumFuncDensity: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.density ? d.density : 0;
const sumFuncHdi: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.hdi ? d.hdi : 0;
const sumFuncIhdi: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.ihdi ? d.ihdi : 0;
const sumFuncGdpPerCapita: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.gdpPerCapita ? d.gdpPerCapita : 0;
const sumFuncIgini: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.igini ? d.igini : 0;
const sumFuncWgini: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.wgini ? d.wgini : 0;
const sumFuncSirop: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.sirop ? d.sirop : 0;
const sumFuncWpaMean: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.wpaMean ? d.wpaMean : 0;
const sumFuncWpaMedian: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.wpaMedian ? d.wpaMedian : 0;

interface FillFunc {
  value: HierarchyTreeFillFunction;
  key: string;
}

interface FillOpacityFunc {
  value: HierarchyTreeFillOpacityFunction;
  key: string;
}

interface StrokeFunc {
  value: HierarchyTreeStrokeFunction;
  key: string;
}

interface StrokeWidthFunc {
  value: HierarchyTreeStrokeWidthFunction;
  key: string;
}

interface LabelFunc {
  value: HierarchyTreeLabelFunction;
  key: string;
}

interface LabelFontSizeFunc {
  value: HierarchyTreeFontSizeFunction;
  key: string;
}

@Component({
  selector: 'app-sample-circlepack-2',
  templateUrl: './sample-circlepack-2.component.html',
  styleUrls: ['./sample-circlepack-2.component.scss']
})
export class SampleCirclepack2Component {

  readonly contriesHierarchy: CountryHierarchyTreeNode = countries;
  zoom = true;
  flat = false;
  rootCircle = false;

  readonly diameterArray: DiameterItam[] = [
    { key: '100%', value: '100%' },
    { key: '75%', value: '75%' },
    { key: '50%', value: '50%' },
    { key: '25%', value: '25%' },
    { key: '900', value: 900 },
    { key: '800', value: 800 },
    { key: '700', value: 700 },
    { key: '600', value: 600 },
    { key: '500', value: 500 },
    { key: '400', value: 400 },
    { key: '300', value: 300 },
    { key: '200', value: 200 }
  ];
  diameterSelected: number | string = this.diameterArray[0].value;

  readonly paddingArray: number[] = [ 1, 0, 2, 3, 4, 5, 10, 20 ];
  paddingSelected: number = this.paddingArray[0];

  readonly sumFuncArray: SumFunc[] = [
    { key: 'median wealth per adult', value: sumFuncWpaMedian },
    { key: 'mean wealth per adult', value: sumFuncWpaMean },
    { key: 'share of income top 1%', value: sumFuncSirop },
    { key: 'Wealth inequality', value: sumFuncWgini },
    { key: 'income inequality', value: sumFuncIgini },
    { key: 'GDP per capita', value: sumFuncGdpPerCapita },
    { key: 'inequality-adjusted HDI', value: sumFuncIhdi },
    { key: 'human development index', value: sumFuncHdi },
    { key: 'population density', value: sumFuncDensity },
    { key: 'population', value: sumFuncPopulation },
    { key: 'area', value: sumFuncArea },
    { key: 'conuntries', value: sumNumberOfLeafNodes }
  ];
  sumFuncSelected: HierarchyTreeSumFunction = this.sumFuncArray[0].value;

  readonly sortArray: string[] = [ 'asc', 'desc', 'none' ];
  sortSelected: string = this.sortArray[0];

  readonly fillFuncArray: FillFunc[] = [
    { key: 'cool', value: coolFill },
    { key: 'warm', value: warmFill },
    { key: 'viridis', value: viridisFill },
    { key: 'blues', value: bluesFill },
    { key: 'rainbow', value: rainbowFill },

    { key: 'cool inv', value: coolFillInverted },
    { key: 'warm inv', value: warmFillInverted },
    { key: 'viridis inv', value: viridisFillInverted },
    { key: 'blues inv', value: bluesFillInverted },
    { key: 'rainbow inv', value: rainbowFillInverted },
  ];
  fillFuncSelected: HierarchyTreeFillFunction = this.fillFuncArray[0].value;

  readonly fillOpacityFuncArray: FillOpacityFunc[] = [
    { key: 'opaque', value: opaqueFillOpacity },
    { key: 'linear', value: linearFillOpacity },
    { key: '90%', value: () => 0.9 },
    { key: '80%', value: () => 0.8 },
    { key: '70%', value: () => 0.7 },
    { key: '60%', value: () => 0.6 },
    { key: '50%', value: () => 0.5 },
    { key: '60%', value: () => 0.4 },
    { key: '70%', value: () => 0.3 },
    { key: '80%', value: () => 0.2 },
    { key: '10%', value: () => 0.1 },
    { key: 'transparent', value: transparentFillOpacity }
  ];
  fillOpacityFuncSelected: HierarchyTreeFillOpacityFunction = this.fillOpacityFuncArray[0].value;

  readonly strokeFuncArray: StrokeFunc[] = [
    { key: 'none', value: noStroke },
    { key: 'white', value: whiteStroke },
    { key: 'black', value: blackStroke },
    { key: 'transparent', value: transparentStroke },
  ];
  strokeFuncSelected: HierarchyTreeStrokeFunction = this.strokeFuncArray[0].value;

  readonly strokeWidthFuncArray: StrokeWidthFunc[] = [
    { key: 'thin', value: linearStrokeWidthThin },
    { key: 'normal', value: linearStrokeWidth },
    { key: 'thick', value: linearStrokeWidthThick },
    { key: 'extra thick', value: linearStrokeWidthExtraThick },
    { key: 'none', value: noStrokeWidth }
  ];
  strokeWidthFuncSelected: HierarchyTreeStrokeWidthFunction = this.strokeWidthFuncArray[0].value;

  readonly labelFuncArray: LabelFunc[] = [
    { key: 'name', value: nameLabels },
    { key: 'value', value: valueLabels },
    { key: 'none', value: emptyLabels }
  ];
  labelFuncSelected: HierarchyTreeLabelFunction = this.labelFuncArray[0].value;

  readonly labelMinRadiusArray: number[] = [ 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 16, 17, 18, 19, 20, 25, 30, 35, 40 ];
  labelMinRadiusSelected: number = this.labelMinRadiusArray[0];

  readonly labelFillArray: string[] = [ 'white', 'black', 'transparent' ];
  labelFillSelected: string = this.labelFillArray[0];

  readonly labelShadowArray: string[] = [ '0px 0px 8px #000000', '0px 0px 8px #ffffff', 'none' ];
  labelShadowSelected: string = this.labelShadowArray[0];

  readonly labelFontSizeFuncArray: LabelFontSizeFunc[] = [
    { key: 'linear', value: linearFontSize },
    { key: '18', value: equalFontSize18 },
    { key: '16', value: equalFontSize16 },
    { key: '14', value: equalFontSize14 },
    { key: '12', value: equalFontSize12 },
    { key: '10', value: equalFontSize10 },
    { key: '9', value: () => 9 },
    { key: '8', value: equalFontSize8 },
    { key: '7', value: () => 7 },
    { key: '6', value: () => 6 }
  ];
  labelFontSizeFuncSelected: HierarchyTreeFontSizeFunction = this.labelFontSizeFuncArray[0].value;

  selectedNodeInfo!: string;
  tapFunc: HierarchyTreeTapFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => {
    const t = pathParentTooltips(d);
    const n = d.data as CountryHierarchyTreeNode;
    let text = `${n.name ? t : 'root'}: value: ${d.value}`;
    if (!n.children) {
      text += ` area: ${n.area}, population: ${n.population}`;
    }
    if (n.density) {
      text += `, density: ${n.density}`;
    }
    if (n.hdi) {
      text += `, HDI: ${n.hdi}`;
    }
    if (n.ihdi) {
      text += `, inequality-adjusted HDI: ${n.ihdi}`;
    }
    if (n.gdpPerCapita) {
      text += `, GDP per capita: ${n.gdpPerCapita}`;
    }
    if (n.igini) {
      text += `, income inequality: ${n.igini}`;
    }
    if (n.wgini) {
      text += `, wealth inequality: ${n.wgini}`;
    }
    if (n.sirop) {
      text += `, share of income top 1%: ${n.sirop}`;
    }
    if (n.wpaMean) {
      text += `, mean wealth per adult: ${n.wpaMean}`;
    }
    if (n.wpaMedian) {
      text += `, median wealth per adult: ${n.wpaMedian}`;
    }
    this.selectedNodeInfo = text;
  };
}
