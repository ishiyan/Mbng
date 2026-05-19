# Indicator Study — JSON Schema Reference

## Data File

**Detection**: has `series` property where values have `{ type, data }`.

### Root

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `series` | `object` | **Yes** | Map of series name → series entry |
| `description` | `string` | No | Shown in series info panel |

### Series Entry (`series[name]`)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | **Yes** | `"bar"` \| `"scalar"` \| `"trade"` \| `"quote"` \| `"annotation"` \| `"heatmap"` \| `"band"` |
| `data` | `array` | **Yes** | Array of data points (structure depends on type) |
| `mnemonic` | `string` | No | Display name for legends |
| `description` | `string` | No | Shown in series info panel |
| `color` | `string` | No | Default color when auto-assigned to indicator pane |
| `annotationType` | `string` | No | For `"annotation"` series: default type (`"arrow"`, `"hline-multi"`, etc.) |

### Data Point Structures

#### `type: "bar"` (OHLCV)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `time` | `string` (ISO) | **Yes** | Timestamp |
| `open` | `number` | **Yes** | Open |
| `high` | `number` | **Yes** | High |
| `low` | `number` | **Yes** | Low |
| `close` | `number` | **Yes** | Close |
| `volume` | `number` | No | Volume |

#### `type: "scalar"`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `time` | `string` (ISO) | **Yes** | Timestamp |
| `value` | `number\|null` | **Yes** | Value (`null` → gap) |

#### `type: "band"`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `time` | `string` (ISO) | **Yes** | Timestamp |
| `upper` | `number\|null` | **Yes** | Upper bound (`null` → gap) |
| `lower` | `number\|null` | **Yes** | Lower bound (`null` → gap) |

#### `type: "heatmap"`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `time` | `string` (ISO) | **Yes** | Timestamp |
| `parameterFirst` | `number` | **Yes** | First parameter value (y-axis start) |
| `parameterLast` | `number` | **Yes** | Last parameter value (y-axis end) |
| `parameterResolution` | `number` | No | Values per unit (auto-computed if absent) |
| `values` | `number[]` | **Yes** | Intensity values (`null` → transparent, `[]` → warmup) |
| `valueMin` | `number\|null` | **Yes** | Min intensity (`null` during warmup) |
| `valueMax` | `number\|null` | **Yes** | Max intensity (`null` during warmup) |

#### `type: "trade"`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `time` | `string` (ISO) | **Yes** | Timestamp |
| `price` | `number` | **Yes** | Trade price |
| `volume` | `number` | No | Trade size |

#### `type: "quote"`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `time` | `string` (ISO) | **Yes** | Timestamp |
| `askPrice` | `number` | **Yes** | Ask price |
| `bidPrice` | `number` | **Yes** | Bid price |
| `askSize` | `number` | No | Ask size |
| `bidSize` | `number` | No | Bid size |

#### `type: "annotation"` (data-driven)

Structure depends on `annotationType` of the series:

- **arrow/triangle**: `{ time, value }`
- **hline-multi**: `{ value, label? }`
- **vline-multi**: `{ time, label? }`
- **text-multi**: `{ time, value, text? }`
- **zone**: `{ value1, value2, time1?, time2? }`
- **line**: `{ time1, value1, time2, value2 }`

---

## Layout File

**Detection**: has `pricePane` or `indicatorPanes`, does NOT have `series`.

### Root

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `description` | `string` | — | Layout description (visible in editor) |
| `width` | `string\|number` | `"100%"` | Chart width |
| `widthMin` | `number` | — | Minimum width (px) |
| `widthMax` | `number` | — | Maximum width (px) |
| `margin` | `object` | `{left:0,top:0,right:0,bottom:0}` | Outer margin |
| `axisLeft` | `boolean` | `true` | Show left Y axis |
| `axisRight` | `boolean` | `false` | Show right Y axis |
| `crosshair` | `boolean` | `false` | Enable crosshair |
| `volumeInPricePane` | `boolean` | `false` | Volume bars in price pane |
| `linearView` | `string` | — | Default view: `"candlesticks"` \| `"bars"` \| `"line"` \| `"area"` \| `"dots"` |
| `timeAnnotationFormat` | `string` | — | d3 time format for crosshair |
| `timeTicksFormat` | `string` | — | d3 time format for axis ticks |
| `timeTicks` | `number` | auto | Number of time axis ticks |
| `pricePane` | `object` | `{}` | Price pane config |
| `indicatorPanes` | `array` | `[]` | Indicator pane configs |
| `nav` | `boolean` | `true` | Show navigation/brush pane (`false` hides it) |
| `navigationPane` | `object` | see below | Nav/brush pane config |

### Pane (shared by `pricePane` and each `indicatorPanes[]` entry)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `height` | `number\|string` | `300` (price) | Height in px or % of width |
| `heightMin` | `number` | — | Minimum height |
| `heightMax` | `number` | — | Maximum height |
| `valueFormat` | `string` | `",.2f"` | d3 format for Y axis labels |
| `valueTicks` | `number` | auto | Number of Y axis ticks |
| `valueMarginPercentageFactor` | `number` | `0` | Extra Y margin as fraction (0.05 = 5%) |
| `series` | `string[]` | — | Series names to auto-resolve as lines |
| `mnemonic` | `string` | — | Override mnemonic (single-series panes) |
| `lines` | `array` | `[]` | Line overlays |
| `bands` | `array` | `[]` | Band overlays |
| `lineAreas` | `array` | `[]` | Line-to-value area fills |
| `horizontals` | `array` | `[]` | Horizontal reference lines (affect y-domain) |
| `heatmap` | `object` | — | Heatmap config |
| `annotations` | `array` | `[]` | Annotation overlays (do NOT affect y-domain) |

### `lines[]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `series` | `string` | — | Series name reference (resolved to data) |
| `data` | `array` | `[]` | Direct `{ time, value }` data |
| `color` | `string` | palette | Line color |
| `width` | `number` | `1` | Stroke width |
| `dash` | `string` | `""` | Stroke dasharray |
| `interpolation` | `string` | `"linear"` | Curve type (see below) |
| `mnemonic` | `string` | — | Legend label (overrides data mnemonic) |

### `bands[]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `series` | `string` | — | Series name reference |
| `data` | `array` | `[]` | Direct `{ time, upper, lower }` data |
| `color` | `string` | required | Fill color |
| `interpolation` | `string` | `"linear"` | Curve type |
| `mnemonic` | `string` | — | Legend label |

### `lineAreas[]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `series` | `string` | — | Series name reference |
| `data` | `array` | `[]` | Direct `{ time, value }` data |
| `value` | `number` | required | Baseline value |
| `color` | `string` | required | Fill color |
| `interpolation` | `string` | `"linear"` | Curve type |
| `mnemonic` | `string` | — | Legend label |

### `horizontals[]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `number` | required | Y-axis value |
| `color` | `string` | `"#999"` | Line color |
| `width` | `number` | `1` | Stroke width |
| `dash` | `string` | `""` | Stroke dasharray |

### `heatmap`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `series` | `string` | — | Series name reference |
| `data` | `array` | `[]` | Direct heatmap column data |
| `gradient` | `string\|string[]` | `"greys"` | Named D3 scheme or array of CSS colors |
| `invertGradient` | `boolean` | `false` | Invert gradient direction |
| `mnemonic` | `string` | — | Legend label |

Named gradients: `viridis`, `inferno`, `magma`, `plasma`, `warm`, `cool`, `rainbow`, `cubehelixDefault`, `buGn`, `buPu`, `gnBu`, `orRd`, `puBuGn`, `puBu`, `puRd`, `rdPu`, `ylGnBu`, `ylGn`, `ylOrBr`, `ylOrRd`, `blues`, `greens`, `greys`, `oranges`, `purples`, `reds`

### `annotations[]`

**Common fields** (all types):

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | `string` | required | Annotation type |
| `color` | `string` | `"var(--fg)"` | Color |
| `width` | `number` | `1` | Stroke width |
| `dash` | `string` | `""` | Stroke dasharray |
| `size` | `number` | `9` | Font size |
| `label` | `string` | — | Label text |
| `draggable` | `boolean` | `false` | Enable user dragging |

#### `type: "hline"`

| Field | Type | Description |
|-------|------|-------------|
| `value` | `number` | **Required**. Y-axis value |

#### `type: "vline"`

| Field | Type | Description |
|-------|------|-------------|
| `time` | `string` (ISO) | **Required**. X-axis time |

#### `type: "text"`

| Field | Type | Description |
|-------|------|-------------|
| `time` | `string` (ISO) | **Required**. X position |
| `value` | `number` | **Required**. Y position |
| `text` | `string` | **Required**. Display text |
| `anchor` | `string` | `"start"` \| `"middle"` \| `"end"` |

#### `type: "arrow"`

| Field | Type | Description |
|-------|------|-------------|
| `time` | `string` | X position (single) |
| `value` | `number` | Y position (single) |
| `data` | `array` | Multi-point: `[{ time, value }, ...]` |
| `shape` | `string` | `"triangle"` \| `"arrow"` (tailed) |
| `direction` | `string` | `"up"` \| `"down"` \| `"left"` \| `"right"` \| `"upright"` \| `"upleft"` \| `"downright"` \| `"downleft"` |
| `markerSize` | `number` | `8` |

#### `type: "line"`

| Field | Type | Description |
|-------|------|-------------|
| `time1` | `string` | **Required** (single). Start X |
| `value1` | `number` | **Required** (single). Start Y |
| `time2` | `string` | **Required** (single). End X |
| `value2` | `number` | **Required** (single). End Y |
| `data` | `array` | Multi-line: `[{ time1, value1, time2, value2 }, ...]` |

#### `type: "zone"`

| Field | Type | Description |
|-------|------|-------------|
| `value1` | `number` | **Required** (single). Y bound 1 |
| `value2` | `number` | **Required** (single). Y bound 2 |
| `time1` | `string` | Optional. Left X bound |
| `time2` | `string` | Optional. Right X bound |
| `data` | `array` | Multi-zone: `[{ value1, value2, time1?, time2? }, ...]` |
| `labelColor` | `string` | `"var(--fg)"` |

#### `type: "hline-multi"` (data-driven)

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | **Required**. `[{ value, label? }, ...]` |

#### `type: "vline-multi"` (data-driven)

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | **Required**. `[{ time, label? }, ...]` |

#### `type: "text-multi"` (data-driven)

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | **Required**. `[{ time, value, text? }, ...]` |
| `anchor` | `string` | Text anchor for all points |

### `navigationPane`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `height` | `number` | `30` | Nav pane height |
| `heightMin` | `number` | — | Minimum height |
| `heightMax` | `number` | — | Maximum height |
| `hasLine` | `boolean` | `false` | Show close-line |
| `hasArea` | `boolean` | `true` | Show area fill |
| `hasTimeAxis` | `boolean` | `true` | Show time axis |
| `timeTicksFormat` | `string` | — | d3 time format |
| `timeTicks` | `number` | auto | Number of ticks |

---

## Interpolation Types

Used in `lines`, `bands`, `lineAreas`:

`"linear"` | `"step"` | `"stepBefore"` | `"stepAfter"` | `"natural"` | `"basis"` | `"catmullRom"` | `"cardinal"`

---

## Notes

- JSON `null` values in numeric fields are converted to `NaN` at parse time (creates gaps in lines/bands, transparent cells in heatmaps)
- Empty `values: []` with `valueMin: null, valueMax: null` in heatmap entries represents warmup period (skipped)
- `"series"` references in layout entities are resolved against data file series names
- Layout `"mnemonic"` overrides data series mnemonic for legend display
- `"draggable": true` annotations sync to layout editor on drag-end and are excluded from SVG/PNG export
- **`horizontals` vs `annotations` hline**: `horizontals` expand the y-axis domain to ensure the line is always visible (use for reference levels like RSI 30/70). `annotations` with `type: "hline"` do NOT affect the y-domain — they may be clipped if the value is outside the current scale range. Use annotations for decorative/interactive lines, labels, and draggable levels.
