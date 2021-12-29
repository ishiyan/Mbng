import { Component, Input } from '@angular/core';

import { SyntheticDataKind } from './synthetic-data-kind.enum';
import { TemporalEntityKind } from '../entities/temporal-entity-kind.enum';
import { SyntheticDataParameters } from './synthetic-data-parameters';

@Component({
  selector: 'mb-data-generators-synthetic-data-parameters',
  templateUrl: './synthetic-data-parameters.component.html',
  styleUrls: ['./synthetic-data-parameters.component.scss']
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
    return this.syntheticDataParameters.temporalEntityKind === TemporalEntityKind.Ohlcv;
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

