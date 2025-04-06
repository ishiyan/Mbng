import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { KaufmanAdaptiveMovingAverageLengthParams, KaufmanAdaptiveMovingAverageSmoothingFactorParams } from 'mb';

import { KamaLengthInput, KamaSmoothingFactorInput } from './kama-input.interface';
import { Kama } from './kama.interface';
import { KamaParamsComponent } from './kama-params.component';

const guardLength = (object: any): object is KaufmanAdaptiveMovingAverageLengthParams => 'fastestLength' in object;

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createLengthKama = (sid: number, showStyle: boolean,
  eratioLen: number, fastLen: number, slowLen: number,
  comp?: BarComponent): Kama => {
  const params = {
    efficiencyRatioLength: eratioLen,
    fastestLength: fastLen, slowestLength: slowLen,
    barComponent: comp
  };
  return {
    id: sid,
    params: params,
    style: createStyle(),
    showStyle: showStyle
  };
};

const createAlphaKama = (sid: number, showStyle: boolean,
  eratioLen: number, sfFast: number, sfSlow: number,
  comp?: BarComponent): Kama => {
  const params = {
    efficiencyRatioLength: eratioLen,
    fastestSmoothingFactor: sfFast, slowestSmoothingFactor: sfSlow,
    barComponent: comp
  };
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
  selector: 'app-kama-list',
  templateUrl: './kama-list.component.html',
  styleUrls: ['./kama-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    KamaParamsComponent
  ]
})
export class KamaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initialLength = input<KamaLengthInput>();

  /** Specifies the initial indicator array. */
  readonly initialSmoothingFactor = input<KamaSmoothingFactorInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initialLength();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Kama[] = [];

        for (let i = 0; i < init.efficiencyRatioLength.length; i++) {
          const kama = createLengthKama(sid + i, init.showStyle,
            init.efficiencyRatioLength[i], init.fastestLength, init.slowestLength,
            init.barComponent);
          kama.style.color = this.colorArray[i%this.colorArray.length];
          arr.push(kama);
        }
    
        this.kamaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const init = this.initialSmoothingFactor();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Kama[] = [];

        for (let i = 0; i < init.efficiencyRatioLength.length; i++) {
          const kama = createAlphaKama(sid + i, init.showStyle,
            init.efficiencyRatioLength[i], init.fastestSmoothingFactor, init.slowestSmoothingFactor,
            init.barComponent);
          kama.style.color = this.colorArray[i%this.colorArray.length];    
          arr.push(kama);
        }
        
        this.kamaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Kama[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.kamaArray.length; i++) {
          const kama = {...this.kamaArray[i]};
          kama.style.color = inp[i%inp.length];
          kama.id = sid + i;
          arr.push(kama);
        }
  
        this.kamaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Kama[]>();

  protected kamaArray: Kama[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.kamaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const kama = createLengthKama(
      this.startId + this.kamaArray.length,
      showStyle,
      this.getLastLength() + 5,
      2,
      30,
      this.defaultBarComponent);

    if (showStyle) {
      kama.style.color = this.colorArray[this.kamaArray.length%this.colorArray.length];
    }

    this.kamaArray.push(kama);
    this.kamaArray = [...this.kamaArray];
    this.notify();
  }

  protected updated(kama: Kama): void {
    const i = this.getIndex(kama);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(kama: Kama): void {
    const i = this.getIndex(kama);
    if (i >= 0) {
      this.kamaArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.kamaArray.length; ++j) {
        this.kamaArray[j].id = sid + j;
      }
      this.kamaArray = [...this.kamaArray];
      this.notify();
    }
  }

  private getLastLength(): number {
    const last = this.kamaArray.length - 1;
    if (last < 0) {
      return 0;
    }

    if (guardLength(this.kamaArray[last].params)) {
      const p = this.kamaArray[last].params as KaufmanAdaptiveMovingAverageLengthParams;
      return p.efficiencyRatioLength;
    } else {
      const p = this.kamaArray[last].params as KaufmanAdaptiveMovingAverageSmoothingFactorParams;
      return p.efficiencyRatioLength;
    }
  }

  private getShowStyle(): boolean {
    if (this.kamaArray.length <= 0) {
      return false;
    }

    return this.kamaArray[0].showStyle;
  }

  private getIndex(kama: Kama): number {
    for (let i = 0; i < this.kamaArray.length; i++) {
      const el = this.kamaArray[i];
      if (el === kama) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.kamaArray);
    }
  }
}
