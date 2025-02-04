import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';

import { SmaInput } from './sma-input.interface';
import { Sma } from './sma.interface';
import { SmaParamsComponent } from './sma-params.component';

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createSma = (sid: number, showStyle: boolean, len: number, comp?: BarComponent): Sma => {
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
  selector: 'app-sma-list',
  templateUrl: './sma-list.component.html',
  styleUrls: ['./sma-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    SmaParamsComponent
 ]
})
export class SmaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initial = input<SmaInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Sma[] = [];

        for (let i = 0; i < init.length.length; i++) {
          const sma = createSma(sid + i, init.showStyle, init.length[i], init.barComponent);
          sma.style.color = this.colorArray[i%this.colorArray.length];    
          arr.push(sma);
        }
    
        this.smaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Sma[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.smaArray.length; i++) {
          const sma = {...this.smaArray[i]};
          sma.style.color = inp[i%inp.length];
          sma.id = sid + i;  
          arr.push(sma);
        }
  
        this.smaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Sma[]>();

  protected smaArray: Sma[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.smaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const sma = createSma(
      this.startId + this.smaArray.length,
      showStyle,
      this.getLastLength() + 5,
      this.defaultBarComponent);

    if (showStyle) {
      sma.style.color = this.colorArray[this.smaArray.length%this.colorArray.length];
    }

    this.smaArray.push(sma);
    this.smaArray = [...this.smaArray];
    this.notify();
  }

  protected updated(sma: Sma): void {
    const i = this.getIndex(sma);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(sma: Sma): void {
    const i = this.getIndex(sma);
    if (i >= 0) {
      this.smaArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.smaArray.length; ++j) {
        this.smaArray[j].id = sid + j;
      }
      this.smaArray = [...this.smaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.smaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    return this.smaArray[last].params.length;
  }

  private getShowStyle(): boolean {
    if (this.smaArray.length <= 0) {
      return false;
    }

    return this.smaArray[0].showStyle;
  }

  private getIndex(sma: Sma): number {
    for (let i = 0; i < this.smaArray.length; i++) {
      const el = this.smaArray[i];
      if (el === sma) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.smaArray);
    }
  }
}
