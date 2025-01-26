import { Component } from '@angular/core';

import { materialPalettesA } from 'mb';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

import { ColorPickerDirective } from 'projects/mb/src/lib/colors/picker/color-picker.directive';
import { SwatchesSelectComponent } from 'projects/mb/src/lib/colors/swatches/swatches-select.component';

const colorChanged = (log: string, color: string): string => {
  log += ' ' + color + ',' ;
  return log;
};

@Component({
    selector: 'app-sample-swatches-9',
    templateUrl: './sample-swatches-9.component.html',
    styleUrls: ['./sample-swatches-9.component.scss'],
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, ColorPickerDirective, NgIf, MatMiniFabButton, MatIcon, MatSlideToggle, FormsModule, SwatchesSelectComponent]
})
export class SampleSwatches9Component {
  protected palettes3: string[][] = materialPalettesA();
  protected selectedPalette3: string[] = this.palettes3[0];

  private clr1 = '#00ff00';
  private clr2 = '#0000ff';
  private clr3 = this.selectedPalette3[0];
  private clr4 = '#00aaff';

  protected alpha2 = false;
  protected selected1 = '';
  protected selected2 = '';
  protected selected3 = '';
  protected selected4 = '';

  protected get color1(): string {
    return this.clr1;
  }
  protected set color1(value: string) {
    if (this.clr1 !== value) {
      this.clr1 = value;
      this.selected1 = colorChanged(this.selected1, value);
    }
  }

  protected get color2(): string {
    return this.clr2;
  }
  protected set color2(value: string) {
    if (this.clr2 !== value) {
      this.clr2 = value;
      this.selected2 = colorChanged(this.selected2, value);
    }
  }

  protected get color3(): string {
    return this.clr3;
  }
  protected set color3(value: string) {
    value = value.toLowerCase();
    if (this.clr3.toLowerCase() !== value) {
      this.clr3 = value;
      this.selected3 = colorChanged(this.selected3, value);
    }
  }

  protected get color4(): string {
    return this.clr4;
  }
  protected set color4(value: string) {
    if (this.clr4 !== value) {
      this.clr4 = value;
      this.selected4 = colorChanged(this.selected4, value);
    }
  }

  protected paletteSelectionChanged3(selection: string[]) {
    this.selectedPalette3 = selection;
    this.color3 = this.selectedPalette3[0];
  }
}
