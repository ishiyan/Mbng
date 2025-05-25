import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { MesaAdaptiveMovingAverageLengthParams, MesaAdaptiveMovingAverageSmoothingFactorParams } from 'mb';
import { HilbertTransformerCycleEstimatorParams } from 'mb';

import { MamaLengthInput, MamaSmoothingFactorInput } from './mama-input.interface';
import { Mama } from './mama.interface';
import { MamaParamsComponent } from './mama-params.component';

const guardLength = (object: any): object is MesaAdaptiveMovingAverageLengthParams => 'fastLength' in object;

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createLengthMama = (sid: number, showStyle: boolean,
  estimatorParams: HilbertTransformerCycleEstimatorParams, fastLen: number, slowLen: number,
  comp?: BarComponent): Mama => {
  const params = {
    estimatorParams: estimatorParams,
    fastLimitLength: fastLen, slowLimitLength: slowLen,
    barComponent: comp
  };
  return {
    id: sid,
    params: params,
    style: createStyle(),
    showStyle: showStyle
  };
};

const createAlphaMama = (sid: number, showStyle: boolean,
  estimatorParams: HilbertTransformerCycleEstimatorParams, sfFast: number, sfSlow: number,
  comp?: BarComponent): Mama => {
  const params = {
    estimatorParams: estimatorParams,
    fastLimitSmoothingFactor: sfFast, slowLimitSmoothingFactor: sfSlow,
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
  selector: 'app-mama-list',
  templateUrl: './mama-list.component.html',
  styleUrls: ['./mama-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    MamaParamsComponent
  ]
})
export class MamaListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initialLength = input<MamaLengthInput>();

  /** Specifies the initial indicator array. */
  readonly initialSmoothingFactor = input<MamaSmoothingFactorInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();

  constructor() {
    effect(() => {
      const init = this.initialLength();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Mama[] = [];

        for (let i = 0; i < init.estimatorParams!.length; i++) {
          const mama = createLengthMama(sid + i, init.showStyle,
            init.estimatorParams![i], init.fastLimitLength, init.slowLimitLength,
            init.barComponent);
          mama.style.color = this.colorArray[i%this.colorArray.length];
          arr.push(mama);
        }
    
        this.mamaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const init = this.initialSmoothingFactor();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Mama[] = [];

        for (let i = 0; i < init.estimatorParams!.length; i++) {
          const mama = createAlphaMama(sid + i, init.showStyle,
            init.estimatorParams![i], init.fastLimitSmoothingFactor, init.slowLimitSmoothingFactor,
            init.barComponent);
          mama.style.color = this.colorArray[i%this.colorArray.length];    
          arr.push(mama);
        }
        
        this.mamaArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Mama[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.mamaArray.length; i++) {
          const mama = {...this.mamaArray[i]};
          mama.style.color = inp[i%inp.length];
          mama.id = sid + i;
          arr.push(mama);
        }
  
        this.mamaArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Mama[]>();

  protected mamaArray: Mama[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;

  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.mamaArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const p = this.getLastParams();
    const pnew = {
      smoothingLength: p.smoothingLength + 5,
      alphaEmaQuadratureInPhase: p.alphaEmaQuadratureInPhase,
      alphaEmaPeriod: p.alphaEmaPeriod };
    const mama = createLengthMama(
      this.startId + this.mamaArray.length,
      showStyle,
      pnew,
      2,
      30,
      this.defaultBarComponent);

    if (showStyle) {
      mama.style.color = this.colorArray[this.mamaArray.length%this.colorArray.length];
    }

    this.mamaArray.push(mama);
    this.mamaArray = [...this.mamaArray];
    this.notify();
  }

  protected updated(mama: Mama): void {
    const i = this.getIndex(mama);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(mama: Mama): void {
    const i = this.getIndex(mama);
    if (i >= 0) {
      this.mamaArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.mamaArray.length; ++j) {
        this.mamaArray[j].id = sid + j;
      }
      this.mamaArray = [...this.mamaArray];
      this.notify();
    }
  }

  private getLastParams(): HilbertTransformerCycleEstimatorParams {
    const last = this.mamaArray.length - 1;
    if (last < 0) {
      return {smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2,
        alphaEmaPeriod: 0.2 };
    }

    if (guardLength(this.mamaArray[last].params)) {
      const p = this.mamaArray[last].params as MesaAdaptiveMovingAverageLengthParams;
      return p.estimatorParams!;
    } else {
      const p = this.mamaArray[last].params as MesaAdaptiveMovingAverageSmoothingFactorParams;
      return p.estimatorParams!;
    }
  }

  private getShowStyle(): boolean {
    if (this.mamaArray.length <= 0) {
      return false;
    }

    return this.mamaArray[0].showStyle;
  }

  private getIndex(mama: Mama): number {
    for (let i = 0; i < this.mamaArray.length; i++) {
      const el = this.mamaArray[i];
      if (el === mama) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.mamaArray);
    }
  }
}
