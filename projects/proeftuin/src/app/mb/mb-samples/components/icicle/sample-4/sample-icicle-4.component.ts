import { Component } from '@angular/core';

/* eslint-disable max-len */
import { HierarchyTreeNode } from 'projects/mb/src/lib/charts/hierarchy-tree/hierarchy-tree';
import { HierarchyTreeSumFunction, sumNumberOfLeafNodes } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/sum-function';
import { HierarchyTreeFillFunction, coolFill, coolFillInverted, warmFill, warmFillInverted, viridisFill, viridisFillInverted, bluesFill, bluesFillInverted, rainbowFill, rainbowFillInverted } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { HierarchyTreeFillOpacityFunction, transparentFillOpacity, opaqueFillOpacity, linearFillOpacity } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-opacity-function';
import { HierarchyTreeTapFunction } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/tap-function';
import { pathParentTooltips } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/tooltip-function';
import { HierarchyTreeLabelFunction, nameLabels, valueLabels, emptyLabels } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/label-function';
import { HierarchyTreeFontSizeFunction, equalFontSize8, equalFontSize10, equalFontSize12, equalFontSize14, equalFontSize16, equalFontSize18, linearFontSize } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/font-size-function';

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

interface LabelFunc {
  value: HierarchyTreeLabelFunction;
  key: string;
}

interface LabelFontSizeFunc {
  value: HierarchyTreeFontSizeFunction;
  key: string;
}

@Component({
    selector: 'app-sample-icicle-4',
    templateUrl: './sample-icicle-4.component.html',
    styleUrls: ['./sample-icicle-4.component.scss'],
    standalone: false
})
export class SampleIcicle4Component {

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

  zoom = true;
  rootVisible = false;

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

  readonly levelsArray: number[] = [ 0, 1, 2, 3, 4 ];
  levelsSelected: number = this.levelsArray[0];

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
    { key: '0.9', value: () => 0.9 },
    { key: '0.8', value: () => 0.8 },
    { key: '0.7', value: () => 0.7 },
    { key: '0.6', value: () => 0.6 },
    { key: '0.5', value: () => 0.5 },
    { key: '0.4', value: () => 0.4 },
    { key: '0.3', value: () => 0.3 },
    { key: '0.2', value: () => 0.2 },
    { key: '0.1', value: () => 0.1 },
    { key: 'transparent', value: transparentFillOpacity }
  ];
  fillOpacityFuncSelected: HierarchyTreeFillOpacityFunction = this.fillOpacityFuncArray[0].value;

  readonly labelFuncArray: LabelFunc[] = [
    { key: 'name', value: nameLabels },
    { key: 'value', value: valueLabels },
    { key: 'none', value: emptyLabels }
  ];
  labelFuncSelected: HierarchyTreeLabelFunction = this.labelFuncArray[0].value;

  readonly labelFillArray: string[] = [ 'white', 'black', 'transparent' ];
  labelFillSelected: string = this.labelFillArray[0];

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
    const n = d.data as Omxn40HierarchyTreeNode;
    let text = `${d.data.name ? t : 'root'}: value: ${d.value}`;
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
