# Mbng

## Projects in this monorepo

| Project     | Description | Live |
| ----------- | ----------- | ------------ |
| `mb`        | A library with shared components and widgets | |
| `proeftuin` | A testing ground for the `mb` library | [Github pages](https://ishiyan.github.io/Proeftuin) |
| `notes`     | An interactive assorted notes for various topics | [Github pages](https://ishiyan.github.io/notes) |

## TODO

### Migrate to M3

### Sass deprecation warnings

```bash
 Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0
```

Need to use `use` instead of `import`, see
[Breaking Change: `@import` and global built-in functions](https://sass-lang.com/documentation/breaking-changes/import/)

Temporary, can be disabled in `angular.json` by inserting a snippet before `"styles"`:

```json
            // --------------------------------
            "stylePreprocessorOptions": {
              "sass": {
                "silenceDeprecations": ["color-functions", "global-builtin", "import", "mixed-decls"]
              }
            },
            // --------------------------------
            "styles": [
              "projects/notes/src/styles.scss"
            ],
```

### Indicators

Looks good: ma, ems, wma, trima, dema

Wrong: Comparing triple exponential moving average with SMA

No text: Visualising financial data with linear chart

```text
g x x jmark-urik/JurikMovingAverage
g N l perry-kaufman/KaufmanAdaptiveMovingAverage    (looks good)
g N l tim-tillson/T2ExponentialMovingAverage        (looks good)
g N l tim-tillson/T3ExponentialMovingAverage        (looks good)
g N l patrick-mullow/DoubleExponentialMovingAverage (looks good)
g N l patrick-mullow/TripleExponentialMovingAverage (looks good)
```

## Updating

Install `n` to update `npm`-

```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
node -v
```

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
ng update --force @angular/cli @angular/core @angular-eslint/schematics @angular/material @angular/cdk @angular/ssr @angular/platform-server

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

## Misc

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
