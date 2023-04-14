import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';

import { WmaInput } from './wma-input.interface';
import { Wma } from './wma.interface';

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createWma = (showStyle: boolean, len: number, comp?: BarComponent): Wma => {
  const params = {length: len, barComponent: comp};
  return {
    params,
    style: createStyle(),
    showStyle
  };
};

@Component({
  selector: 'app-wma-list',
  templateUrl: './wma-list.component.html',
  styleUrls: ['./wma-list.component.scss']
})
export class WmaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  @Input() set initial(init: WmaInput) {
    const arr: Wma[] = [];

    for (let i = 0; i < init.length.length; i++) {
      const wma = createWma(init.showStyle, init.length[i], init.barComponent);
      wma.style.color = this.colorArray[i%this.colorArray.length];

      arr.push(wma);
    }

    this.wmaArray = arr;
    this.defaultBarComponent = init.barComponent;
  }

  /** Specifies the input colors. */
  @Input() set colors(inp: string[]) {
    if (inp && inp.length > 0) {
      const arr: Wma[] = [];
      this.colorArray = inp;

      for (let i = 0; i < this.wmaArray.length; i++) {
        const wma = {...this.wmaArray[i]};
        wma.style.color = inp[i%inp.length];

        arr.push(wma);
      }

      this.wmaArray = arr;
    }
  }

  /** Event emitted when the indicator has been removed by the user. */
  @Output() readonly changed: EventEmitter<Wma[]> = new EventEmitter<Wma[]>();

  protected wmaArray: Wma[] = [];
  protected colorArray = ['#ff0000'];

  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.wmaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const wma = createWma(showStyle, this.getLastLength() + 5, this.defaultBarComponent);

    if (showStyle) {
      wma.style.color = this.colorArray[this.wmaArray.length%this.colorArray.length];
    }

    this.wmaArray.push(wma);
    this.wmaArray = [...this.wmaArray];
    this.notify();
  }

  protected updated(wma: Wma): void {
    const i = this.getIndex(wma);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(wma: Wma): void {
    const i = this.getIndex(wma);
    if (i >= 0) {
      this.wmaArray.splice(i, 1);
      this.wmaArray = [...this.wmaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.wmaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    return this.wmaArray[last].params.length;
  }

  private getShowStyle(): boolean {
    if (this.wmaArray.length <= 0) {
      return false;
    }

    return this.wmaArray[0].showStyle;
  }

  private getIndex(wma: Wma): number {
    for (let i = 0; i < this.wmaArray.length; i++) {
      const el = this.wmaArray[i];
      if (el === wma) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.wmaArray);
    }
  }
}
