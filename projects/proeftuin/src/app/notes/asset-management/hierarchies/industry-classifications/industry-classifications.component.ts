import { Component } from '@angular/core';

import { nameLabels } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/label-function';
import { sumNumberOfLeafNodes } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/sum-function';
import { noStroke } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/stroke-function';
import { coolFill, coolFillFirstLevel } from 'projects/mb/src/lib/charts/hierarchy-tree/functions/fill-function';

import { icbTaxonomy } from 'projects/mb/src/lib/trading/instruments/industry-classification/icb-taxonomy';
import { gicsTaxonomy } from 'projects/mb/src/lib/trading/instruments/industry-classification/gics-taxonomy';

@Component({
  selector: 'mb-hierarchies-industry-classifications',
  templateUrl: './industry-classifications.component.html',
  styleUrls: ['./industry-classifications.component.scss']
})
export class IndustryClassificationsComponent {

  icb = icbTaxonomy;
  gics = gicsTaxonomy;

  namLabFunc = nameLabels;
  fillFunc = coolFill;
  fillFunc2 = coolFillFirstLevel;
  sumFunc = sumNumberOfLeafNodes;
  strokeFunc = noStroke;
  labelFontSizeFunc = () => 12;
  labelFontSizeFuncLarge = () => 16;
}
