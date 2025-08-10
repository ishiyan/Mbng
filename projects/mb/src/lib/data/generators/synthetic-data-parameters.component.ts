import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { MatInput } from '@angular/material/input';
import { ExtendedModule } from '@angular/flex-layout/extended';

import { SyntheticDataKind } from './synthetic-data-kind.enum';
import { TemporalEntityKind } from '../entities/temporal-entity-kind.enum';
import { SyntheticDataParameters } from './synthetic-data-parameters';
import { ChirpParametersComponent } from './chirp/chirp-parameters.component';
import { FractionalBrownianMotionParametersComponent } from './fractional-brownian-motion/fractional-brownian-motion-parameters.component';
import { GeometricBrownianMotionParametersComponent } from './geometric-brownian-motion/geometric-brownian-motion-parameters.component';
import { SawtoothParametersComponent } from './sawtooth/sawtooth-parameters.component';
import { SquareParametersComponent } from './square/square-parameters.component';
import { SinusoidalParametersComponent } from './sinusoidal/sinusoidal-parameters.component';
import { WaveformParametersComponent } from './waveform-parameters.component';
import { TimeParametersComponent } from './time-parameters.component';
import { OhlcvParametersComponent } from './ohlcv-parameters.component';
import { QuoteParametersComponent } from './quote-parameters.component';
import { TradeParametersComponent } from './trade-parameters.component';

@Component({
  selector: 'mb-data-generators-synthetic-data-parameters',
  templateUrl: './synthetic-data-parameters.component.html',
  styleUrls: ['./synthetic-data-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    FormsModule,
    MatFormField,
    MatHint,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatAccordion,
    MatExpansionPanel,
    MatInput,
    ExtendedModule,
    ChirpParametersComponent,
    FractionalBrownianMotionParametersComponent,
    GeometricBrownianMotionParametersComponent,
    SawtoothParametersComponent,
    SquareParametersComponent,
    SinusoidalParametersComponent,
    WaveformParametersComponent,
    TimeParametersComponent,
    OhlcvParametersComponent,
    QuoteParametersComponent,
    TradeParametersComponent
  ]
})
export class SyntheticDataParametersComponent {
  //syntheticDataParameters = input.required<SyntheticDataParameters>();
  syntheticDataParameters = input<SyntheticDataParameters>();
  params: SyntheticDataParameters = new SyntheticDataParameters();

  constructor() {
    effect(() => {
      this.params = this.syntheticDataParameters() ?? new SyntheticDataParameters();
    });  
  }

  readonly dataKinds: string[] = Object.values(SyntheticDataKind);

  syntheticDataKind: SyntheticDataKind = SyntheticDataKind.FractionalBrownianMotion;

  public dataKindChanged(value: SyntheticDataKind): void {
    this.params.syntheticDataKind = value;
  }

  public get isFbm(): boolean {
    return this.params.syntheticDataKind === SyntheticDataKind.FractionalBrownianMotion;
  }

  public get isGbm(): boolean {
    return this.params.syntheticDataKind === SyntheticDataKind.GeometricBrownianMotion;
  }

  public get isChirp(): boolean {
    return this.params.syntheticDataKind === SyntheticDataKind.Chirp;
  }

  public get isSawtooth(): boolean {
    return this.params.syntheticDataKind === SyntheticDataKind.Sawtooth;
  }

  public get isSquare(): boolean {
    return this.params.syntheticDataKind === SyntheticDataKind.Square;
  }

  public get isSinusoid(): boolean {
    return this.params.syntheticDataKind === SyntheticDataKind.Sinusoid;
  }

  public get isMultiSinusoid(): boolean {
    return this.params.syntheticDataKind === SyntheticDataKind.MultiSinusoid;
  }

  public get isOhlcv(): boolean {
    return this.params.temporalEntityKind === TemporalEntityKind.Bar;
  }

  public get isQuote(): boolean {
    return this.params.temporalEntityKind === TemporalEntityKind.Quote;
  }

  public get isTrade(): boolean {
    return this.params.temporalEntityKind === TemporalEntityKind.Trade;
  }

  public get isScalar(): boolean {
    return this.params.temporalEntityKind === TemporalEntityKind.Scalar;
  }
}

