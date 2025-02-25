import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatSelectionList, MatListOption, MatList, MatListItem } from '@angular/material/list';

import { SwatchesComponent } from 'projects/mb/src/lib/colors/swatches/swatches.component';
import { SwatchesSelectComponent } from 'projects/mb/src/lib/colors/swatches/swatches-select.component';

@Component({
    selector: 'app-sample-swatches-1',
    templateUrl: './sample-swatches-1.component.html',
    styleUrls: ['./sample-swatches-1.component.scss'],
    imports: [
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatSelectionList,
    MatListOption,
    MatList,
    MatListItem,
    SwatchesComponent,
    SwatchesSelectComponent
]
})
export class SampleSwatches1Component {

  readonly colors2: string[] = [ '#5C849F', '#93B2C1', '#6BAEA7', '#73C0DC' ];
  readonly colors1: string[] = [ '#31B9B0', '#5AF0BC', '#32D2BA', '#26BBBE', '#32BEA1' ];

  readonly swatchesArray: string[][] = [ this.colors1, this.colors2 ];
  swatchesSelectedIndex = 0;
  swatchesSelected: string[] = this.swatchesArray[this.swatchesSelectedIndex];
  arraySwatchesSelectedSingleList: string[][] = [this.swatchesArray[this.swatchesSelectedIndex]];
  arraySwatchesSelectedMultipleList: string[][] = [this.swatchesArray[this.swatchesSelectedIndex]];

  selectionChanged(selection: string[]) {
    this.swatchesSelectedIndex = this.swatchesArray.indexOf(selection);
    this.swatchesSelected = selection;
  }

  compareFunction = (item1: any, item2: any) => item1 === item2;
}
