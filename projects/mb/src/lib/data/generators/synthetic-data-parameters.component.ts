import { Component, Input } from '@angular/core';

import { SyntheticDataKind } from './synthetic-data-kind.enum';
import { TemporalEntityKind } from '../entities/temporal-entity-kind.enum';
import { SyntheticDataParameters } from './synthetic-data-parameters';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { NgFor, NgClass } from '@angular/common';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ChirpParametersComponent } from './chirp/chirp-parameters.component';
import { ExtendedModule } from '@angular/flex-layout/extended';
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
    imports: [MatButtonToggleGroup, NgFor, MatButtonToggle, MatAccordion, MatExpansionPanel, MatFormField, FormsModule, MatInput, MatHint, ChirpParametersComponent, NgClass, ExtendedModule, FractionalBrownianMotionParametersComponent, GeometricBrownianMotionParametersComponent, SawtoothParametersComponent, SquareParametersComponent, SinusoidalParametersComponent, WaveformParametersComponent, TimeParametersComponent, OhlcvParametersComponent, QuoteParametersComponent, TradeParametersComponent]
})
export class SyntheticDataParametersComponent {
  @Input() syntheticDataParameters!: SyntheticDataParameters;
  readonly dataKinds: string[] = Object.values(SyntheticDataKind);

  syntheticDataKind: SyntheticDataKind = SyntheticDataKind.FractionalBrownianMotion;

  public dataKindChanged(value: SyntheticDataKind): void {
    this.syntheticDataParameters.syntheticDataKind = value;
  }

  public get isFbm(): boolean {
    return this.syntheticDataParameters.syntheticDataKind === SyntheticDataKind.FractionalBrownianMotion;
  }

  public get isGbm(): boolean {
    return this.syntheticDataParameters.syntheticDataKind === SyntheticDataKind.GeometricBrownianMotion;
  }

  public get isChirp(): boolean {
    return this.syntheticDataParameters.syntheticDataKind === SyntheticDataKind.Chirp;
  }

  public get isSawtooth(): boolean {
    return this.syntheticDataParameters.syntheticDataKind === SyntheticDataKind.Sawtooth;
  }

  public get isSquare(): boolean {
    return this.syntheticDataParameters.syntheticDataKind === SyntheticDataKind.Square;
  }

  public get isSinusoid(): boolean {
    return this.syntheticDataParameters.syntheticDataKind === SyntheticDataKind.Sinusoid;
  }

  public get isMultiSinusoid(): boolean {
    return this.syntheticDataParameters.syntheticDataKind === SyntheticDataKind.MultiSinusoid;
  }

  public get isOhlcv(): boolean {
    return this.syntheticDataParameters.temporalEntityKind === TemporalEntityKind.Bar;
  }

  public get isQuote(): boolean {
    return this.syntheticDataParameters.temporalEntityKind === TemporalEntityKind.Quote;
  }

  public get isTrade(): boolean {
    return this.syntheticDataParameters.temporalEntityKind === TemporalEntityKind.Trade;
  }

  public get isScalar(): boolean {
    return this.syntheticDataParameters.temporalEntityKind === TemporalEntityKind.Scalar;
  }
}

