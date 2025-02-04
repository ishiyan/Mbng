import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';

import { WmaInput } from './wma-input.interface';
import { Wma } from './wma.interface';
import { WmaParamsComponent } from './wma-params.component';

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createWma = (sid: number, showStyle: boolean, len: number, comp?: BarComponent): Wma => {
  const params = {length: len, barComponent: comp};
  return {
    id: sid,
    params: params,
    style: createStyle(),
    showStyle: showStyle
  };
};

function inc(n: number): number {
  return n === 1000 ? 0 : 1000;
}

@Component({
  selector: 'app-wma-list',
  templateUrl: './wma-list.component.html',
  styleUrls: ['./wma-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    WmaParamsComponent
  ]
})
export class WmaListComponent implements AfterViewInit {
  /** Specifies the initial indicator array. */
  readonly initial = input<WmaInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Wma[] = [];

        for (let i = 0; i < init.length.length; i++) {
          const wma = createWma(sid + i, init.showStyle, init.length[i], init.barComponent);
          wma.style.color = this.colorArray[i%this.colorArray.length];    
          arr.push(wma);
        }
    
        this.wmaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Wma[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.wmaArray.length; i++) {
          const wma = {...this.wmaArray[i]};
          wma.style.color = inp[i%inp.length];
          wma.id = sid + i;  
          arr.push(wma);
        }
  
        this.wmaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Wma[]>();

  protected wmaArray: Wma[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.wmaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const wma = createWma(
      this.startId + this.wmaArray.length,
      showStyle,
      this.getLastLength() + 5,
      this.defaultBarComponent);

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
      const sid = this.startId;
      for (let j = i; j < this.wmaArray.length; ++j) {
        this.wmaArray[j].id = sid + j;
      }
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
