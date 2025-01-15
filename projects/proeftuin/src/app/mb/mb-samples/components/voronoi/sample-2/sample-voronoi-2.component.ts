import { Component } from '@angular/core';

/* eslint-disable max-len */
import { HierarchyTreeNode } from 'projects/mb/src/lib/charts/hierarchy-tree/hierarchy-tree';
import { HierarchyTreeSumFunction, sumNumberOfLeafNodes } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/sum-function';
import { HierarchyTreeFillFunction, coolFill, coolFillInverted, warmFill, warmFillInverted, viridisFill, viridisFillInverted, bluesFill, bluesFillInverted, rainbowFill, rainbowFillInverted } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { coolFillFirstLevel, coolFillFirstLevelInverted, warmFillFirstLevel, warmFillFirstLevelInverted, viridisFillFirstLevel, viridisFillFirstLevelInverted, bluesFillFirstLevel, bluesFillFirstLevelInverted, rainbowFillFirstLevel, rainbowFillFirstLevelInverted, greensFillFirstLevel, greensFillFirstLevelInverted, greysFillFirstLevel, greysFillFirstLevelInverted, gradientFill } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { coolValueFill, coolValueFillInverted, warmValueFill, warmValueFillInverted, viridisValueFill, viridisValueFillInverted, bluesValueFill, bluesValueFillInverted, rainbowValueFill, rainbowValueFillInverted, greensValueFill, greensValueFillInverted, greysValueFill, greysValueFillInverted, gradientValueFill } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { HierarchyTreeFillOpacityFunction, transparentFillOpacity, opaqueFillOpacity } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-opacity-function';
import { HierarchyTreeStrokeFunction, noStroke, blackStroke, whiteStroke, transparentStroke } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/stroke-function';
import { HierarchyTreeStrokeWidthFunction, noStrokeWidth, linearStrokeWidthThin, linearStrokeWidth, linearStrokeWidthThick, linearStrokeWidthExtraThick } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/stroke-width-function';
import { HierarchyTreeTapFunction } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/tap-function';
import { pathParentTooltips } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/tooltip-function';
import { HierarchyTreeLabelFunction, nameLabels, valueLabels, emptyLabels } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/label-function';
import { HierarchyTreeFontSizeFunction, equalFontSize8, equalFontSize10, equalFontSize12, equalFontSize14, equalFontSize16, equalFontSize18, linearFontSize } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/font-size-function';

import { CountryHierarchyTreeNode, countries } from '../../../test-data/hierarchies/countries';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { VoronoiComponent } from '../../../../../../../../mb/src/lib/charts/hierarchy-tree/voronoi/voronoi.component';

interface NumberOrStringItem {
  value: number | string;
  key: string;
}

interface SumFunc {
  value: HierarchyTreeSumFunction;
  key: string;
}

// Use small non-zero values because Voronoi machinery does not tolerate zeroes returning by a sum function.
const sumFuncArea: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.area ? d.area : 1;
const sumFuncPopulation: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.population ? d.population : 1;
const sumFuncDensity: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.density ? d.density : 0.0001;
const sumFuncHdi: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.hdi ? d.hdi : 0.0001;
const sumFuncIhdi: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.ihdi ? d.ihdi : 0.0001;
const sumFuncGdpPerCapita: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.gdpPerCapita ? d.gdpPerCapita : 1;
const sumFuncIgini: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.igini ? d.igini : 0.0001;
const sumFuncWgini: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.wgini ? d.wgini : 0.0001;
const sumFuncSirop: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.sirop ? d.sirop : 0.0001;
const sumFuncWpaMean: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.wpaMean ? d.wpaMean : 0.1;
const sumFuncWpaMedian: HierarchyTreeSumFunction = (d: CountryHierarchyTreeNode) => d.wpaMedian ? d.wpaMedian : 0.1;

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
    selector: 'app-sample-voronoi-2',
    templateUrl: './sample-voronoi-2.component.html',
    styleUrls: ['./sample-voronoi-2.component.scss'],
    imports: [MatCard, MatCardContent, MatFormField, MatLabel, MatSelect, FormsModule, NgFor, MatOption, MatSlideToggle, VoronoiComponent, MatCardActions]
})
export class SampleVoronoi2Component {

  readonly contriesHierarchy: CountryHierarchyTreeNode = countries;
  flat = false;

  readonly widthArray: NumberOrStringItem[] = [
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
  widthSelected: number | string = this.widthArray[0].value;

  readonly heightArray: NumberOrStringItem[] = [
    { key: '100%width', value: '100%width' },
    { key: '75%width', value: '75%width' },
    { key: '50%width', value: '50%width' },
    { key: '25%width', value: '25%width' },
    { key: '900', value: 900 },
    { key: '800', value: 800 },
    { key: '700', value: 700 },
    { key: '600', value: 600 },
    { key: '500', value: 500 },
    { key: '400', value: 400 },
    { key: '300', value: 300 },
    { key: '200', value: 200 }
  ];
  heightSelected: number | string = this.heightArray[0].value;

  readonly shapeArray: string[] = [ 'circle', 'octagon', 'heptagon', 'hexagon', 'pentagon', 'square', 'diamond', 'triangle' ];
  shapeSelected: string = this.shapeArray[0];

  readonly convergenceRatioArray: number[] = [ 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.2, 0.3, 0.4, 0.5 ];
  convergenceRatioSelected: number = this.convergenceRatioArray[0];

  readonly minWeightRatioArray: number[] = [ 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.2, 0.3, 0.4, 0.5 ];
  minWeightRatioSelected: number = this.minWeightRatioArray[0];

  readonly maxIterationCountArray: number[] = [ 50, 40, 30, 20, 10, 5, 60, 70, 80, 90, 100 ];
  maxIterationCountSelected: number = this.maxIterationCountArray[0];

  readonly paddingArray: number[] = [ 2, 1, 0, 3, 4, 5, 10, 20 ];
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
    { key: 'blues', value: bluesFillFirstLevel },
    // { key: 'leaves', value: (d: any) => gradientFill(d, 'lawngreen', 'green', false, false, false, true) },
    { key: 'leaves', value: (d: any) => gradientFill(d, 'lightgreen', 'seagreen', false, false, false, false) },
    { key: 'greens', value: greensFillFirstLevel },
    { key: 'greys', value: greysFillFirstLevel },
    { key: 'cool', value: coolFillFirstLevel },
    { key: 'warm', value: warmFillFirstLevel },
    { key: 'viridis', value: viridisFillFirstLevel },
    { key: 'rainbow', value: rainbowFillFirstLevel },

    { key: 'blues inv', value: bluesFillFirstLevelInverted },
    { key: 'greens inv', value: greensFillFirstLevelInverted },
    { key: 'greys inv', value: greysFillFirstLevelInverted },
    { key: 'cool inv', value: coolFillFirstLevelInverted },
    { key: 'warm inv', value: warmFillFirstLevelInverted },
    { key: 'viridis inv', value: viridisFillFirstLevelInverted },
    { key: 'rainbow inv', value: rainbowFillFirstLevelInverted },

    { key: 'cool light', value: coolFill },
    { key: 'warm light', value: warmFill },
    { key: 'viridis light', value: viridisFill },
    { key: 'blues light', value: bluesFill },
    { key: 'rainbow light', value: rainbowFill },

    { key: 'cool light inv', value: coolFillInverted },
    { key: 'warm light inv', value: warmFillInverted },
    { key: 'viridis light inv', value: viridisFillInverted },
    { key: 'blues light inv', value: bluesFillInverted },
    { key: 'rainbow light inv', value: rainbowFillInverted },

    { key: 'blues val', value: bluesValueFill },
    { key: 'leaves val', value: (d: any, min: number, max: number) => gradientValueFill(d, min, max, 'lightgreen', 'seagreen', false, false, false) },
    { key: 'greens val', value: greensValueFill },
    { key: 'greys val', value: greysValueFill },
    { key: 'cool val', value: coolValueFill },
    { key: 'warm val', value: warmValueFill },
    { key: 'viridis val', value: viridisValueFill },
    { key: 'rainbow val', value: rainbowValueFill },

    { key: 'blues val inv', value: bluesValueFillInverted },
    { key: 'leaves val inv', value: (d: any, min: number, max: number) => gradientValueFill(d, min, max, 'lightgreen', 'seagreen', true, false, false) },
    { key: 'greens val inv', value: greensValueFillInverted },
    { key: 'greys val inv', value: greysValueFillInverted },
    { key: 'cool val inv', value: coolValueFillInverted },
    { key: 'warm val inv', value: warmValueFillInverted },
    { key: 'viridis val inv', value: viridisValueFillInverted },
    { key: 'rainbow val inv', value: rainbowValueFillInverted }
  ];
  fillFuncSelected: HierarchyTreeFillFunction = this.fillFuncArray[0].value;

  readonly fillOpacityFuncArray: FillOpacityFunc[] = [
    { key: 'opaque', value: opaqueFillOpacity },
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
    { key: 'white', value: whiteStroke },
    { key: 'black', value: blackStroke },
    { key: 'transparent', value: transparentStroke },
    { key: 'none', value: noStroke }
  ];
  strokeFuncSelected: HierarchyTreeStrokeFunction = this.strokeFuncArray[0].value;

  readonly strokeWidthFuncArray: StrokeWidthFunc[] = [
    { key: 'thick', value: linearStrokeWidthThick },
    { key: 'extra thick', value: linearStrokeWidthExtraThick },
    { key: 'normal', value: linearStrokeWidth },
    { key: 'thin', value: linearStrokeWidthThin },
    { key: 'none', value: noStrokeWidth }
  ];
  strokeWidthFuncSelected: HierarchyTreeStrokeWidthFunction = this.strokeWidthFuncArray[0].value;

  readonly labelFuncArray: LabelFunc[] = [
    { key: 'none', value: emptyLabels },
    { key: 'name', value: nameLabels },
    { key: 'value', value: valueLabels }
  ];
  labelFuncSelected: HierarchyTreeLabelFunction = this.labelFuncArray[0].value;

  readonly labelMinRatioArray: number[] = [ 0.2, 0.01, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ];
  labelMinRatioSelected: number = this.labelMinRatioArray[0];

  readonly labelFillArray: string[] = [ 'white', 'black', 'transparent' ];
  labelFillSelected: string = this.labelFillArray[0];

  readonly labelShadowArray: string[] = [ 'none', '0px 0px 8px #000000', '0px 0px 8px #ffffff' ];
  labelShadowSelected: string = this.labelShadowArray[0];

  readonly labelFontSizeFuncArray: LabelFontSizeFunc[] = [
    { key: '8', value: equalFontSize8 },
    { key: '6', value: () => 6 },
    { key: '7', value: () => 7 },
    { key: '8', value: equalFontSize8 },
    { key: '9', value: () => 9 },
    { key: '10', value: equalFontSize10 },
    { key: '12', value: equalFontSize12 },
    { key: '14', value: equalFontSize14 },
    { key: '16', value: equalFontSize16 },
    { key: '18', value: equalFontSize18 },
    { key: 'linear', value: linearFontSize }
  ];
  labelFontSizeFuncSelected: HierarchyTreeFontSizeFunction = this.labelFontSizeFuncArray[0].value;

  selectedNodeInfo!: string;
  tapFunc: HierarchyTreeTapFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => {
    const t = pathParentTooltips(d);
    const n = d.data as CountryHierarchyTreeNode;
    let text = `${t}: value: ${d.value}`;
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
