import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MaterialModule } from '../../material/material.module';
import { KatexModule } from '../../katex/katex.module';
import { SvgViewerModule } from '../../svg-viewer/svg-viewer.module';
import { TradingModule } from '../../trading/trading.module';

import { SyntheticDataParametersComponent } from './synthetic-data-parameters.component';
import { SyntheticDataService } from './synthetic-data.service';
import { TimeParametersComponent } from './time-parameters.component';
import { WaveformParametersComponent } from './waveform-parameters.component';
import { OhlcvParametersComponent } from './ohlcv-parameters.component';
import { QuoteParametersComponent } from './quote-parameters.component';
import { TradeParametersComponent } from './trade-parameters.component';
import { ChirpParametersComponent } from './chirp/chirp-parameters.component';
import { SawtoothParametersComponent } from './sawtooth/sawtooth-parameters.component';
import { SquareParametersComponent } from './square/square-parameters.component';
import { SinusoidalParametersComponent } from './sinusoidal/sinusoidal-parameters.component';
import { GeometricBrownianMotionParametersComponent } from './geometric-brownian-motion/geometric-brownian-motion-parameters.component';
// eslint-disable-next-line max-len
import { FractionalBrownianMotionParametersComponent } from './fractional-brownian-motion/fractional-brownian-motion-parameters.component';
// eslint-disable-next-line max-len

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonToggleModule,
        MaterialModule,
        KatexModule,
        SvgViewerModule,
        TradingModule
    ],
    exports: [
        TimeParametersComponent,
        WaveformParametersComponent,
        OhlcvParametersComponent,
        QuoteParametersComponent,
        TradeParametersComponent,
        FractionalBrownianMotionParametersComponent,
        GeometricBrownianMotionParametersComponent,
        ChirpParametersComponent,
        SawtoothParametersComponent,
        SquareParametersComponent,
        SinusoidalParametersComponent,
        SyntheticDataParametersComponent
    ],
    declarations: [
        TimeParametersComponent,
        WaveformParametersComponent,
        OhlcvParametersComponent,
        QuoteParametersComponent,
        TradeParametersComponent,
        FractionalBrownianMotionParametersComponent,
        GeometricBrownianMotionParametersComponent,
        ChirpParametersComponent,
        SawtoothParametersComponent,
        SquareParametersComponent,
        SinusoidalParametersComponent,
        SyntheticDataParametersComponent
    ],
    providers: [
        SyntheticDataService
    ]
})
export class GeneratorsModule { }
