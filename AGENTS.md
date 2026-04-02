# AGENTS.md — Coding Agent Instructions for Mbng

## Repository Overview

Angular 21 monorepo workspace with three projects:

- **`projects/mb`** — Reusable Angular library (charts, theming, indicators, data utilities, KaTeX, color tools). Built with ng-packagr.
- **`projects/notes`** — SSG documentation/notes site consuming the `mb` library.
- **`projects/proeftuin`** — Experimental playground app for the `mb` library.

Languages: TypeScript (~5.9.2), SCSS, HTML. Framework: Angular 21 with Angular Material (M3).

## Build Commands

All commands run from repo root. **Always build the library first** if `dist/mb` is missing or library code changed.

```bash
npm install                    # Install dependencies (always run first)
npm run build_mb               # Build library — MUST precede app builds
npm run build_notes            # Build notes app (SSG)
npm run build_proeftuin        # Build proeftuin app
```

If you skip `build_mb`, app builds fail with `Could not resolve "mb"` and SCSS errors.

## Lint Commands

```bash
npm run lint_mb                # Lint library
npm run lint_notes             # Lint notes app
npm run lint_proeftuin         # Lint proeftuin app
ng lint <project> --fix        # Auto-fix lint errors where possible
```

## Test Commands (Karma/Jasmine)

```bash
npm run test_mb                # Run all library tests (watch mode)
npm run test_notes             # Run notes tests
npm run test_proeftuin         # Run proeftuin tests
```

### Running a single test file

```bash
ng test mb --include='**/indicators/**/*.spec.ts'           # Glob pattern for a subset
ng test mb --include='**/exponential-moving-average.spec.ts' # Single spec file
```

Add `--no-watch` to run once and exit. Add `--code-coverage` for coverage report.

**Known flake**: `test_mb` watch mode may show Chrome disconnect noise after all specs pass. Treat the `SUCCESS` summary line as authoritative; Ctrl+C to exit.

## Contribution Workflow

1. `npm install`
2. Edit library or app code
3. If library changed: `npm run build_mb`
4. Build target app: `npm run build_notes` / `npm run build_proeftuin`
5. Lint: `npm run lint_mb` (and app lints as needed)
6. Test: `npm run test_mb --no-watch` (or Ctrl+C after SUCCESS in watch mode)
7. Do not introduce new lint errors in PRs

## Code Style Guidelines

### Formatting

- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes for all TypeScript strings and imports
- **Semicolons**: Always
- **Trailing commas**: Yes, in multi-line arrays/objects
- **Final newline**: Yes in all files (except `.md`)
- **Trim trailing whitespace**: Yes (except `.md`)
- **Brace style**: K&R (opening brace on same line)

### Imports

Organize imports into three groups separated by blank lines:

```typescript
// Group 1: Angular framework and third-party
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import * as d3 from 'd3';

// Group 2: Library imports
import { OhlcvChartComponent, ExponentialMovingAverage } from 'mb';

// Group 3: Relative/local imports
import { NoteListComponent } from './shared/note-list/note-list.component';
```

Within Group 1: Angular core first, then Angular Material, then other third-party.
Use `import * as d3 from 'd3'` for D3 (namespace import). All other imports use named destructuring.

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files | kebab-case + type suffix | `layout-settings.service.ts`, `note.interface.ts` |
| Classes | PascalCase | `ExponentialMovingAverage`, `OhlcvChartComponent` |
| Interfaces | PascalCase (no `I` prefix) | `Note`, `Indicator`, `Series` |
| Enums | PascalCase name + PascalCase members | `BarComponent.Median` |
| Variables/properties | camelCase | `barSeriesService`, `selectedPalette` |
| Constants | camelCase (not SCREAMING_SNAKE) | `const defaultLayoutMode`, `const stepMin` |
| Functions | camelCase | `calculateEma`, `guardLength` |
| Component selectors | kebab-case with prefix | `mb-ohlcv-chart`, `app-note-list` |
| Directive selectors | camelCase with prefix | `mbKatex`, `appHighlight` |

**Selector prefixes** (enforced by ESLint):
- `mb` for library components/directives
- `app` for notes/proeftuin app components
- `d3-sample`, `tex-sample` for playground components

### Types and Interfaces

- Use **interfaces** for data shapes and contracts in `*.interface.ts` files
- Use **classes** for mutable entities with logic
- Use **type aliases** sparingly for unions: `type LayoutMode = 'masonry' | 'grid' | 'list'`
- Use **enums** in `*.enum.ts` files with PascalCase members
- `@typescript-eslint/no-explicit-any` is **off** — `any` is acceptable in D3 interop code
- TypeScript strict mode is enabled (`strict`, `noImplicitAny`, `noImplicitReturns`, `strictNullChecks`)
- Type guards for union discrimination: `const guardLength = (obj: any): obj is LengthParams => 'length' in obj`

### Angular Patterns

- **Standalone components only** — no NgModules. Do NOT set `standalone: true` (it is the default in Angular 21).
- **Signals** for state: `signal()`, `computed()`, `effect()`, `input()`, `output()`
- **`inject()`** for dependency injection (not constructor injection)
- **Zoneless**: apps use `provideZonelessChangeDetection()`
- **OnPush** change detection on all components: `changeDetection: ChangeDetectionStrategy.OnPush`
- **Native control flow**: use `@if`, `@for`, `@switch` — not `*ngIf`, `*ngFor`, `*ngSwitch`
- **Visibility**: `protected` for template-accessible members, `private` for internal, `public` for API surface
- Lazy-loaded routes: `loadComponent: () => import('./path').then(m => m.ComponentName)`
- New library exports must be added to `projects/mb/src/public-api.ts`

### Functions

- **Arrow functions** are the default style for module-level functions, callbacks, and utilities
- **Regular `function` declarations** only when `this` binding matters (D3 integration) or for hoisting
- The codebase is predominantly **synchronous** — signals replace RxJS Observables for reactivity
- `async/await` appears only in test setup (`beforeEach(async () => { ... })`)

### Error Handling

- **Guard clauses with early return** — the primary pattern for invalid state
- **`throw new Error()`** for invalid constructor/function parameters (validation)
- **`try/catch` with `console.error()`** for recoverable failures (e.g., localStorage)
- No custom error classes or Result types
- Rely on TypeScript strict mode for compile-time safety

### Exports and Comments

- **Named exports only** — no default exports anywhere in the codebase
- Library public API uses `export *` re-exports in `public-api.ts`
- **JSDoc (`/** */`)** on interfaces, classes, public properties, and methods
- Inline `//` comments for brief explanations and reference URLs
- Test files include comments with the test run command: `// ng test mb --include='...'`

### Test Patterns

```typescript
import { } from 'jasmine';
import { ThingUnderTest } from './thing-under-test';

describe('ThingUnderTest', () => {
  it('should do expected behavior', () => { ... });
  it('should throw if invalid input', () => { ... });
});
```

- `describe()` groups by class/feature name; `it()` descriptions start with `'should ...'`
- Test data as module-level `const` arrays before `describe`
- `toBeCloseTo()` for floating-point, `toThrow()` for validation, `toBeNaN()` for edge cases
- Component tests: `TestBed.configureTestingModule({ imports: [StandaloneComponent] })`
- Signal inputs set via `fixture.componentRef.setInput('name', value)`
- Use `provideZonelessChangeDetection()` in test providers

## Project Layout (Key Paths)

```
angular.json              # Workspace config (build/test/lint targets)
package.json              # Scripts and dependencies
tsconfig.json             # Root TS config (strict mode, path mapping to dist/mb)
.github/copilot-instructions.md   # Copilot agent instructions (detailed build/workflow guide)
.github/instructions/     # Angular best-practice guidelines for AI assistants
projects/mb/
  src/lib/                # Library source (charts, colors, data, trading, theming, etc.)
  src/public-api.ts       # Library export surface (313 lines)
  ng-package.json         # ng-packagr config
projects/notes/src/       # Notes SSG app
projects/proeftuin/src/   # Playground app
```

## Known Build Pitfalls

- SCSS `@use` errors referencing `dist/mb/styles` → rebuild the library
- Proeftuin prerender logs `requestAnimationFrame`/`window` errors — non-fatal, ignore
- Notes build may emit bundle budget warnings (>5MB) — warnings, not errors
- CommonJS warnings for `seedrandom`, `d3-voronoi-treemap` — informational
- No `package-lock.json` (`.npmrc` has `package-lock=false`)
