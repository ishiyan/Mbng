import { Injectable } from '@angular/core';

import { ColorPickerComponent } from './color-picker.component';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {
  private active: ColorPickerComponent | null = null;

  public setActive(active: ColorPickerComponent | null): void {
    if (this.active && this.active !== active) {
      this.active.closeDialog();
    }

    this.active = active;
  }
}
