import { Component } from '@angular/core';

/* eslint-disable max-len */
import { HierarchyTreeNode } from 'projects/mb/src/lib/charts/hierarchy-tree/hierarchy-tree';
import { HierarchyTreeSumFunction, sumNumberOfLeafNodes, sumNumberOfNodes } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/sum-function';
import { HierarchyTreeFillFunction, coolFill, coolFillInverted, warmFill, warmFillInverted, viridisFill, viridisFillInverted, bluesFill, bluesFillInverted, rainbowFill, rainbowFillInverted } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { coolFillFirstLevel, coolFillFirstLevelInverted, warmFillFirstLevel, warmFillFirstLevelInverted, viridisFillFirstLevel, viridisFillFirstLevelInverted, bluesFillFirstLevel, bluesFillFirstLevelInverted, rainbowFillFirstLevel, rainbowFillFirstLevelInverted, greensFillFirstLevel, greensFillFirstLevelInverted, greysFillFirstLevel, greysFillFirstLevelInverted, gradientFill } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { coolValueFill, coolValueFillInverted, warmValueFill, warmValueFillInverted, viridisValueFill, viridisValueFillInverted, bluesValueFill, bluesValueFillInverted, rainbowValueFill, rainbowValueFillInverted, greensValueFill, greensValueFillInverted, greysValueFill, greysValueFillInverted, gradientValueFill } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { HierarchyTreeFillOpacityFunction, transparentFillOpacity, opaqueFillOpacity, linearFillOpacity } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-opacity-function';
import { HierarchyTreeStrokeFunction, noStroke, blackStroke, whiteStroke, transparentStroke } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/stroke-function';
import { HierarchyTreeStrokeWidthFunction, noStrokeWidth, linearStrokeWidthThin, linearStrokeWidth, linearStrokeWidthThick, linearStrokeWidthExtraThick } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/stroke-width-function';
import { HierarchyTreeTapFunction } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/tap-function';
import { pathParentTooltips } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/tooltip-function';
import { HierarchyTreeLabelFunction, nameLabels, valueLabels, emptyLabels } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/label-function';
import { HierarchyTreeFontSizeFunction, equalFontSize8, equalFontSize10, equalFontSize12, equalFontSize14, equalFontSize16, equalFontSize18, linearFontSize } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/font-size-function';

// import { flare } from '../../../test-data/hierarchies/flare';
import { jdk } from '../../../test-data/hierarchies/jdk';

const sumFuncValue: HierarchyTreeSumFunction = (d: HierarchyTreeNode) => d.value ? d.value : 0;

interface NumberOrStringItem {
  value: number | string;
  key: string;
}

interface NumberItem {
  value: number;
  key: string;
}

interface SumFunc {
  value: HierarchyTreeSumFunction;
  key: string;
}

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
    selector: 'app-sample-treemap-5',
    templateUrl: './sample-treemap-5.component.html',
    styleUrls: ['./sample-treemap-5.component.scss'],
    standalone: false
})
export class SampleTreemap5Component {

  // readonly jdkHierarchy: HierarchyTreeNode = flare;
  readonly jdkHierarchy: HierarchyTreeNode = jdk;
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

  readonly paddingArray: number[] = [ 1, 0, 2, 3, 4, 5, 10, 20 ];
  paddingSelected: number = this.paddingArray[0];

  readonly rectangleRatioArray: NumberItem[] = [
    { key: 'φ', value: 1.6180339887 },
    { key: '1', value: 1 },
    { key: 'φ', value: 1.6180339887 },
    { key: '2', value: 2 },
    { key: 'π', value: 3.1415926535 },
    { key: '1 / π', value: 0.31787139581 },
    { key: '1 / 2', value: 0.5 },
    { key: 'Φ = 1 / φ', value: 0.6180339887 }
  ];
  rectangleRatioSelected: number = this.rectangleRatioArray[0].value;

  readonly sumFuncArray: SumFunc[] = [
    { key: 'size in bytes', value: sumFuncValue },
    { key: '# files', value: sumNumberOfLeafNodes },
    { key: '# files and folders', value: sumNumberOfNodes }
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

    { key: 'blues 1st', value: bluesFillFirstLevel },
    // { key: 'leaves', value: (d: any) => gradientFill(d, 'lawngreen', 'green', false, false, false, true) },
    { key: 'leaves 1st', value: (d: any) => gradientFill(d, 'lightgreen', 'seagreen', false, false, false, false) },
    { key: 'greens 1st', value: greensFillFirstLevel },
    { key: 'greys 1st', value: greysFillFirstLevel },
    { key: 'cool 1st', value: coolFillFirstLevel },
    { key: 'warm 1st', value: warmFillFirstLevel },
    { key: 'viridis 1st', value: viridisFillFirstLevel },
    { key: 'rainbow 1st', value: rainbowFillFirstLevel },

    { key: 'blues 1st inv', value: bluesFillFirstLevelInverted },
    { key: 'greens 1st inv', value: greensFillFirstLevelInverted },
    { key: 'greys 1st inv', value: greysFillFirstLevelInverted },
    { key: 'cool 1st inv', value: coolFillFirstLevelInverted },
    { key: 'warm 1st inv', value: warmFillFirstLevelInverted },
    { key: 'viridis 1st inv', value: viridisFillFirstLevelInverted },
    { key: 'rainbow 1st inv', value: rainbowFillFirstLevelInverted },

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
    { key: 'name', value: nameLabels },
    { key: 'value', value: valueLabels },
    { key: 'none', value: emptyLabels }
  ];
  labelFuncSelected: HierarchyTreeLabelFunction = this.labelFuncArray[0].value;

  readonly labelMinRatioArray: number[] = [ 0.001, 0.01, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ];
  labelMinRatioSelected: number = this.labelMinRatioArray[0];

  readonly labelFillArray: string[] = [ 'white', 'black', 'transparent' ];
  labelFillSelected: string = this.labelFillArray[0];

  readonly labelFontSizeFuncArray: LabelFontSizeFunc[] = [
    { key: 'linear', value: linearFontSize },
    { key: '8', value: equalFontSize8 },
    { key: '6', value: () => 6 },
    { key: '7', value: () => 7 },
    { key: '8', value: equalFontSize8 },
    { key: '9', value: () => 9 },
    { key: '10', value: equalFontSize10 },
    { key: '12', value: equalFontSize12 },
    { key: '14', value: equalFontSize14 },
    { key: '16', value: equalFontSize16 },
    { key: '18', value: equalFontSize18 }
  ];
  labelFontSizeFuncSelected: HierarchyTreeFontSizeFunction = this.labelFontSizeFuncArray[0].value;

  selectedNodeInfo!: string;
  tapFunc: HierarchyTreeTapFunction = (d: d3.HierarchyNode<HierarchyTreeNode>) => {
    const t = pathParentTooltips(d);
    this.selectedNodeInfo = `${t}: value: ${d.value}`;
  };
}
