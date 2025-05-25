import { Component, ChangeDetectionStrategy, AfterViewInit, output, input, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

import { BarComponent } from 'mb';
import { LineStyle } from 'mb';
import { HilbertTransformerCycleEstimatorType } from 'mb';
import { HilbertTransformerCycleEstimatorParams } from 'mb';

import { HtceInput } from './htce-input.interface';
import { Htce } from './htce.interface';
import { HtceParamsComponent } from './htce-params.component';

const createStyle = (): LineStyle => {
  const style = new LineStyle();
  style.color = '';
  style.width = 1.5;
  style.dash = '';
  style.interpolation = 'camullRom';
  return style;
};

const createHtce = (sid: number, showStyle: boolean,
  estimatorType: HilbertTransformerCycleEstimatorType, 
  params: HilbertTransformerCycleEstimatorParams,
  comp?: BarComponent): Htce => {
  if (comp === undefined) {
    comp = BarComponent.Median;
  }
  return {
    id: sid,
    estimatorType: estimatorType,
    params: params,
    barComponent: comp,
    style: createStyle(),
    showStyle: showStyle
  };
};

function inc(n: number): number {
  return n === 1000 ? 0 : 1000;
}

@Component({
  selector: 'app-htce-list',
  templateUrl: './htce-list.component.html',
  styleUrls: ['./htce-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMiniFabButton,
    HtceParamsComponent
  ]
})
export class HtceListComponent implements AfterViewInit {

  /** Specifies the initial indicator array. */
  readonly initial = input<HtceInput>();
 
  /** Specifies the input colors. */
  readonly colors = input<string[]>();
  
  constructor() {
    effect(() => {
      const init = this.initial();
      if (init) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Htce[] = [];

        for (let i = 0; i < init.params!.length; i++) {
          const htce = createHtce(sid + i, init.showStyle,
            init.estimatorType[i],
            init.params[i],
            init.barComponent);
          htce.style.color = this.colorArray[i%this.colorArray.length];
          arr.push(htce);
        }
    
        this.htceArray = arr;
        this.defaultBarComponent = init.barComponent;
      }
    });
    effect(() => {
      const inp = this.colors();
      if (inp && inp.length > 0) {
        this.startId = inc(this.startId);
        const sid = this.startId;
        const arr: Htce[] = [];
        this.colorArray = inp;
  
        for (let i = 0; i < this.htceArray.length; i++) {
          const htce = {...this.htceArray[i]};
          htce.style.color = inp[i%inp.length];
          htce.id = sid + i;
          arr.push(htce);
        }
  
        this.htceArray = arr;
      }
    });
  }

  /** Event emitted when the indicator has been removed by the user. */
  readonly changed = output<Htce[]>();

  protected htceArray: Htce[] = [];
  protected colorArray = ['#ff0000'];

  private startId = 0;
  private initialized = false;
  private defaultBarComponent?: BarComponent;
  
  ngAfterViewInit() {
    this.initialized = true;
    this.changed.emit(this.htceArray);
  }

  protected add(): void {
    const showStyle = this.getShowStyle();
    const p = this.getLastParams();
    let l = p.smoothingLength++;
    if (l > 4) {
      l = 2;
    }    
    const pnew = {
      smoothingLength: l,
      alphaEmaQuadratureInPhase: p.alphaEmaQuadratureInPhase,
      alphaEmaPeriod: p.alphaEmaPeriod };
    const htce = createHtce(
      this.startId + this.htceArray.length,
      showStyle,
      HilbertTransformerCycleEstimatorType.HomodyneDiscriminator,
      pnew,
      this.defaultBarComponent);
    if (showStyle) {
      htce.style.color = this.colorArray[this.htceArray.length%this.colorArray.length];
    }

    this.htceArray.push(htce);
    this.htceArray = [...this.htceArray];
    this.notify();
  }

  protected updated(htce: Htce): void {
    const i = this.getIndex(htce);
    if (i >= 0) {
      this.notify();
    }
  }

  protected removed(htce: Htce): void {
    const i = this.getIndex(htce);
    if (i >= 0) {
      this.htceArray.splice(i, 1);
      const sid = this.startId;
      for (let j = i; j < this.htceArray.length; ++j) {
        this.htceArray[j].id = sid + j;
      }
      this.htceArray = [...this.htceArray];
      this.notify();
    }
  }

  private getLastParams(): HilbertTransformerCycleEstimatorParams {
    const last = this.htceArray.length - 1;
    if (last < 0) {
      return {smoothingLength: 4, alphaEmaQuadratureInPhase: 0.2,
        alphaEmaPeriod: 0.2 };
    }

    return this.htceArray[last].params;
  }

  private getShowStyle(): boolean {
    if (this.htceArray.length <= 0) {
      return false;
    }

    return this.htceArray[0].showStyle;
  }

  private getIndex(htce: Htce): number {
    for (let i = 0; i < this.htceArray.length; i++) {
      const el = this.htceArray[i];
      if (el === htce) {
        return i;
      }
    }

    return -1;
  }

  private notify() {
    if ( this.initialized) {
      this.changed.emit(this.htceArray);
    }
  }
}
