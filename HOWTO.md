# Howtos

## VS Code with Copilot

1. Read [VS Code documentation](https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions) first.

2. Create `.github/instructions` folder in the root of the repo.

3. Download [instructions.md](https://next.angular.dev/assets/context/guidelines.md) from [angular.dev](https://next.angular.dev/ai/develop-with-ai), copy it to the `.github/instructions` folder and rename to `angular-guidelines.md`.

4. Download [best-practices.md](https://next.angular.dev/assets/context/best-practices.md) from [angular.dev](https://next.angular.dev/ai/develop-with-ai), copy it to the `.github/instructions` folder and rename to `angular-best-practices.md`.

5. Download [llms-full.txt](https://next.angular.dev/context/llm-files/llms-full.txt) from [angular.dev](https://next.angular.dev/ai/develop-with-ai), copy it to the `.github/instructions` folder and rename to `angular-llms-full.md` respectively.

Update downloaded files regulary.

```bash
# from the root of the repo with curl
curl -o .github/instructions/angular-guidelines.md https://next.angular.dev/assets/context/guidelines.md
curl -o .github/instructions/angular-best-practices.md https://next.angular.dev/assets/context/best-practices.md
curl -o .github/instructions/angular-llms-full.md https://next.angular.dev/assets/context/llms-full.txt

# or the same with wget
wget -O .github/instructions/angular-guidelines.md https://next.angular.dev/assets/context/guidelines.md
wget -O .github/instructions/angular-best-practices.md https://next.angular.dev/assets/context/best-practices.md
wget -O .github/instructions/angular-llms-full.md https://next.angular.dev/assets/context/llms-full.txt
```

### Using built-in simple browser

1. Run `ng serve proeftuin` in the terminal.
2. Use the `Simple Browser: Show` command to open the built-in browser. Enter `http://localhost:4200` when prompted for URL.

## Updating

Install `n` to update `npm`-

```bash
sudo npm cache clean -f
sudo npm install --location=global n
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

## Self-hosting Roboto font

[npm package](https://www.npmjs.com/package/roboto-fontface)

Install `roboto-fontface` package.

```bash
npm install roboto-fontface
```

This will add `roboto-fontface` to the `packege.json`.

```json
  "dependencies": {
    "roboto-fontface": "^0.10.0",
  },
```

In `angular.json`, update the `styles` array to include `css`.

```json
  "styles": [
    "src/styles.scss", 
    "node_modules/roboto-fontface/css/roboto/roboto-fontface.css"
  },
```

Delete the lines from the `index.html` which download the font.

```html
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
```

```scss
// for npm roboto-fontface package (to load local files)
@use 'roboto-fontface/css/roboto/sass/roboto-fontface' with (
  $roboto-font-path: 'roboto-fontface/fonts'
);

// for npm material-icons package (to load local files)
@use 'material-icons/iconfont/material-icons.scss' with (
  $material-icons-font-path: 'material-icons/iconfont/'
);
```

## Self-hosting @fontsouce Roboto font

[@fontsource/roboto](https://fontsource.org/fonts/roboto)

Install `@fontsource-variable/roboto` package to `devDependencies`.

```bash
npm install @fontsource-utils/scss
npm install @fontsource/roboto
#npm install @fontsource-variable/roboto
#npm install @fontsource-variable/roboto-mono
```

This will add `roboto-fontface` to the `packege.json`.

```json
  "dependencies": {
    "@fontsource-variable/roboto": "^5.2.6",
  },
```

Update `styles.scss`

```scss
@use "pkg:@fontsource-utils/scss" as fontsource;

//@use "pkg:@fontsource/material-icons/scss" as MaterialIcons;
//@use "pkg:@fontsource/material-symbols-outlined/scss" as MaterialSymbolsOutlined;
@use "pkg:@fontsource/roboto/scss" as Roboto;

//@include fontsource.faces($metadata: MaterialIcons.$metadata);
//@include fontsource.faces($metadata: MaterialSymbolsOutlined.$metadata);
@include fontsource.faces($metadata: Roboto.$metadata);

/*.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}

.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -moz-font-feature-settings: "liga";
  -moz-osx-font-smoothing: grayscale;
}*/
```

## Material icons

Install `roboto-fontface` package.

```bash
npm install material-icons
```

This will add `material-icons` to the `packege.json`.

```json
  "dependencies": {
    "material-icons": "^1.13.14",
  },
```

In `angular.json`, update the `styles` array to include `css`.

```json
  "styles": [
    "src/styles.scss", 
    "node_modules/material-icons/iconfont/material-icons.css"
  },
```

If you place an icon in, for instance, `h1` element, apply the following style to it.
This will size the icon appropriatelly. If you omti `fontSet` the icon will be filled.

```html
<h1>
  This is a header
  <mat-icon fontSet="material-icons-outlined">home</mat-icon>
</h1>
```

```css
mat-icon {
  font-size: inherit;
  width: auto;
  height: auto;
}
```

## Material symbols

[google fonts page](https://developers.google.com/fonts/docs/material_symbols),
[npm package](https://www.npmjs.com/package/material-symbols)

Install `material-symbols` package.

```bash
npm install material-symbols@latest
```

This will add `material-symbols` to the `packege.json`.

```json
  "dependencies": {
    "material-symbols": "^0.33.0",
  },
```

In `styles.scss`

```scss
// Include material symbols fonts.
$material-symbols-font-path: 'material-symbols/';
@import 'material-symbols';
```

Use the font as follows

```html
  <mat-icon fontSet="material-symbols-outlined">home</mat-icon>
  <mat-icon fontSet="material-symbols-sharp">home</mat-icon>
  <mat-icon fontSet="material-symbols-rounded">home</mat-icon>
```

To customize symbols use `css`

```css
mat-icon {
  font-size: inherit;
  width: auto;
  height: auto;

  &:nth-of-type(1) {
    font-variation-settings: 
      "FILL" 0, 
      "wght" 100, 
      "GRAD" 200, 
      "opsz" 24;
  }

  &:nth-of-type(2) {
    font-variation-settings: 
      "FILL" 1, 
      "wght" 400, 
      "GRAD" 200, 
      "opsz" 24;
  }
  &:nth-of-type(3) {
    font-variation-settings: 
      "FILL" 0, 
      "wght" 700, 
      "GRAD" 200, 
      "opsz" 24;
  }
}

## SEO

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

## Hydration in dev tools

- [guide](https://www.angulararchitects.io/blog/guide-for-ssr/)
- [Install the extension](https://chromewebstore.google.com/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh?pli=1)

## Deploy SSG-built notes to GitHub Pages

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
19. [material-color-utilities](https://github.com/material-foundation/material-color-utilities/commits/main/typescript)
20. [ktibow/material-color-utilities-nightly](https://www.npmjs.com/package/@ktibow/material-color-utilities-nightly)

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
