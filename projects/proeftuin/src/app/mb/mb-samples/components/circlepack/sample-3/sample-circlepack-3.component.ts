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

import { AexIndexHierarchyTreeNode, aexIndexTickers, aexIndexIssuerCountries, aexIndexIcb } from '../../../test-data/hierarchies/aex-index';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';

import { CirclepackComponent } from '../../../../../../../../mb/src/lib/charts/hierarchy-tree/circlepack/circlepack.component';

interface Dataset {
  value: AexIndexHierarchyTreeNode;
  key: string;
}

interface DiameterItam {
  value: number | string;
  key: string;
}

interface SumFunc {
  value: HierarchyTreeSumFunction;
  key: string;
}

const sumFuncWeightPerc: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.weightPerc : 0;
const sumFuncTransactions: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.transactions : 0;
const sumFuncVolume: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.volume : 0;
const sumFuncTurnoverEur: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.turnoverEur : 0;
const sumFuncPriceEur: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.close : 0;
const sumFuncReturnEur: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.returnEur : 0;
const sumFuncReturnEurNeg: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? -d.constituent.returnEur : 0;
const sumFuncReturnPerc: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.returnPerc : 0;
const sumFuncReturnPercNeg: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? -d.constituent.returnPerc : 0;
const sumFuncMarketCapBn: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.marketCapBn : 0;
const sumFuncSharesOutstanding: HierarchyTreeSumFunction = (d: AexIndexHierarchyTreeNode) => d.constituent ? d.constituent.sharesOutstanding : 0;

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
    selector: 'app-sample-circlepack-3',
    templateUrl: './sample-circlepack-3.component.html',
    styleUrls: ['./sample-circlepack-3.component.scss'],
    imports: [MatCard, MatCardContent, MatSlideToggle, FormsModule, MatFormField, MatLabel, MatSelect, NgFor, MatOption, CirclepackComponent, MatCardActions]
})
export class SampleCirclepack3Component {

  readonly datasetArray: Dataset[] = [
    { key: 'issuers', value: aexIndexIssuerCountries },
    { key: 'tickers', value: aexIndexTickers },
    { key: 'icb', value: aexIndexIcb }
  ];
  datasetSelected: AexIndexHierarchyTreeNode = this.datasetArray[0].value;

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
    { key: 'weight %', value: sumFuncWeightPerc },
    { key: 'transactions', value: sumFuncTransactions },
    { key: 'volume', value: sumFuncVolume },
    { key: 'turnover eur', value: sumFuncTurnoverEur },
    { key: 'price eur', value: sumFuncPriceEur },
    { key: 'pos return eur', value: sumFuncReturnEur },
    { key: 'neg return eur', value: sumFuncReturnEurNeg },
    { key: 'pos return %', value: sumFuncReturnPerc },
    { key: 'neg return %', value: sumFuncReturnPercNeg },
    { key: 'market cap, bn eur', value: sumFuncMarketCapBn },
    { key: 'shares outstanding', value: sumFuncSharesOutstanding },
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
    const n = d.data as AexIndexHierarchyTreeNode;
    let text = `${d.data.name ? t : 'root'}: value: ${d.value}`;
    if (n.constituent) {
      const c = n.constituent;
      text += ` ticker: ${c.ticker}, isin: ${c.isin}, name: ${c.name}, issuer country: ${c.issuerCountry},`;
      text += ` icb: ${c.icb}, weight: ${c.weightPerc}%, price: ${c.close} EUR, turnover: ${c.turnoverEur} EUR,`;
      text += ` transactions: ${c.transactions}, volume: ${c.volume}, return: ${c.returnEur} EUR, ${c.returnPerc}%,`;
      text += ` market cap: ${c.marketCapBn} Bn EUR, shares outstanding: ${c.sharesOutstanding}`;
      text += ` description: ${c.description}`;
    }
    this.selectedNodeInfo = text;
  };
}
