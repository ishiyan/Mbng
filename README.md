# Mbng

## Projects in this monorepo

| Project     | Description |
| ----------- | ----------- |
| `mb`        | A library with shared components and widgets |
| `proeftuin` | A testing ground for the `mb` library |
| `notes`     | An interactive assorted notes for various topics |

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
