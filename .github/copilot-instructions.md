# Copilot Coding Agent Instructions (Mbng Repository)

Trust this file first. Only search the codebase if information here is missing or proves incorrect.

## 1. Repository Summary
Monorepo for an Angular workspace (Angular 20.x) containing:
- `projects/mb`: Reusable Angular library (charts, theming, indicators, data utilities, KaTeX/MathJax integration, theming & color utilities). Built with `ng-packagr`.
- `projects/notes`: Static (SSG) interactive notes / documentation site consuming the `mb` library.
- `projects/proeftuin`: Experimental/demo playground app for the `mb` library.
- `new/`: Experimental sandbox code (not part of build pipeline). Ignore unless explicitly asked.

Primary languages: TypeScript, SCSS, HTML. Tooling: Angular CLI (`@angular/cli`), `@angular/build` builder, Karma/Jasmine for unit tests, ESLint for linting, Sass for styles.

## 2. Environment & Tooling
Recommended (validated) versions (from `package.json`):
- Node: Use an LTS ≥ 20 (Angular 20-compatible). (Local build tested successfully.)
- Angular CLI: ^20.2.0
- TypeScript: ~5.9.2
- Sass: ^1.90.0
Always run `npm install` after cloning or modifying dependencies.
If memory errors appear during `ng serve notes` (heap out of memory), set: `set NODE_OPTIONS=--max-old-space-size=8192` (Windows) before running serve.

## 3. Core Commands (Always in repo root)
Install deps:
- `npm install` (must precede any build/test; do this after lock / dependency edits)

Build sequence:
1. Always build the library first if `dist/mb` has been deleted or if library code changed: `npm run build_mb`.
2. Then build apps:
   - `npm run build_notes`
   - `npm run build_proeftuin`
If you skip step 1 after cleaning `dist/mb`, app builds will fail with many `Could not resolve "mb"` errors plus SCSS failure `@use "../../../dist/mb/styles/" as mb;`.

Serve (dev):
- `npm run serve_notes` (default dev configuration)
- `npm run serve_proeftuin`
(Serve for `mb` library is not applicable; edit & rebuild.)

Tests (Karma/Jasmine):
- Whole workspace default (if added later): `npm test`
- Per project: `npm run test_mb`, `npm run test_notes`, `npm run test_proeftuin` (only `test_mb` validated here; others analogous). Note: `test_mb` enters watch mode and currently exits with non‑zero due to Chrome disconnect noise after success (183/183 SUCCESS). Treat SUCCESS lines as pass; the trailing disconnect/crash messages are a known flake.

Lint:
- Library: `npm run lint_mb`
- Apps: `npm run lint_notes`, `npm run lint_proeftuin`
Lint fails (exit code 1) on errors (e.g., unused vars). Fix or use `ng lint <project> --fix` when appropriate.

SSR / SSG:
- Current configs set `ssr: false` and `prerender: true` for both apps; builds prerender routes automatically (see build logs: "Prerendered N static routes").
- To run a server build for notes after enabling SSR (not default now): `npm run serve:ssr:notes` (expects `dist/notes/server/server.mjs`). Only use if SSR configuration is explicitly added.

## 4. Build & Runtime Notes / Pitfalls
- MUST build `mb` before any app build if `dist/mb` missing. Path mapping in root `tsconfig.json` points to `dist/mb`.
- Cleaning only `dist/mb` breaks SCSS `@use` in app styles until library rebuilt.
- Proeftuin build logs show prerender-time errors referencing `requestAnimationFrame` & `window` (non-fatal; build still succeeds). Do not treat as failure unless specifically addressing SSR hydration or DOM mocks.
- Notes build may emit budget warnings (initial bundle > 5MB). These are warnings—safe to proceed unless optimizing size.
- CommonJS warnings for `seedrandom` and `d3-voronoi-treemap` are informational.
- Unit test run for `mb` shows Chrome disconnect flakiness after success; rely on SUCCESS summary.
- Lint has numerous unused variable errors; creating PRs that introduce *additional* lint errors will fail lint script.

## 5. Typical Contribution Flow (Follow This Order)
1. `npm install`
2. Edit library or apps.
3. If library changed: `npm run build_mb`
4. Build target app(s): `npm run build_notes` / `npm run build_proeftuin`
5. Run lint(s): `npm run lint_mb` (and apps as needed)
6. Run tests: `npm run test_mb` (Ctrl+C after SUCCESS if watch mode stalls). Add or adjust tests in `projects/<project>/src/**/*.spec.ts`.
7. Repeat until clean (no build errors, acceptable warnings only).

## 6. Project Layout (Key Paths)
Root files:
- `angular.json` (project definitions, build/test/lint options, prerender config)
- `package.json` (npm scripts & dependency versions)
- `tsconfig.json` (workspace compiler opts, path mapping to `dist/mb`)
- `README.md`, `HOWTO.md` (upgrade & font/theming notes)
- `.github/` (this instructions file; may also contain future guidelines subfolder)

Per project:
- Library: `projects/mb/src/lib/**` (components, theming, charts, data, indicators). Entry point: `projects/mb/src/public-api.ts` (export surface). Build config: `projects/mb/ng-package.json`.
- Notes app: `projects/notes/src/` (routes/components under `app/`). Global styles: `projects/notes/src/styles.scss` referencing built library styles.
- Proeftuin app: `projects/proeftuin/src/` (experimental showcase). Has `environments/` for environment-specific files.
- Tests: Co-located `*.spec.ts` in each project.
- Assets: Each app under its `src/assets/`; shared library assets in `projects/mb/assets` copied into apps during build.

Configs:
- ESLint setup embedded via Angular ESLint builder; patterns defined under each project `lint` target.
- Karma setup handled by Angular builder; main test bootstrap per project: `src/test.ts`.
- Style preprocessor (Sass) options in `angular.json` (silencing some deprecations for notes; includePaths for proeftuin).

## 7. Adding or Modifying Code Safely
- When exporting new library symbols, add them to `projects/mb/src/public-api.ts`; then rebuild library and consumers.
- Avoid adding bare imports to Node-only APIs inside code paths executed during prerender unless guarded (proeftuin prerender warnings already present—minimize new ones).
- Keep lint clean: remove unused imports/vars; prefer `const` where ESLint suggests.
- Update or create tests near related code to maintain coverage trends (see `coverage/mb/` as reference output of prior runs; not required to edit coverage artifacts).

## 8. Validation Checklist Before Opening a PR
Always ensure (in order):
- `npm install` completed without errors.
- `npm run build_mb` (if library touched) succeeds.
- `npm run build_notes` and/or `npm run build_proeftuin` succeed (warnings acceptable: budgets/CommonJS).
- `npm run lint_mb` (plus app lints as applicable) returns zero errors (warnings OK unless policy changes).
- `npm run test_mb` shows all specs SUCCESS (ignore later Chrome disconnect noise). If adding app tests, run corresponding test script.

## 9. Non-Essential / Ignore Unless Asked
- `new/` directory experiments
- Font self-hosting procedures in `HOWTO.md` (just reference if working on fonts)
- Upgrade commands (`ng update`, `ncu`) unless specifically performing dependency upgrade tasks.

## 10. When to Search
Only search the repo if:
- You need an internal API usage pattern not described here.
- A build step fails contrary to the documented order.
- You must locate a specific component or spec not exposed via `public-api.ts`.
Otherwise rely on this file to minimize redundant discovery.

## 11. Edge Cases & Tips
- If builds fail after dependency changes: re-run `npm install`, then rebuild library, then apps.
- If SCSS path errors referencing `dist/mb/styles`: rebuild the library.
- For flaky Karma watch exit codes: capture SUCCESS line and terminate manually (Ctrl+C) to proceed.
- Avoid deleting entire `dist/` mid-sequence unless you intend to rebuild all projects in correct order.

Follow these instructions verbatim for faster, reliable automation. Deviate only when explicitly required by a new task scope.
