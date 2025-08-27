import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';

import { ColorDiscComponent } from 'projects/mb/src/lib/colors/color-disc/color-disc.component';
import { ColorDiscPickerComponent } from 'projects/mb/src/lib/colors/color-disc/color-disc-picker.component';

const colorChanged = (log: string, color: string): string => {
  log += ' ' + color + ',' ;
  return log;
};

@Component({
  selector: 'app-sample-swatches-12',
  templateUrl: './sample-swatches-12.component.html',
  styleUrls: ['./sample-swatches-12.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatMiniFabButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    ColorDiscComponent,
    ColorDiscPickerComponent
  ]
})
export class SampleSwatches12Component {
  protected selectedColor = signal<string>('#ff4081');
  protected selected = '';

  protected selectedColor2 = signal<string>('#ff4081');
  protected selected2 = '';

  hexValueChange(hex: string): void {
    this.selectedColor.set(hex);
    this.selected = colorChanged(this.selected, hex);
  }
  
  colorChange(event: { hex: string; hsl: [number, number, number] }): void {
    //console.log('Color update:', event);
  }

  hexValueChange2(hex: string): void {
    this.selectedColor2.set(hex);
    this.selected2 = colorChanged(this.selected2, hex);
  }
  
  colorChange2(event: { hex: string; hsl: [number, number, number] }): void {
    //console.log('Color update:', event);
  }

}
