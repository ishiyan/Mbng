import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { IcicleComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/icicle/icicle.component';
import { TreemapComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/treemap/treemap.component';
import { SunburstComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/sunburst/sunburst.component';
import { CirclepackComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/circlepack/circlepack.component';
import { VoronoiComponent } from 'projects/mb/src/lib/charts/hierarchy-tree/voronoi/voronoi.component';
import { HierarchyTreeNode } from 'projects/mb/src/lib/charts/hierarchy-tree/hierarchy-tree';
import { HierarchyTreeSumFunction, sumNodeValues/*, sumNumberOfNodes*/ } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/sum-function';
import { coolValueFillInverted } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';
import { linearFontSize } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/font-size-function';

import { omxn40Currencies, omxn40Icb, omxn40Ms } from '../../../../mb/test-data/hierarchies/omxn40';
import { aexIndexTickers } from '../../../../mb/test-data/hierarchies/aex-index';
import { flare } from '../../../../mb/test-data/hierarchies/flare';

const flatternData = (data: HierarchyTreeNode, name: string = ''): HierarchyTreeNode => {
  const flat: HierarchyTreeNode = { name: name, children: [] };
  flattern(data, flat);
  return flat;
};
const flattern = (data: HierarchyTreeNode, flat: HierarchyTreeNode): void => {
  if (data.children) {
    for (const child of data.children) {
      if (child.children) {
        flattern(child, flat);
      } else {
        flat.children?.push(child);
      }
    }
  }
};

const sumFuncOmxN40ValueEur: HierarchyTreeSumFunction = (d: any) => d.constituent ? d.constituent.ratio * d.constituent.close : 0;
const sumFuncAexWeightPerc: HierarchyTreeSumFunction = (d: any) => d.constituent ? d.constituent.weightPerc : 0;

@Component({
  selector: 'app-hierarchies-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatSlideToggle,
    MatSelect,
    MatOption,
    IcicleComponent,
    TreemapComponent,
    SunburstComponent,
    CirclepackComponent,
    VoronoiComponent
  ]
})
export class DemoComponent {
  size = 260;
  size4 = 60;

  noStrokeFunc = () => '';
  transparentStrokeFunc = () => 'white';
  labelFontSizeFuncLarge = () => 16;
  labelFontSizeZeroFunc = (d: any) => 0;

  flatFlare = flatternData(flare, 'file system');
  demoFlatValueFill = coolValueFillInverted;
  demoFlatAsymmetricalValue = false;
  demoFlatData = aexIndexTickers;
  demoFlatSumFunc = sumFuncAexWeightPerc;
  get demoFlatAsymmetrical(): boolean {
    return this.demoFlatAsymmetricalValue;
  }
  set demoFlatAsymmetrical(value: boolean) {
    this.demoFlatAsymmetricalValue = value;
    this.demoFlatData = value ? this.flatFlare : aexIndexTickers;
    this.demoFlatSumFunc  = value ? sumNodeValues : sumFuncAexWeightPerc;
  }
  readonly demoFlatShapeArray: string[] = [ 'pentagon', 'circle', 'octagon', 'heptagon', 'hexagon', 'square', 'diamond', 'triangle' ];
  demoFlatShapeSelected: string = this.demoFlatShapeArray[0];

  demoHierAsymmetricalValue = false;
  demoHierData = omxn40Currencies;
  demoHierSumFunc = sumFuncOmxN40ValueEur;
  get demoHierAsymmetrical(): boolean {
    return this.demoHierAsymmetricalValue;
  }
  set demoHierAsymmetrical(value: boolean) {
    this.demoHierAsymmetricalValue = value;
    this.demoHierData = value ? flare : omxn40Currencies;
    this.demoHierSumFunc  = value ? sumNodeValues : sumFuncOmxN40ValueEur;
  }
  readonly demoHierShapeArray: string[] = [ 'hexagon', 'circle', 'octagon', 'heptagon', 'pentagon', 'square', 'diamond', 'triangle' ];
  demoHierShapeSelected: string = this.demoHierShapeArray[0];
  demoHierCirclepackLabelFontsizeValue = false;
  demoHierCirclepackLabelFontsizeFunc = this.labelFontSizeZeroFunc;
  get demoHierCirclepackLabelFontsize(): boolean {
    return this.demoHierCirclepackLabelFontsizeValue;
  }
  set demoHierCirclepackLabelFontsize(value: boolean) {
    this.demoHierCirclepackLabelFontsizeValue = value;
    this.demoHierCirclepackLabelFontsizeFunc  = value ? linearFontSize : this.labelFontSizeZeroFunc;
  }

  dataCcy = omxn40Currencies;
  dataIcb = omxn40Icb;
  dataMs = omxn40Ms;

  //sumFunc = sumNodeValues;
  //sumFunc = sumNumberOfNodes;
  sumFunc = (d: any) => d.constituent ? d.constituent.ratio * d.constituent.close : 0;
}
