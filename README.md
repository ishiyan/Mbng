# Mbng

## Projects in this monorepo

| Project     | Description |
| ----------- | ----------- |
| `mb`        | A library with shared components and widgets |
| `proeftuin` | A testing ground for the `mb` library |
| `notes`     | An interactive assorted notes for various topics |

## temp v18

[migration](https://angular.dev/update-guide?v=17.0-18.0&l=3)

```bash
** Executing migrations of package '@angular/cdk' **

❯ Updates the Angular CDK to v18.
    
      ✓  Updated Angular CDK to version 18
    
  Migration completed (No changes made).

** Executing migrations of package '@angular/core' **

❯ Updates two-way bindings that have an invalid expression to use the longform expression instead.
  Migration completed (No changes made).

❯ Replace deprecated HTTP related modules with provider functions.
UPDATE projects/notes/src/app/app.module.ts (1354 bytes)
UPDATE projects/mb/src/lib/svg-viewer/svg-viewer.module.ts (436 bytes)
UPDATE projects/proeftuin/src/app/app.module.ts (1469 bytes)
UPDATE projects/proeftuin/src/app/shared/theme-picker/theme-manager.service.spec.ts (2063 bytes)
  Migration completed (4 files modified).

❯ Updates calls to afterRender with an explicit phase to the new API.
  Migration completed (No changes made).

** Executing migrations of package '@angular/material' **

❯ Updates Angular Material to v18.
    
      ✓  Updated Angular Material to version 18
   
UPDATE projects/notes/src/styles.scss (4445 bytes)
UPDATE projects/proeftuin/src/assets/themes/brown-green.css (80818 bytes)
UPDATE projects/proeftuin/src/assets/themes/deeppurple-amber.css (92633 bytes)
UPDATE projects/proeftuin/src/assets/themes/indigo-pink.css (92363 bytes)
UPDATE projects/proeftuin/src/assets/themes/pink-bluegrey.css (93230 bytes)
UPDATE projects/proeftuin/src/assets/themes/purple-green.css (93244 bytes)
UPDATE projects/proeftuin/src/assets/themes/yellow-amber.css (93519 bytes)
UPDATE projects/proeftuin/src/styles.scss (1546 bytes)
UPDATE projects/proeftuin/src/themes/deeppurple-amber.scss (1001 bytes)
UPDATE projects/proeftuin/src/themes/indigo-pink.scss (995 bytes)
UPDATE projects/proeftuin/src/themes/pink-bluegrey.scss (996 bytes)
UPDATE projects/proeftuin/src/themes/purple-green.scss (994 bytes)
UPDATE projects/proeftuin/src/themes/yellow-amber.scss (1052 bytes)
  Migration completed (13 files modified).
```

## temp v19

```bash
** Optional migrations of package '@angular/cli' **

This package has 1 optional migration that can be executed.
Optional migrations may be skipped and executed after the update process, if preferred.

 Select the migrations that you'd like to run [use-application-builder] Migrate application projects to the new build system. 
(https://angular.dev/tools/cli/build-system-migration)

❯ Migrate application projects to the new build system.
  Application projects that are using the '@angular-devkit/build-angular' package's 'browser' and/or 'browser-esbuild' builders will be migrated to use the new 'application' builder.
  You can read more about this, including known issues and limitations, here: https://angular.dev/tools/cli/build-system-migration
    The output location of the browser build has been updated from "dist/notes" to "dist/notes/browser". You might need to adjust your deployment pipeline or, as an alternative, set outputPath.browser to "" in order to maintain the previous functionality.
    The output location of the browser build has been updated from "dist/proeftuin" to "dist/proeftuin/browser". You might need to adjust your deployment pipeline or, as an alternative, set outputPath.browser to "" in order to maintain the previous functionality.
UPDATE angular.json (9004 bytes)
UPDATE tsconfig.json (1246 bytes)
  Migration completed (2 files modified).

** Executing migrations of package '@angular/cdk' **

❯ Updates the Angular CDK to v19.
    
      ✓  Updated Angular CDK to version 19
    
  Migration completed (No changes made).

** Executing migrations of package '@angular/core' **

❯ Updates non-standalone Directives, Component and Pipes to 'standalone:false' and removes 'standalone:true' from those who are standalone.
UPDATE projects/notes/src/app/shared/note-card/note-card.component.ts (318 bytes)
UPDATE projects/notes/src/app/shared/note-list/note-list.component.ts (2021 bytes)
UPDATE projects/mb/src/lib/katex/katex.directive.ts (857 bytes)
UPDATE projects/mb/src/lib/katex/katex.component.ts (537 bytes)
UPDATE projects/mb/src/lib/katex/katex-display.component.ts (1799 bytes)
UPDATE projects/mb/src/lib/katex/katex-inline.component.ts (1239 bytes)
UPDATE projects/notes/src/app/shared/data/series-card/series-card.component.ts (1183 bytes)
UPDATE projects/notes/src/app/shared/data/filesize/filesize.pipe.ts (611 bytes)
UPDATE projects/notes/src/app/shared/data/bar-series/bar-series-load/bar-series-load.component.ts (2062 bytes)
UPDATE projects/notes/src/app/shared/data/bar-series/bar-series-list/bar-series-list.component.ts (797 bytes)
UPDATE projects/notes/src/app/shared/data/scalar-series/scalar-series-load/scalar-series-load.component.ts (1308 bytes)
UPDATE projects/notes/src/app/shared/data/scalar-series/scalar-series-list/scalar-series-list.component.ts (818 bytes)
UPDATE projects/notes/src/app/shared/data/trade-series/trade-series-load/trade-series-load.component.ts (1477 bytes)
UPDATE projects/notes/src/app/shared/data/trade-series/trade-series-list/trade-series-list.component.ts (831 bytes)
UPDATE projects/notes/src/app/shared/data/quote-series/quote-series-load/quote-series-load.component.ts (1857 bytes)
UPDATE projects/notes/src/app/shared/data/quote-series/quote-series-list/quote-series-list.component.ts (811 bytes)
UPDATE projects/notes/src/app/shared/data/series-list/series-list.component.ts (250 bytes)
UPDATE projects/notes/src/app/shared/katex-settings/katex-settings.component.ts (1022 bytes)
UPDATE projects/notes/src/app/shared/data/bar-series/bar-series-select/bar-series-select.component.ts (1488 bytes)
UPDATE projects/notes/src/app/notes/indicators/tim-tillson/t3ema/t3ema.component.ts (8262 bytes)
UPDATE projects/notes/src/app/notes/indicators/tim-tillson/t3ema/t3ema-params.component.ts (1378 bytes)
UPDATE projects/notes/src/app/notes/indicators/tim-tillson/t3ema/t3ema-list.component.ts (4931 bytes)
UPDATE projects/notes/src/app/notes/indicators/tim-tillson/t2ema/t2ema.component.ts (8262 bytes)
UPDATE projects/notes/src/app/notes/indicators/tim-tillson/t2ema/t2ema-params.component.ts (1378 bytes)
UPDATE projects/notes/src/app/notes/indicators/tim-tillson/t2ema/t2ema-list.component.ts (4931 bytes)
UPDATE projects/notes/src/app/notes/indicators/patrick-mulloy/tema/tema.component.ts (8503 bytes)
UPDATE projects/notes/src/app/notes/indicators/patrick-mulloy/tema/tema-params.component.ts (1380 bytes)
UPDATE projects/notes/src/app/notes/indicators/patrick-mulloy/tema/tema-list.component.ts (4800 bytes)
UPDATE projects/notes/src/app/notes/indicators/patrick-mulloy/dema/dema.component.ts (8483 bytes)
UPDATE projects/notes/src/app/notes/indicators/patrick-mulloy/dema/dema-params.component.ts (1380 bytes)
UPDATE projects/notes/src/app/notes/indicators/patrick-mulloy/dema/dema-list.component.ts (4800 bytes)
UPDATE projects/notes/src/app/notes/indicators/trima/trima.component.ts (7760 bytes)
UPDATE projects/notes/src/app/notes/indicators/trima/trima-params.component.ts (1262 bytes)
UPDATE projects/notes/src/app/notes/indicators/trima/trima-list.component.ts (3485 bytes)
UPDATE projects/notes/src/app/notes/indicators/wma/wma.component.ts (7188 bytes)
UPDATE projects/notes/src/app/notes/indicators/wma/wma-params.component.ts (1230 bytes)
UPDATE projects/notes/src/app/notes/indicators/wma/wma-list.component.ts (3373 bytes)
UPDATE projects/notes/src/app/notes/indicators/ema/ema.component.ts (8132 bytes)
UPDATE projects/notes/src/app/notes/indicators/ema/ema-params.component.ts (1342 bytes)
UPDATE projects/notes/src/app/notes/indicators/ema/ema-list.component.ts (4702 bytes)
UPDATE projects/notes/src/app/notes/indicators/sma/sma.component.ts (7577 bytes)
UPDATE projects/notes/src/app/notes/indicators/sma/sma-params.component.ts (1226 bytes)
UPDATE projects/notes/src/app/notes/indicators/sma/sma-list.component.ts (3373 bytes)
UPDATE projects/notes/src/app/notes/indicators/frequency-response/frequency-response.component.ts (1348 bytes)
UPDATE projects/notes/src/app/shared/data/scalar-series/scalar-series-select/scalar-series-select.component.ts (1530 bytes)
UPDATE projects/notes/src/app/shared/data/trade-series/trade-series-select/trade-series-select.component.ts (1516 bytes)
UPDATE projects/notes/src/app/shared/data/quote-series/quote-series-select/quote-series-select.component.ts (1516 bytes)
UPDATE projects/notes/src/app/shared/data/series-select/series-select.component.ts (3510 bytes)
UPDATE projects/notes/src/app/notes/data/linear-charting/linear-charting.component.ts (1618 bytes)
UPDATE projects/notes/src/app/app.component.ts (869 bytes)
UPDATE projects/mb/src/lib/math-jax/math-jax.directive.ts (2062 bytes)
UPDATE projects/mb/src/lib/math-jax/math-jax.component.ts (669 bytes)
UPDATE projects/proeftuin/src/app/shared/theme-picker/theme-picker.component.ts (2562 bytes)
UPDATE projects/proeftuin/src/app/shared/toolbar/toolbar.component.ts (854 bytes)
UPDATE projects/proeftuin/src/app/shared/footer/footer.component.ts (543 bytes)
UPDATE projects/proeftuin/src/app/tex/tex.component.ts (799 bytes)
UPDATE projects/proeftuin/src/app/tex/tex-list/tex-list.component.ts (392 bytes)
UPDATE projects/proeftuin/src/app/tex/tex-card/tex-card.component.ts (785 bytes)
UPDATE projects/proeftuin/src/app/d3/d3.component.ts (2004 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-1/sample-1.component.ts (796 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-2/sample-2.component.ts (241 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-3/sample-3.component.ts (241 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/sample-4.component.ts (241 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-5/sample-5.component.ts (241 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-6/sample-6.component.ts (241 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-7/sample-7.component.ts (241 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-8/sample-8.component.ts (241 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-1/barchart/barchart.component.ts (3589 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-2/brush-handles/brush-handles.component.ts (2896 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-2/brush-handles-2/brush-handles-2.component.ts (3347 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-2/click-to-recenter-brush/click-to-recenter-brush.component.ts (2900 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-2/click-to-recenter-brush-2/click-to-recenter-brush-2.component.ts (3361 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-2/click-to-select-all/click-to-select-all.component.ts (2555 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-3/brush-and-zoom-area-chart/brush-and-zoom-area-chart.component.ts (4666 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-arrow/d3tc-arrow.component.ts (1962 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-finance-time/d3tc-finance-time.component.ts (8649 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-candlesticks/d3tc-candlesticks.component.ts (2765 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-ohlc/d3tc-ohlc.component.ts (2565 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-close/d3tc-close.component.ts (2499 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-volume/d3tc-volume.component.ts (2611 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-brush/d3tc-brush.component.ts (5975 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-axis-annotations/d3tc-axis-annotations.component.ts (4492 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-crosshair/d3tc-crosshair.component.ts (4145 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-support-resistance/d3tc-support-resistance.component.ts (4634 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-trendlines/d3tc-trendlines.component.ts (4044 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-zooming/d3tc-zooming.component.ts (3420 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-feed/d3tc-feed.component.ts (5946 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-trade-arrows/d3tc-trade-arrows.component.ts (4063 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-4/d3tc-multiple-small-plots/d3tc-multiple-small-plots.component.ts (2794 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-5/hilbert-curve/hilbert-curve.component.ts (2565 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-5/hilbert-paths/hilbert-paths.component.ts (2671 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-5/hilbert-stocks/hilbert-stocks.component.ts (2136 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-7/d3tc-horizon-chart-interactive/d3tc-horizon-chart-interactive.component.ts (3390 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-7/d3tc-horizon-chart-bands/d3tc-horizon-chart-bands.component.ts (2032 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-7/d3tc-horizon-chart-single/d3tc-horizon-chart-single.component.ts (2688 bytes)
UPDATE projects/proeftuin/src/app/d3/d3-samples/sample-8/real-time-chart/real-time-chart.component.ts (3334 bytes)
UPDATE projects/proeftuin/src/app/mb/mb.component.ts (2004 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/ohlcv-chart-study/ohlcv-chart-study.component.ts (1121 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/synthetic-data/synthetic-data.component.ts (1633 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/instruments-table/instruments-table.component.ts (279 bytes)
UPDATE projects/mb/src/lib/svg-viewer/svg-viewer.component.ts (1111 bytes)
UPDATE projects/mb/src/lib/charts/frequency-response-chart/frequency-response-chart.component.ts (16699 bytes)
UPDATE projects/mb/src/lib/charts/historical-data-chart/historical-data-chart.component.ts (18076 bytes)
UPDATE projects/mb/src/lib/charts/historical-data-chart/historical-data-table.component.ts (3097 bytes)
UPDATE projects/mb/src/lib/charts/historical-data-chart/historical-data-download.component.ts (4101 bytes)
UPDATE projects/mb/src/lib/charts/linear-chart/linear-chart.component.ts (18475 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/ohlcv-chart.component.ts (44617 bytes)
UPDATE projects/mb/src/lib/charts/sparkline/sparkline.component.ts (4883 bytes)
UPDATE projects/mb/src/lib/charts/multiline/multiline.component.ts (11130 bytes)
UPDATE projects/mb/src/lib/charts/stackline/stackline.component.ts (11355 bytes)
UPDATE projects/mb/src/lib/charts/hierarchy-tree/sunburst/sunburst.component.ts (9214 bytes)
UPDATE projects/mb/src/lib/charts/hierarchy-tree/circlepack/circlepack.component.ts (9491 bytes)
UPDATE projects/mb/src/lib/charts/hierarchy-tree/icicle/icicle.component.ts (7992 bytes)
UPDATE projects/mb/src/lib/charts/hierarchy-tree/treemap/treemap.component.ts (8678 bytes)
UPDATE projects/mb/src/lib/charts/hierarchy-tree/voronoi/voronoi.component.ts (10948 bytes)
UPDATE projects/mb/src/lib/colors/swatches/swatches.component.ts (2149 bytes)
UPDATE projects/mb/src/lib/colors/swatches/swatches-select.component.ts (2716 bytes)
UPDATE projects/mb/src/lib/colors/picker/color-picker.component.ts (19184 bytes)
UPDATE projects/mb/src/lib/colors/picker/color-picker.directive.ts (2767 bytes)
UPDATE projects/mb/src/lib/colors/picker/color-picker-slider.directive.ts (2800 bytes)
UPDATE projects/mb/src/lib/data/entities/bar-component.component.ts (2154 bytes)
UPDATE projects/mb/src/lib/data/entities/quote-component.component.ts (2065 bytes)
UPDATE projects/mb/src/lib/data/generators/square/square-parameters.component.ts (668 bytes)
UPDATE projects/mb/src/lib/data/generators/sawtooth/sawtooth-parameters.component.ts (738 bytes)
UPDATE projects/mb/src/lib/data/generators/chirp/chirp-parameters.component.ts (819 bytes)
UPDATE projects/mb/src/lib/data/generators/sinusoidal/sinusoidal-parameters.component.ts (611 bytes)
UPDATE projects/mb/src/lib/data/generators/fractional-brownian-motion/fractional-brownian-motion-parameters.component.ts (1237 bytes)
UPDATE projects/mb/src/lib/data/generators/geometric-brownian-motion/geometric-brownian-motion-parameters.component.ts (1241 bytes)
UPDATE projects/mb/src/lib/data/generators/synthetic-data-parameters.component.ts (2336 bytes)
UPDATE projects/mb/src/lib/trading/time/business-day-calendar-description.component.ts (335 bytes)
UPDATE projects/mb/src/lib/data/generators/time-parameters.component.ts (1075 bytes)
UPDATE projects/mb/src/lib/data/generators/waveform-parameters.component.ts (761 bytes)
UPDATE projects/mb/src/lib/data/generators/ohlcv-parameters.component.ts (609 bytes)
UPDATE projects/mb/src/lib/data/generators/quote-parameters.component.ts (552 bytes)
UPDATE projects/mb/src/lib/data/generators/trade-parameters.component.ts (392 bytes)
UPDATE projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average-params.component.ts (2071 bytes)
UPDATE projects/mb/src/lib/trading/indicators/simple-moving-average/simple-moving-average-params-dialog.component.ts (1109 bytes)
UPDATE projects/mb/src/lib/trading/indicators/weighted-moving-average/weighted-moving-average-params.component.ts (2091 bytes)
UPDATE projects/mb/src/lib/trading/indicators/weighted-moving-average/weighted-moving-average-params-dialog.component.ts (1133 bytes)
UPDATE projects/mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average-params.component.ts (2111 bytes)
UPDATE projects/mb/src/lib/trading/indicators/triangular-moving-average/triangular-moving-average-params-dialog.component.ts (1157 bytes)
UPDATE projects/mb/src/lib/trading/indicators/exponential-moving-average/exponential-moving-average-params.component.ts (5223 bytes)
UPDATE projects/mb/src/lib/trading/indicators/exponential-moving-average/exponential-moving-average-params-dialog.component.ts (1560 bytes)
UPDATE projects/mb/src/lib/trading/indicators/statistics/variance/variance-params.component.ts (2224 bytes)
UPDATE projects/mb/src/lib/trading/indicators/statistics/variance/variance-params-dialog.component.ts (969 bytes)
UPDATE projects/mb/src/lib/trading/indicators/statistics/standard-deviation/standard-deviation-params.component.ts (2318 bytes)
UPDATE projects/mb/src/lib/trading/indicators/statistics/standard-deviation/standard-deviation-params-dialog.component.ts (1081 bytes)
UPDATE projects/mb/src/lib/trading/indicators/tim-tillson/t3-exponential-moving-average/t3-exponential-moving-average-params.component.ts (5817 bytes)
UPDATE projects/mb/src/lib/trading/indicators/tim-tillson/t3-exponential-moving-average/t3-exponential-moving-average-params-dialog.component.ts (1603 bytes)
UPDATE projects/mb/src/lib/trading/indicators/tim-tillson/t2-exponential-moving-average/t2-exponential-moving-average-params.component.ts (5817 bytes)
UPDATE projects/mb/src/lib/trading/indicators/tim-tillson/t2-exponential-moving-average/t2-exponential-moving-average-params-dialog.component.ts (1603 bytes)
UPDATE projects/mb/src/lib/trading/indicators/patrick-mulloy/double-exponential-moving-average/double-exponential-moving-average-params.component.ts (5348 bytes)
UPDATE projects/mb/src/lib/trading/indicators/patrick-mulloy/double-exponential-moving-average/double-exponential-moving-average-params-dialog.component.ts (1679 bytes)
UPDATE projects/mb/src/lib/trading/indicators/patrick-mulloy/triple-exponential-moving-average/triple-exponential-moving-average-params.component.ts (5348 bytes)
UPDATE projects/mb/src/lib/trading/indicators/patrick-mulloy/triple-exponential-moving-average/triple-exponential-moving-average-params-dialog.component.ts (1679 bytes)
UPDATE projects/mb/src/lib/trading/indicators/perry-kaufman/kaufman-adaptive-moving-average/kaufman-adaptive-moving-average-params.component.ts (5310 bytes)
UPDATE projects/mb/src/lib/trading/indicators/perry-kaufman/kaufman-adaptive-moving-average/kaufman-adaptive-moving-average-params-dialog.component.ts (1641 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/width-svg.component.ts (855 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/dash-svg.component.ts (871 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/line-svg.component.ts (964 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/line-width.component.ts (1784 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/line-dash.component.ts (2000 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/line-interpolation.component.ts (1994 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/color.component.ts (935 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/line-style.component.ts (1357 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/line-style-dialog.component.ts (886 bytes)
UPDATE projects/mb/src/lib/charts/ohlcv-chart/selector/line-style-selector.component.ts (1361 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/frequency-response/sample-1/sample-frequency-response-1.component.ts (1147 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/sparkline/sample-1/sample-sparkline-1.component.ts (955 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/sparkline/sample-2/sample-sparkline-2.component.ts (2673 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/sparkline/sample-3/sample-sparkline-3.component.ts (3113 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/multiline/sample-1/sample-multiline-1.component.ts (3234 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/stackline/sample-1/sample-stackline-1.component.ts (2750 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/sunburst/sample-1/sample-sunburst-1.component.ts (363 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/sunburst/sample-2/sample-sunburst-2.component.ts (8211 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/sunburst/sample-3/sample-sunburst-3.component.ts (8576 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/sunburst/sample-4/sample-sunburst-4.component.ts (8010 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/sunburst/sample-5/sample-sunburst-5.component.ts (5663 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/icicle/sample-1/sample-icicle-1.component.ts (355 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/icicle/sample-2/sample-icicle-2.component.ts (8781 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/icicle/sample-3/sample-icicle-3.component.ts (9146 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/icicle/sample-4/sample-icicle-4.component.ts (8579 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/icicle/sample-5/sample-icicle-5.component.ts (6299 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/treemap/sample-1/sample-treemap-1.component.ts (359 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/treemap/sample-2/sample-treemap-2.component.ts (13837 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/treemap/sample-3/sample-treemap-3.component.ts (14250 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/treemap/sample-4/sample-treemap-4.component.ts (13707 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/treemap/sample-5/sample-treemap-5.component.ts (11469 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/circlepack/sample-1/sample-circlepack-1.component.ts (371 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/circlepack/sample-2/sample-circlepack-2.component.ts (9929 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/circlepack/sample-3/sample-circlepack-3.component.ts (10295 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/circlepack/sample-4/sample-circlepack-4.component.ts (9728 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/circlepack/sample-5/sample-circlepack-5.component.ts (7568 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/voronoi/sample-1/sample-voronoi-1.component.ts (359 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/voronoi/sample-2/sample-voronoi-2.component.ts (14307 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/voronoi/sample-3/sample-voronoi-3.component.ts (14640 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/voronoi/sample-4/sample-voronoi-4.component.ts (14069 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/voronoi/sample-5/sample-voronoi-5.component.ts (11765 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-1/sample-swatches-1.component.ts (1045 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-2/sample-swatches-2.component.ts (2169 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-3/sample-swatches-3.component.ts (7705 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-4/sample-swatches-4.component.ts (1963 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-5/sample-swatches-5.component.ts (4187 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-6/sample-swatches-6.component.ts (1755 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-7/sample-swatches-7.component.ts (1527 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-8/sample-swatches-8.component.ts (1048 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-9/sample-swatches-9.component.ts (1917 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-10/sample-swatches-10.component.ts (7658 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/swatches/sample-11/sample-swatches-11.component.ts (1020 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/data-entities/sample-1/sample-data-entities-1.component.ts (590 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/data-entities/sample-2/sample-data-entities-2.component.ts (599 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/simple-moving-average/sample-1/sample-simple-moving-average-1.component.ts (1784 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/simple-moving-average/sample-2/sample-simple-moving-average-2.component.ts (1072 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/triangular-moving-average/sample-1/sample-triangular-moving-average-1.component.ts (1848 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/triangular-moving-average/sample-2/sample-triangular-moving-average-2.component.ts (1112 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/weighted-moving-average/sample-1/sample-weighted-moving-average-1.component.ts (1816 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/weighted-moving-average/sample-2/sample-weighted-moving-average-2.component.ts (1092 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/exponential-moving-average/sample-1/sample-exponential-moving-average-1.component.ts (4251 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/exponential-moving-average/sample-2/sample-exponential-moving-average-2.component.ts (1910 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/statistics/variance/sample-1/sample-variance-1.component.ts (1755 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/statistics/variance/sample-2/sample-variance-2.component.ts (1012 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/statistics/standard-deviation/sample-1/sample-standard-deviation-1.component.ts (1904 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/statistics/standard-deviation/sample-2/sample-standard-deviation-2.component.ts (1107 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/patrick-mulloy/double-exponential-moving-average/sample-1/sample-double-exponential-moving-average-1.component.ts (4522 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/patrick-mulloy/double-exponential-moving-average/sample-2/sample-double-exponential-moving-average-2.component.ts (2038 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/patrick-mulloy/triple-exponential-moving-average/sample-1/sample-triple-exponential-moving-average-1.component.ts (4522 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/patrick-mulloy/triple-exponential-moving-average/sample-2/sample-triple-exponential-moving-average-2.component.ts (2038 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/tim-tillson/t2-exponential-moving-average/sample-1/sample-t2-exponential-moving-average-1.component.ts (4589 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/tim-tillson/t2-exponential-moving-average/sample-2/sample-t2-exponential-moving-average-2.component.ts (2033 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/tim-tillson/t3-exponential-moving-average/sample-1/sample-t3-exponential-moving-average-1.component.ts (4589 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/trading/indicators/tim-tillson/t3-exponential-moving-average/sample-2/sample-t3-exponential-moving-average-2.component.ts (2033 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/ohlcv-chart-selector/sample-1/sample-ohlcv-chart-selector-1.component.ts (548 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/ohlcv-chart-selector/sample-2/sample-ohlcv-chart-selector-2.component.ts (552 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/ohlcv-chart-selector/sample-3/sample-ohlcv-chart-selector-3.component.ts (555 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/ohlcv-chart-selector/sample-4/sample-ohlcv-chart-selector-4.component.ts (541 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/ohlcv-chart-selector/sample-5/sample-ohlcv-chart-selector-5.component.ts (727 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/components/ohlcv-chart-selector/sample-6/sample-ohlcv-chart-selector-6.component.ts (727 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/instruments-table/table1/table1.component.ts (1821 bytes)
UPDATE projects/proeftuin/src/app/mb/mb-samples/instruments-table/table12/table12.component.ts (7108 bytes)
UPDATE projects/proeftuin/src/app/notes/notes.component.ts (2039 bytes)
UPDATE projects/proeftuin/src/app/notes/asset-management/fixed-mix/buckets/buckets.component.ts (241 bytes)
UPDATE projects/proeftuin/src/app/notes/asset-management/fixed-mix/buckets-interactive/buckets-interactive.component.ts (288 bytes)
UPDATE projects/proeftuin/src/app/notes/asset-management/fixed-mix/single/single.component.ts (8187 bytes)
UPDATE projects/proeftuin/src/app/notes/asset-management/fixed-mix/single-interactive/single-interactive.component.ts (284 bytes)
UPDATE projects/proeftuin/src/app/notes/asset-management/hierarchies/demo/demo.component.ts (3962 bytes)
UPDATE projects/proeftuin/src/app/notes/asset-management/hierarchies/industry-classifications/industry-classifications.component.ts (1204 bytes)
UPDATE projects/proeftuin/src/app/app.component.ts (365 bytes)
  Migration completed (247 files modified).

❯ Updates ExperimentalPendingTasks to PendingTasks.
  Migration completed (No changes made).

** Optional migrations of package '@angular/core' **

This package has 1 optional migration that can be executed.
Optional migrations may be skipped and executed after the update process, if preferred.

 Select the migrations that you'd like to run [provide-initializer] Replaces `APP_INITIALIZER`, `ENVIRONMENT_INITIALIZER` & `PLATFORM_INITIALIZER` respectively with 
`provideAppInitializer`, `provideEnvironmentInitializer` & `providePlatformInitializer`.

❯ Replaces `APP_INITIALIZER`, `ENVIRONMENT_INITIALIZER` & `PLATFORM_INITIALIZER` respectively with `provideAppInitializer`, `provideEnvironmentInitializer` & `providePlatformInitializer`.
  Migration completed (No changes made).

** Executing migrations of package '@angular/material' **

❯ Updates Angular Material to v19.
    
      ✓  Updated Angular Material to version 19
    
UPDATE projects/notes/src/styles.scss (4471 bytes)
UPDATE projects/proeftuin/src/styles.scss (1590 bytes)
UPDATE projects/proeftuin/src/themes/brown-green.scss (488 bytes)
UPDATE projects/proeftuin/src/themes/deeppurple-amber.scss (1045 bytes)
UPDATE projects/proeftuin/src/themes/indigo-pink.scss (1039 bytes)
UPDATE projects/proeftuin/src/themes/pink-bluegrey.scss (1040 bytes)
UPDATE projects/proeftuin/src/themes/purple-green.scss (1038 bytes)
UPDATE projects/proeftuin/src/themes/yellow-amber.scss (1096 bytes)
  Migration completed (8 files modified).

```

## Updating

Install latest tools, run `ng update`, run `ncu`, run `npm install`.

```bash
sudo npm install --location=global @angular/cli@latest
sudo npm install --location=global npm-check-updates@latest
sudo npm install --location=global sass@latest
npm list -g

# This will give an overview
ng update
# This will do an actual update of specified packages
# Use an optional `--force` switch if something is not compatible
ng update --force @angular/cli @angular/core @angular-eslint/schematics @angular/material @angular/cdk

# This will show updates for the rest of packages
ncu
# Now edit `package.json` manually and do `npm install`
npm install
```

- Run `prod.cmd`.
- Go to the `src/themes` and run `build_themes_compressed.cmd`.
- Run `prod_notes.cmd`

If `ng serve notes` command gives the
`Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory`
error, increase the memory using

```bash
export NODE_OPTIONS="--max-old-space-size=8192"
```

## ESLint problems -- .eslintrc.json

```json
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/recommended--extra",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:@angular-eslint/ng-cli-compat",
        "plugin:@angular-eslint/ng-cli-compat--formatting-add-on"
      ],
```

## Updates

1. [angular cli](https://github.com/angular/angular-cli/releases)
2. [angular](https://github.com/angular/angular/blob/master/CHANGELOG.md), [angular release schedule](https://github.com/angular/angular/blob/master/docs/RELEASE_SCHEDULE.md), [breaking changes](https://github.com/angular/angular/blob/main/CHANGELOG.md#breaking-changes-1)
3. [angular zone](https://github.com/angular/zone.js/blob/master/CHANGELOG.md)
4. [angular flex-layout](https://github.com/angular/flex-layout/blob/master/CHANGELOG.md)
5. [angular material](https://github.com/angular/material2/blob/master/CHANGELOG.md)
6. [material design icons](https://github.com/google/material-design-icons/releases)
7. [material design icons font](https://github.com/jossef/material-design-icons-iconfont/releases), [icons themselves](https://jossef.github.io/material-design-icons-iconfont/)
8. [rxjs](https://github.com/ReactiveX/rxjs/blob/master/CHANGELOG.md)
9. [hammerjs](http://hammerjs.github.io/changelog/)
10. [tslib](https://github.com/Microsoft/tslib/releases)
11. [core-js](https://github.com/zloirock/core-js/blob/master/CHANGELOG.md)
12. [d3](https://github.com/d3/d3/releases)
13. [d3 types](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/d3)
14. [d3 voronoi treemap](https://github.com/Kcnarf/d3-voronoi-treemap/releases)
15. [d3 voronoi map](https://github.com/Kcnarf/d3-voronoi-map/releases)
16. [mathjax](https://www.mathjax.org/news/#new-in-release)
17. [katex](https://github.com/KaTeX/KaTeX/releases)
18. [katex types](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/katex)

## Add a new application project to the monorepo

From the workspace folder, execute the following. Read about the [multirepo file structure](https://angular.io/guide/file-structure#multiple-projects) and [ng generate](https://angular.io/cli/generate).

```bash
# Adding a study example application
ng generate application myapp --prefix=myapp --minimal --routing=false --style=scss --inline-style=false --inline-template=false --skip-tests=true --interactive=false --dry-run=true

# Adding a real application
ng generate application myapp --style=scss --routing=true --prefix=myapp --strict=false

ng generate component feature1/first --export --prefix=myapp --style=scss --project=myapp

ng generate service feature1/second --project=myapp

ng serve myapp
```

## Naming and styling

Follow Angular [naming conventions](https://github.com/angular/angular/blob/master/docs/NAMING.md),
TypeScript [coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines) and
Angular [coding style guide](https://angular.io/guide/styleguide).

## Angular components

## Create multiple apps under single workspace

```bash
# create a new workspace
ng new workspace --directory=workspace --createApplication=false --interactive=false
cd workspace

# add a new app to the workspace
ng generate application app1 --style=scss --routing=true --prefix=app1 --strict=false

# add more apps to the workspace
ng generate application app2 --style=scss --routing=true --prefix=app2 --strict=false

# add a new lib to the workspace
ng generate library lib1 --prefix=lib1

ng generate component feature1/first --export --prefix=mb --style=scss --project=lib1
# add to public-api.ts
# export * from './lib/feature1/first/first.component';

ng generate service feature1/second --project=lib1
# add to the service:
#   get message(): string {
#    return 'Second service works';
#  }
# add to public-api.ts
# export * from './lib/feature1/second.service';

# build the library
ng build lib1

# app1
# add to the app.component.ts
# import { SecondService } from 'projects/lib1/src/lib/feature1/second.service';
# ...
#  constructor(secondService: SecondService) {
#    this.title = secondService.message;
#  }
# add to app.component.html before the footer
#  <br/>
#  <mb-first></mb-first>: {{title}}
#  <br/>
# add to the app.module.ts
# import { Lib1Module } from 'projects/lib1/src/lib/lib1.module';
# imports: [ ... Lib1Module ... ]

# run app1 (first style)
ng serve app1

# run app2 (second style)
ng serve --project=app2
```

Another way of importing libary. In the top level `tsconfig.json` in the `projects` folder add:

```json
"paths": {
            "@org-name/example-lib": ["projects/example-lib/src/public-api.ts"]
        }
```

### Adding Angular Material inside the library

Import the used Angular Material modules into the library module (and/or its child feature modules).
You don't have to import `BrowserAnimationsModule`, but the project using your library must import it.

```ts
import { MatDialogModule, MatExpansionModule, MatIconModule } from '@angular/material';
...
 imports: [
    ...,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
  ],
```

Important is, that you define `@angular/material` as `peerDependency` in your libraries package.json file.
See [stackovrflow](https://stackoverflow.com/questions/52410631/use-angular-material-globally-with-component-library)

### Providing the `styles.scss` from the library

Taken from [stackoverflow](https://stackoverflow.com/questions/59216217/can-an-angular-ngmodule-provide-a-style-scss-file-to-be-used-by-whoever-imports) and [here](https://github.com/FabianGosebrink/angular-libraries).

The `styles.scss` in the library:

```scss
@import '~@angular/material/theming';
// Some other common styles I want to have in this module
```

In the library's `package.json` add the following.

```json
  "scripts": {
    "build": "npm run build:lib && npm run copy:assets",
    "build:lib": "ng build projects/lib1",
    "copy:assets": "cp -r ./projects/lib1/src/assets ./dist/lib1/assets"
  },
```

Add styles to your app `angular.json`:

```json
"styles": [
          "node_modules/pathToYourCustomLib/style.css"
        ],
```

### Include assets when building angular library

Add an `assets` folder at the root of your library project.
Add into the `ng-package.json` file of the library.
The `ng-packagr` will include the assets along with the build files.
See [github](https://github.com/ng-packagr/ng-packagr/blob/master/docs/copy-assets.md).

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/icon",
  "assets": [ // <-- Add them here
      "./assets"
      "CHANGELOG.md",
      "./styles/**/*.theme.scss"
  ],
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

When including additional assets like Sass mixins or pre-compiled CSS, you need to add these manually to the conditional "exports" in the `package.json` of the primary entry point.
`ng-packagr` will merge the manually-added "exports" with auto-generated ones, allowing for library authors to configure additional export sub-paths, or custom conditions.
Example `package.json`:

```json
 {
  "name": "your-library",
  "version": "1.2.3",
  "exports": {
    ".": {
      "sass": "./_index.scss"
    },
    "./styles/dark-theme": {
      "sass": "./styles/_dark-theme.scss"
    },
    "./styles/light-theme": {
      "sass": "./styles/_light-theme.scss"
    }
  },
  "peerDependencies": {
    ...
  },
  "dependencies": {
    ...
  }
 }
```

Build `ng build custom-project --prod`.
It then appear in your `dist` folder.

To use from an app1, add assets, scripts and styles in the `angular.json`.

```json
 {
   /*...*/
   "assets": [ // Import all assets
     {
       "glob": "**/*",
       "input": "./node_modules/custom-project/assets",
       "output": "/assets/"
     }
   ],
   "styles" : [ // Only custom css
     "node_modules/custom-project/assets/my-css-file.css"
   ],
   "scripts" : [
     "node_modules/custom-project/assets/my-js-file.js"
   ]
 }
```

```text
mbdata..........library with test data
                - hierarchies
                - indicators
                - prices
mb..............library
                - material
                - katex
                - svg-viewer
                - theme-picker (external theme array)
                - snack-bar
                - charts
                - colors
                - currencies
                - errors
                - indicators
                - instruments
                - markets
                - time
                - utils
mb-features.....demonstrates features of mb library
                - tex
                - instruments-table (??? does rest call, separate app????)
                - ohlcv-chart (trading chart ?) with indicators
                - sparkline
                - multiline
                - stackline
                - swatches
                - sunburst
                - icicle
                - circlepack
                - treemap
                - voronoi
                - shared
                  - math-jax
                  - toolbar
                  - footer
mb-synthetic....app for synthetic data, rest calls to backend
d3-playground...demonstrations for d3
                - random bar chart
                - draggable brush
                - brush & zoom area chart
                - real-time chart
                - techan
notes...........almost blog, but interactive
blog............???
book............???

hilbert-paths => hilbert-race, to notes and blog
hilbert-stocks => hilbertline, make mb component, add mb-features, story to notes
hilbert-curve => hilbertcurve, make mb component, add mb-features, story to notes
horizon => horizonline, make mb component, add mb-features, story to notes

spiralline => price history on spiral ???
```

tryout = proberen
attempts = pogentrachten
attempt = trachten

proeftuin = testing ground ~ proving ground = proefterrein
playground = speelplaats, speelterrein
arboretum

glass house = greenhouse = greenery = conservatory
broeikas
