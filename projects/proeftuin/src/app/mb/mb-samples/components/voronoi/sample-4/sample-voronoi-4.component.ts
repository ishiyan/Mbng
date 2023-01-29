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
import { HierarchyTreeFontSizeFunction, equalFontSize8, equalFontSize10, equalFontSize12, equalFontSize16, equalFontSize18, linearFontSize } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/font-size-function';

import { Omxn40HierarchyTreeNode, omxn40Tickers, omxn40Currencies, omxn40Icb, omxn40Ms, omxn40MsStyle, omxn40MsStyleCapValueGrowth, omxn40MsStyleValueGrowthCap } from '../../../test-data/hierarchies/omxn40';

interface Dataset {
  value: Omxn40HierarchyTreeNode;
  key: string;
}

interface NumberOrStringItem {
  value: number | string;
  key: string;
}

interface SumFunc {
  value: HierarchyTreeSumFunction;
  key: string;
}

// Use small non-zero values because Voronoi machinery does not tolerate zeroes returning by a sum function.
const sumFuncValueEur: HierarchyTreeSumFunction = (d: Omxn40HierarchyTreeNode) => d.constituent ? d.constituent.ratio * d.constituent.close : 0.0001;
const sumFuncTransactions: HierarchyTreeSumFunction = (d: Omxn40HierarchyTreeNode) => d.constituent ? d.constituent.transactions : 1;
const sumFuncVolume: HierarchyTreeSumFunction = (d: Omxn40HierarchyTreeNode) => d.constituent ? d.constituent.volume : 1;
const sumFuncTurnoverEur: HierarchyTreeSumFunction = (d: Omxn40HierarchyTreeNode) => d.constituent ? d.constituent.ratio * d.constituent.turnover : 1;
const sumFuncMarketCapBnEur: HierarchyTreeSumFunction = (d: Omxn40HierarchyTreeNode) => d.constituent ? d.constituent.ratio * d.constituent.marketCap : 1;

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
  selector: 'app-sample-voronoi-4',
  templateUrl: './sample-voronoi-4.component.html',
  styleUrls: ['./sample-voronoi-4.component.scss']
})
export class SampleVoronoi4Component {

  flat = false;

  readonly datasetArray: Dataset[] = [
    { key: 'currencies', value: omxn40Currencies },
    { key: 'tickers', value: omxn40Tickers },
    { key: 'icb', value: omxn40Icb },
    { key: 'ms', value: omxn40Ms },
    { key: 'ms style', value: omxn40MsStyle },
    { key: 'ms cap val', value: omxn40MsStyleCapValueGrowth },
    { key: 'ms val cap', value: omxn40MsStyleValueGrowthCap }
  ];
  datasetSelected: Omxn40HierarchyTreeNode = this.datasetArray[0].value;

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

  readonly convergenceRatioArray: number[] = [ 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.2, 0.3, 0.4, 0.5, 0.001 ];
  convergenceRatioSelected: number = this.convergenceRatioArray[0];

  readonly minWeightRatioArray: number[] = [ 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.2, 0.3, 0.4, 0.5, 0.001 ];
  minWeightRatioSelected: number = this.minWeightRatioArray[0];

  readonly maxIterationCountArray: number[] = [ 50, 40, 30, 20, 10, 5, 60, 70, 80, 90, 100, 200 ];
  maxIterationCountSelected: number = this.maxIterationCountArray[0];

  readonly paddingArray: number[] = [ 2, 1, 0, 3, 4, 5, 10, 20 ];
  paddingSelected: number = this.paddingArray[0];

  readonly sumFuncArray: SumFunc[] = [
    { key: 'value eur', value: sumFuncValueEur },
    { key: 'transactions', value: sumFuncTransactions },
    { key: 'volume', value: sumFuncVolume },
    { key: 'turnover eur', value: sumFuncTurnoverEur },
    { key: 'market cap, bn eur', value: sumFuncMarketCapBnEur },
    { key: '# tickers', value: sumNumberOfLeafNodes }
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
    { key: 'thin', value: linearStrokeWidthThin },
    { key: 'thick', value: linearStrokeWidthThick },
    { key: 'extra thick', value: linearStrokeWidthExtraThick },
    { key: 'normal', value: linearStrokeWidth },
    { key: 'none', value: noStrokeWidth }
  ];
  strokeWidthFuncSelected: HierarchyTreeStrokeWidthFunction = this.strokeWidthFuncArray[0].value;

  readonly labelFuncArray: LabelFunc[] = [
    { key: 'name', value: nameLabels },
    { key: 'value', value: valueLabels },
    { key: 'none', value: emptyLabels }
  ];
  labelFuncSelected: HierarchyTreeLabelFunction = this.labelFuncArray[0].value;

  readonly labelMinRatioArray: number[] = [ 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ];
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
    { key: '16', value: equalFontSize16 },
    { key: '18', value: equalFontSize18 },
    { key: 'linear', value: linearFontSize }
  ];
  labelFontSizeFuncSelected: HierarchyTreeFontSizeFunction = this.labelFontSizeFuncArray[0].value;

  selectedNodeInfo!: string;
  tapFunc: HierarchyTreeTapFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => {
    const t = pathParentTooltips(d);
    const n = d.data as Omxn40HierarchyTreeNode;
    let text = `${t}: value: ${d.value ? d.value.toFixed(2) : d.value}`;
    if (n.constituent) {
      const c = n.constituent;
      text += ` ticker: ${c.ticker}, isin: ${c.isin}, mic: ${c.mic}, name: ${c.name}, country: ${c.country},`;
      text += ` icb: ${c.icb}, icb industry: ${c.icbIndustry}, icb supersector: ${c.icbSupersector},`;
      text += ` morningstar sector: ${c.msSector}, morningstar industry: ${c.msIndustry}, morningstar stock style: ${c.msStockStyle},`;
      text += ` price: EUR ${(c.close * c.ratio).toFixed(2)} (${c.currency} ${c.close}), turnover: EUR ${(c.turnover * c.ratio).toFixed(2)} (${c.currency} ${c.turnover}),`;
      text += ` transactions: ${c.transactions}, volume: ${c.volume},`;
      text += ` market cap: EUR ${(c.marketCap * c.ratio).toFixed(2)} Bn (${c.currency} ${c.marketCap} Bn),`;
      text += ` description: ${c.description}`;
    }
    this.selectedNodeInfo = text;
  };
}
