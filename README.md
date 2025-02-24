# Mbng

## Projects in this monorepo

| Project     | Description | Live |
| ----------- | ----------- | ------------ |
| `mb`        | A library with shared components and widgets | |
| `proeftuin` | A testing ground for the `mb` library | [Github pages](https://ishiyan.github.io/Proeftuin) |
| `notes`     | An interactive assorted notes for various topics | [Github pages](https://ishiyan.github.io/notes) |

## TODO

### Migrate to M3

to do.

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

### SEO

[SEO](https://moz.com/blog/meta-data-templates-123)

```ts
export class SeoComponent {
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);

    constructor() {
        // set SEO metadata
        this.title.setTitle("My fancy page/route title. Ideal length 60-70 chars");
        this.meta.addTag({ name: "description", content: "My fancy meta description. Ideal length 120-150 characters." });
    }
}
```

Look at [adev](https://github.com/angular/angular/blob/main/adev/src/index.html)

## Indicators

Looks good: ma, ems, wma, trima, dema

Wrong: Comparing triple exponential moving average with SMA

No text: Visualising financial data with linear chart

```text
g x x jmark-urik/JurikMovingAverage
x x x perry-kaufman/KaufmanAdaptiveMovingAverage
x n l tim-tillson/T2ExponentialMovingAverage        (note text describes WMA, incorrect charts)
x n l tim-tillson/T3ExponentialMovingAverage        (note text describes WMA, incorrect charts)
x N l patrick-mullow/DoubleExponentialMovingAverage (note looks good)
x n l patrick-mullow/TripleExponentialMovingAverage (note text describes WMA)
```

## SSR

Server Side Rendering on the fly as new request comes in.
This will require node server when you deploy the project.
So you cannot deploy it on `GitHub Pages`.

Add the following to `angular.json` before `scripts`:

```json
            "styles": [
              "projects/notes/src/styles.scss"
            ],
            // ------------------------------------------
            "server": "projects/notes/src/main.server.ts",
            "ssr": {
              "entry": "projects/notes/src/server.ts"
            },
            "outputMode": "server",
            // -------------------------------------------
            "scripts": []
```

## SSG only

Add the following to `angular.json` before `scripts`:

```json
            "styles": [
              "projects/notes/src/styles.scss"
            ],
            // ------------------------------------------
            "server": "projects/notes/src/main.server.ts",
            "ssr": false,
            "prerender": true,
            // -------------------------------------------
            "scripts": []
```

### Deploy SSG-built notes to GitHub Pages

```bash
ng build notes --base-href /notes/
ng build proeftuin --base-href /Proeftuin/
```

There will be errors like shown below where asset svg icons are not found during SSG buid,
but it will find them on GitHub pages.

```text
Error retrieving icon :mb-candlesticks! Http failure response
for http://ng-localhost/notes/assets/mb/mb-candlesticks.svg
```

- When build is done, clean all files in the `notes` repo, leave only `README.md`.
- Copy everything inside the `dist/notes/browser` to the root of the `notes` repo.
- In `notes` repo, clone the `index.html` as the `404.html`.
- Add all, commit and push the `notes` repo.

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

## Naming and styling

Follow Angular [naming conventions](https://github.com/angular/angular/blob/master/docs/NAMING.md),
TypeScript [coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines) and
Angular [coding style guide](https://angular.io/guide/styleguide).

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
