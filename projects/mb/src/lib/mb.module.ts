import { NgModule } from '@angular/core';


import { KatexModule } from './katex/katex.module';
// import { MathJaxModule } from './math-jax/math-jax.module';
// import { SvgViewerModule } from './svg-viewer/svg-viewer.module';
// import { SnackBarModule } from './snack-bar/snack-bar.module';

import { GeneratorsModule } from './data/generators/generators.module';

import { ChartsModule } from './charts/charts.module';

@NgModule({
  declarations: [
  ],
  imports: [
    KatexModule,
    // MathJaxModule,
    // SvgViewerModule,
    // SnackBarModule,
    GeneratorsModule,
    ChartsModule
],
  exports: [
    KatexModule,
    // MathJaxModule,
    // SvgViewerModule,
    // SnackBarModule,
    GeneratorsModule,
    ChartsModule
]
})
export class MbModule { }
