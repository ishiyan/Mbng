# Theme Tokens Reference

All chart and UI colors are controlled via CSS custom properties on `:root` (light theme), `[data-theme="dark"]` (dark theme), and `[data-theme="print"]` (publication B&W theme). Custom themes can override any subset of tokens in the **Theme Editor**; live overrides are automatically resolved and embedded when exporting SVG or PNG.

## Core UI & Surface

| Variable | Light | Dark | Print (B&W) | Description |
|----------|-------|------|-------------|-------------|
| `--bg` | `#ffffff` | `#1e1e1e` | `#ffffff` | Chart and page background |
| `--fg` | `#1a1a1a` | `#e0e0e0` | `#000000` | Primary text and foreground |
| `--bg2` | `#f5f5f5` | `#2a2a2a` | `#f2f2f2` | Controls bar and panel header background |
| `--border` | `#dddddd` | `#444444` | `#cccccc` | Borders and dividers |
| `--btn-bg` | `#e8e8e8` | `#3a3a3a` | `#e8e8e8` | Button and select background |
| `--btn-hover` | `#d0d0d0` | `#4a4a4a` | `#d0d0d0` | Button hover background |

## Axes, Grid & Labels

| Variable | Light | Dark | Print (B&W) | Description |
|----------|-------|------|-------------|-------------|
| `--axis` | `#666666` | `#aaaaaa` | `#000000` | Axis domain lines, ticks, and tick labels |
| `--grid` | `#999999` | `#777777` | `#888888` | Inner grid lines |
| `--grid-opacity` | `0.35` | `0.35` | `0.4` | Inner grid stroke opacity |
| `--label` | `#444444` | `#cccccc` | `#000000` | X and Y axis title text |
| `--legend` | `#333333` | `#d0d0d0` | `#000000` | Legend item label text |
| `--subfigure` | `#1a1a1a` | `#e0e0e0` | `#000000` | Subfigure label (`(a)`, `(b)`, ...) text |
| `--coords` | `#1a1a1a` | `#e0e0e0` | `#000000` | Pointer coordinate readout text |

## Curves, Reference Lines & Crosshair

| Variable | Light | Dark | Print (B&W) | Description |
|----------|-------|------|-------------|-------------|
| `--curve-width` | `2` | `2` | `1.75` | Default frequency-response curve stroke width |
| `--curve-hover-width` | `5` | `5` | `4.5` | Highlighted curve stroke width (legend click) |
| `--ref-line` | `#888888` | `#999999` | `#333333` | Default stroke for `horizontals` and `verticals` |
| `--crosshair` | `#888888` | `#888888` | `#555555` | Crosshair wire stroke |
| `--annotation-bg` | `#1a1a1a` | `#e0e0e0` | `#000000` | Crosshair axis callout background |
| `--annotation-fg` | `#ffffff` | `#1a1a1a` | `#ffffff` | Crosshair axis callout text |

## Print (B&W) Automatic Dash Differentiation

When the **Print (B&W)** theme is selected (or `"palette": "mono"` is set in `fres-layout.json`), curves without an explicit layout `color` render in `var(--fg)` and automatically cycle through distinct dash patterns so multiple filters remain distinguishable in grayscale print:

| Series Index | Dash Pattern | Appearance |
|--------------|--------------|------------|
| 0 | `""` | Solid |
| 1 | `"6,3"` | Dashed |
| 2 | `"2,2"` | Dotted |
| 3 | `"8,3,2,3"` | Dash-dot |
| 4 | `"10,4"` | Long dash |
| 5 | `"4,2,1,2,1,2"` | Dash-dot-dot |

Explicit `color`, `width`, and `dash` properties in `fres-layout.json` always take precedence.

## Theme Editor Usage

Expand **Theme Editor** below the chart to edit CSS custom properties live. You can edit either CSS declarations (`--bg: #0d1117;`) or paste a JSON object with token names (with or without `--`):

```json
{
  "bg": "#0d1117",
  "fg": "#c9d1d9",
  "axis": "#8b949e",
  "grid": "#30363d",
  "grid-opacity": "0.6"
}
```

- **Apply** (`Ctrl+Enter`): applies token overrides immediately to the page and chart
- **Reset**: clears custom overrides for the active theme preset
- **Copy**: copies current token declarations to the clipboard
- **Save**: downloads `theme-<preset>.css`

## Built-in Layout Palettes

Set `"palette"` in `fres-layout.json` to control automatic series colors:

- Categorical: `"default"` (8-color study palette), `"tab10"` (Matplotlib/Tableau 10)
- Continuous (ideal for parameter sweeps such as `sma(2)`..`sma(21)`): `"cool"` (matches `mb-frequency-response-chart`), `"warm"`, `"viridis"`, `"plasma"`, `"inferno"`, `"magma"`, `"cividis"`, `"turbo"`, `"cubehelixdefault"`, `"blues"`, `"greens"`, `"greys"`, `"oranges"`, `"purples"`, `"reds"`
- Monochrome: `"mono"` (`var(--fg)` with automatic dash patterns)
- Custom array: `["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]`
