import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';

import { ColorDiscPickerComponent } from 'projects/mb/src/lib/colors/color-disc/color-disc-picker.component';

const colorChanged = (log: string, color: string): string => {
  log += ' ' + color + ',' ;
  return log;
};

@Component({
  selector: 'app-mb-color-disc-picker-01',
  templateUrl: './color-disc-picker-01.component.html',
  styleUrls: ['./color-disc-picker-01.component.scss'],
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
    ColorDiscPickerComponent
  ]
})
export class ColorDiscPicker01Component {
  protected selectedColor = signal<string>('#ff4081');
  protected selected = '';

  hexValueChange(hex: string): void {
    this.selectedColor.set(hex);
    this.selected = colorChanged(this.selected, hex);
  }
  
  colorChange(event: { hex: string; hsl: [number, number, number] }): void {
    //console.log('Color update:', event);
  }

}
