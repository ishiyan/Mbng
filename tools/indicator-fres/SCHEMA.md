# Indicator Frequency Response — JSON Schema Reference

This document specifies the JSON contracts consumed by `tools/indicator-fres/index.html` and produced by external generators such as `ifres` (TypeScript, Go, Python, Rust, Zig).

---

## 1. Data File (`fres-data.json`)

**Detection**: Root object has a non-array `series` map whose entries contain frequency-response component objects (for compatibility, a raw `FrequencyResponseResult[]` array or `{ "responses": [...] }` object is also accepted).

### Canonical Example

```json
{
  "description": "Moving averages frequency response (N=1024)",
  "signalLength": 1024,
  "frequencies": [0.0019569471624266144, 0.003913894324853229, 1.0],
  "series": {
    "sma-14": {
      "mnemonic": "sma(14)",
      "description": "Simple Moving Average (14)",
      "warmup": 14,
      "powerDecibel": { "min": -70.0, "max": 0.0, "data": [0.0, -0.0281, -33.9794] },
      "powerPercent": { "min": 0.0, "max": 100.0, "data": [100.0, 99.3551, 0.04] },
      "amplitudeDecibel": { "min": -70.0, "max": 0.0, "data": [0.0, -0.014, -16.9897] },
      "amplitudePercent": { "min": 0.0, "max": 100.0, "data": [100.0, 99.677, 1.9999] },
      "phaseDegrees": { "min": -180.0, "max": 180.0, "data": [-2.2896, -4.5793, -90.0] },
      "phaseDegreesUnwrapped": { "min": -900.0, "max": 0.0, "data": [-2.2896, -4.5793, -898.2] }
    }
  }
}
```

### Root Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `series` | `Record<string, FresSeriesEntry>` | **Yes** | Ordered map of series key → frequency response entry |
| `frequencies` | `number[]` | **Yes*** | Shared normalized frequency grid in `(0, 1]` (*optional only if every entry in `series` provides its own `frequencies`) |
| `signalLength` | `number` | No | Impulse signal FFT length `N` (power of 2, e.g. `1024`; spectrum length is `N / 2 - 1`) |
| `description` | `string` | No | Dataset description shown in the `#series-info` panel |

**Frequency convention** (matches `FrequencyResponse.calculate` in `Mbng` and `zpano`):

- `frequencies` is sorted strictly ascending in `(0, 1]` with length `M = signalLength / 2 - 1`, where `frequencies[i] = (i + 1) / M`.
- `1.0` represents the Nyquist frequency (`0.5` cycles/sample = period of `2` samples).
- Cycle period in samples is computed by the viewer as `period = 2 / frequency` and reversed so period increases left-to-right from `2` to `2 / frequencies[0]`.

### Series Entry (`series[key]`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mnemonic` | `string` | No | Display label in legends (falls back to `label`, then `key`) |
| `label` | `string` | No | Alias for `mnemonic` (for `FrequencyResponseResult` compatibility) |
| `description` | `string` | No | Human-readable filter description shown in `#series-info` |
| `warmup` | `number` | No | Detected or configured warmup sample count shown in `#series-info` |
| `color` | `string` | No | Default curve stroke color when not overridden by layout |
| `width` | `number` | No | Default curve stroke width |
| `dash` | `string` | No | Default SVG `stroke-dasharray` (e.g. `"6,3"`) |
| `frequencies` | `number[]` | No | Per-series frequency grid override (used when mixing different `signalLength` runs) |
| `powerDecibel` | `FrequencyResponseComponent` | **Yes** | Spectrum power in dB |
| `powerPercent` | `FrequencyResponseComponent` | **Yes** | Spectrum power in `%` of reference |
| `amplitudeDecibel` | `FrequencyResponseComponent` | **Yes** | Spectrum amplitude in dB |
| `amplitudePercent` | `FrequencyResponseComponent` | **Yes** | Spectrum amplitude in `%` of reference |
| `phaseDegrees` | `FrequencyResponseComponent` | **Yes** | Wrapped phase in degrees `[-180, 180]` |
| `phaseDegreesUnwrapped` | `FrequencyResponseComponent` | **Yes** | Unwrapped continuous phase in degrees |

*(If a subset of the 6 components is omitted in custom hand-crafted files, the viewer gracefully treats missing components as empty and renders all present components.)*

### `FrequencyResponseComponent`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data` | `(number \| null)[]` | **Yes** | Values aligned 1-to-1 with `frequencies` (`null` → `NaN` gap) |
| `min` | `number \| null` | No | Domain minimum hint (computed from finite `data` if omitted or `null`) |
| `max` | `number \| null` | No | Domain maximum hint (computed from finite `data` if omitted or `null`) |

### Multi-Language `ifres` Serialization Notes

When updating `ifres` across TypeScript, Go, Python, Rust, and Zig (mirroring `istudy`):

1. **Series key derivation**: Derive `key` from explicit `entry.key` if configured; otherwise slugify `mnemonic` (lowercase ASCII `[a-z0-9_]`, collapse punctuation/spaces to `-`, `%` to `pct`, trim leading/trailing `-`, deduplicate collisions with `-2`, `-3`, ...).
2. **Preserve insertion order**: Emit `series` keys in the exact order indicators appear in `settings.json` so legend and color assignment order are deterministic across all 5 languages.
3. **Non-finite floats**: Standard JSON forbids `NaN` and `±Infinity`. Convert any non-finite float in `data`, `min`, or `max` to JSON `null` before serialization (critical for Go `encoding/json`, Rust `serde_json`, Zig, and Python `json.dumps(..., allow_nan=False)`).
4. **CLI output**: Follow `istudy` conventions — `ifres <settings.json> [output-prefix-or-dir]` writing `fres-data.json` (and optionally `fres-layout.json` if a `"layout"` block is present in `settings.json`).

---

## 2. Layout File (`fres-layout.json`)

**Detection**: Non-array JSON object that does **not** have a `series` object map (`Array.isArray(obj.series)` is allowed on single-chart layouts to filter series keys) and contains one or more layout properties.

`fres-data.json` is completely self-sufficient (auto-layout). `fres-layout.json` is optional and can either style a **single chart** or compose a **multi-chart subfigure grid** (`(a)`, `(b)`, `(c)`, `(d)`) into a single exported SVG/PNG.

### Root Figure & Global Properties

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `description` | `string` | — | Layout description |
| `width` | `number \| string` | `"100%"` | Total SVG width in px (`720`) or container percentage (`"100%"`, `"80%"`) |
| `widthMin` | `number` | — | Minimum SVG width in px |
| `widthMax` | `number` | — | Maximum SVG width in px |
| `height` | `number \| string` | `320` (1 chart) / `220` (grid) | Per-chart cell height in px (`240`) or cell-width ratio (`"65%width"`) |
| `heightMin` | `number` | — | Minimum cell height in px |
| `heightMax` | `number` | — | Maximum cell height in px |
| `columns` | `number` | `1` | Number of columns when `charts` has multiple entries (e.g. `2` for 1×2 or 2×2 grids) |
| `gap` | `{ row?: number, col?: number } \| number` | `{ row: 14, col: 16 }` | Spacing in px between subfigure cells |
| `margin` | `{ top?: number, right?: number, bottom?: number, left?: number }` | `{ top: 6, right: 6, bottom: 6, left: 6 }` | Outer SVG padding in px |
| `palette` | `string \| string[]` | `"default"` | Auto-color palette: `"default"`, `"tab10"`, `"cool"`, `"warm"`, `"viridis"`, `"plasma"`, `"inferno"`, `"magma"`, `"cividis"`, `"turbo"`, `"cubehelixdefault"`, `"blues"`, `"greens"`, `"greys"`, `"oranges"`, `"purples"`, `"reds"`, `"mono"`, or custom hex/rgb array |
| `grid` | `boolean` | `true` | Show inner X/Y grid lines |
| `crosshair` | `boolean` | `false` | Interactive crosshair + axis callout pills (`false` shows hover `x ⇆ y` readout) |
| `legend` | `boolean \| "perChart" \| "shared"` | `"perChart"` | `"perChart"` (or `true`), `"shared"` (single figure-wide legend at top), or `false` |
| `legendMarker` | `"line" \| "circle"` | `"line"` | Legend swatch style (`"line"` displays stroke width & dash pattern; `"circle"` matches `mb-frequency-response-chart`) |
| `charts` | `ChartConfig[]` | — | Subfigure chart definitions (alias: `panes`). If omitted, root acts as a single `ChartConfig`. |

Any per-chart property placed at the root also serves as the inherited default for every entry in `charts` unless overridden by that chart.

### Per-Chart Properties (`root` or `charts[i]`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `subfig` | `string` | `""` | Subfigure label at bottom-left, e.g. `"(a)"`, `"(b)"` |
| `title` | `string` | `""` | Optional chart title centered above plot |
| `xMode` | `"frequency" \| "period"` | `"frequency"` | X-axis domain (`"frequency"` in `[0, 1]`, `"period"` in `[2, ...]`) |
| `yMode` | `string` | `"powerDb"` | `"powerDb"` \| `"powerPct"` \| `"amplitudeDb"` \| `"amplitudePct"` \| `"phaseDeg"` \| `"phaseDegUnwrapped"` |
| `xScale` | `"linear" \| "log"` | `"linear"` | Linear or logarithmic X scale (positive domain auto-clamped for `"log"`) |
| `interpolation` | `string` | `"catmullRomOpen"` | `"catmullRomOpen"` \| `"catmullRom"` \| `"linear"` \| `"natural"` \| `"monotoneX"` \| `"basis"` \| `"cardinal"` \| `"step"` |
| `height` | `number \| string` | root `height` | Row height override for this chart |
| `legend` | `boolean` | inherited | Show/hide per-chart legend on this specific chart |
| `xLabel` | `string` | auto | Custom X-axis label (`null` or `""` hides label) |
| `yLabel` | `string` | auto | Custom Y-axis label (`null` or `""` hides label) |
| `xFormat` | `string` | auto | `d3.format` string for X-axis ticks |
| `yFormat` | `string` | `".2f"` | `d3.format` string for Y-axis ticks |
| `yFormatMargin` | `number` | `0` | Extra left margin (px) for wide Y-axis tick labels |
| `xTicks` | `number` | auto | Approximate number of X-axis ticks |
| `yTicks` | `number` | auto | Approximate number of Y-axis ticks |
| `nice` | `boolean` | `true` | Apply `scale.nice()` to axis domains (automatically skipped on axes with explicit min/max bounds unless `nice: true` is set explicitly on the chart) |
| `minFrequency` / `maxFrequency` | `number` | `0` / `1` | X-axis bounds when `xMode === "frequency"` |
| `minPeriod` / `maxPeriod` | `number` | `2` / `ceil(2/f_min)` | X-axis bounds when `xMode === "period"` |
| `minDb` / `maxDb` | `number` | component min/max | Y-axis bounds for `"powerDb"` and `"amplitudeDb"` |
| `minPct` / `maxPct` | `number` | component min/max | Y-axis bounds for `"powerPct"` and `"amplitudePct"` |
| `minDeg` / `maxDeg` | `number` | component min/max | Y-axis bounds for `"phaseDeg"` and `"phaseDegUnwrapped"` |
| `xMin` / `xMax` | `number` | — | Direct X-axis bound override (takes precedence over mode-specific min/max) |
| `yMin` / `yMax` | `number` | — | Direct Y-axis bound override (takes precedence over mode-specific min/max) |
| `series` | `string[]` | all series | Subset and order of series keys from `fres-data.json` |
| `lines` | `LineOverride[]` | — | Per-series styling overrides (`{ series, mnemonic?, color?, width?, dash?, opacity?, interpolation? }`) |
| `horizontals` | `(number \| RefLine)[]` | `[]` | Horizontal reference levels (expands Y domain by default) |
| `verticals` | `(number \| RefLine)[]` | `[]` | Vertical reference levels (expands X domain by default) |
| `annotations` | `Annotation[]` | `[]` | Decorative or draggable annotations (does not expand axis domains) |

### `lines` Item (`LineOverride`)

```json
{
  "series": "sma-14",
  "mnemonic": "SMA(14)",
  "color": "#1976d2",
  "width": 2,
  "dash": "6,3",
  "opacity": 1,
  "interpolation": "catmullRomOpen"
}
```

If both `lines` and `series` are omitted, all series in `fres-data.json` are plotted. If `lines` is provided without `series`, only the entries listed in `lines` are plotted (in that order). If both `series` and `lines` are provided, `series` defines the list/order and matching `lines` entries apply style overrides.

### Reference Lines (`horizontals` and `verticals`)

Accepts a bare `number` (e.g. `-3`) or an object:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `number` | **Yes** | Y value (for `horizontals`) or X value (for `verticals`) |
| `color` | `string` | `"var(--ref-line)"` | Line and label color |
| `width` | `number` | `1` | Stroke width |
| `dash` | `string` | `"4,3"` | SVG `stroke-dasharray` |
| `label` | `string` | — | Optional inline label (e.g. `"-3 dB"`, `"T = 14"`) |
| `align` | `"start" \| "middle" \| "end"` | `"end"` (h) / `"start"` (v) | Label alignment |
| `expandDomain` | `boolean` | `true` | Expand axis domain so the reference value is guaranteed visible |

### `annotations`

Decorative or interactive (`"draggable": true`) overlays rendered in chart `(x, y)` data coordinates without expanding axis domains. Dragging an annotation updates the Layout Editor JSON automatically on drag-end; drag handles are excluded from SVG/PNG exports.

- **`hline`**: `{ "type": "hline", "value": -3, "label"?: "-3 dB", "color"?: "#ef5350", "width"?: 1, "dash"?: "4,3", "size"?: 10, "draggable"?: false }`
- **`vline`**: `{ "type": "vline", "x": 14, "label"?: "cutoff", "color"?: "#26a69a", "width"?: 1, "dash"?: "4,3", "size"?: 10, "draggable"?: false }` *(alias `"value"` is also accepted for `"x"`)*
- **`text`**: `{ "type": "text", "x": 0.25, "y": -6, "text": "Stopband", "anchor"?: "start" | "middle" | "end", "color"?: "var(--fg)", "size"?: 11, "draggable"?: false }`
- **`arrow`**: `{ "type": "arrow", "x": 0.14, "y": -3, "shape"?: "triangle" | "arrow", "direction"?: "up" | "down" | "left" | "right" | "upleft" | "upright" | "downleft" | "downright", "markerSize"?: 8, "color"?: "#ef5350", "label"?: "-3 dB point", "draggable"?: false }`
- **`zone`**: `{ "type": "zone", "x1"?: 0, "x2"?: 0.14, "y1"?: -70, "y2"?: 0, "color"?: "rgba(38,166,154,0.10)", "label"?: "Passband", "labelColor"?: "var(--fg)", "size"?: 10, "draggable"?: false }` *(omitted `x1`/`x2` or `y1`/`y2` span the full axis extent)*
- **`line`**: `{ "type": "line", "x1": 0.1, "y1": -3, "x2": 0.5, "y2": -20, "color"?: "#ff9800", "width"?: 1.5, "dash"?: "4,2", "label"?: "-20 dB/dec", "size"?: 10, "draggable"?: false }`
