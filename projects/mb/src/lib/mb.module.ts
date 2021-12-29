import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { KatexModule } from './katex/katex.module';
// import { MathJaxModule } from './math-jax/math-jax.module';
import { SvgViewerModule } from './svg-viewer/svg-viewer.module';
import { SnackBarModule } from './snack-bar/snack-bar.module';
import { ColorsModule } from './colors/colors.module';
import { GeneratorsModule } from './data/generators/generators.module';
import { TradingModule } from './trading/trading.module';
import { ChartsModule } from './charts/charts.module';

@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule,
    KatexModule,
    // MathJaxModule,
    SvgViewerModule,
    SnackBarModule,
    ColorsModule,
    GeneratorsModule,
    TradingModule,
    ChartsModule
  ],
  exports: [
    MaterialModule,
    KatexModule,
    // MathJaxModule,
    SvgViewerModule,
    SnackBarModule,
    ColorsModule,
    GeneratorsModule,
    TradingModule,
    ChartsModule
  ]
})
export class MbModule { }
