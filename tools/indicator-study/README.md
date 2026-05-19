# Indicator Study

A standalone, zero-dependency charting tool for generating indicator study illustrations (SVG/PNG). Uses D3.js from CDN — no build step, no npm install. Open `index.html` in a browser and go.

## Quick Start

1. Open `index.html` in any modern browser
2. Click **Load JSON** and select a data file (e.g., `examples/example-data.json`)
3. Optionally load a layout file to customize presentation
4. Export via **Save SVG** or **Save PNG**

### URL Parameters

```
?data=path/to/data.json
?data=path/to/data.json&layout=path/to/layout.json
```

## Concepts

### Data File

Contains the raw series data. Detected by having a `series` property.

```json
{
  "description": "Optional description",
  "series": {
    "price": { "type": "bar", "mnemonic": "AAPL", "data": [...] },
    "ema10": { "type": "scalar", "mnemonic": "EMA(10)", "data": [...] }
  }
}
```

**Series types:** `bar`, `scalar`, `trade`, `quote`, `annotation`, `heatmap`, `band`

### Layout File

Controls presentation — which series go in which pane, colors, annotations, etc. Detected by having `pricePane` or `indicatorPanes`.

```json
{
  "pricePane": {
    "series": ["price"],
    "lines": [{ "series": "ema10", "color": "#ff9800" }],
    "bands": [{ "series": "bband", "color": "rgba(100,100,200,0.15)" }]
  },
  "indicatorPanes": [
    { "series": ["rsi"], "horizontals": [30, 70] }
  ]
}
```

Data files are self-sufficient (auto-layout). Layout files refine presentation and reference series by name.

## Features

- **7 series types**: bar (OHLCV), scalar, trade, quote, annotation, heatmap, band
- **Multiple price views**: candlesticks, OHLC bars, line, area, dots
- **Indicator panes**: unlimited, with lines, bands, lineAreas, heatmaps, horizontals
- **6 annotation types**: hline, vline, text, arrow, zone, line — static or draggable
- **Data-driven annotations**: markers (triangle/arrow shapes) from annotation series
- **Navigation pane**: brush-based zoom; disable with `"nav": false`
- **Replay controls**: step through bars one at a time or in batches
- **Crosshair**: with axis annotations
- **Theme system**: light/dark with 24 CSS custom properties (see [THEMES.md](THEMES.md))
- **Layout editor**: live JSON editing with Apply/Format/Copy/Save
- **Theme editor**: live CSS variable tweaking
- **Export**: SVG (with embedded theme CSS) and PNG (2x resolution)

## File Structure

```
index.html          — Complete standalone app (~3100 lines)
d3-primitives.js    — Chart primitives (scales, plots, axes)
SCHEMA.md           — Full JSON schema reference for data and layout
THEMES.md           — CSS variable documentation
examples/           — Sample data and layout files
```

## Examples

| Data | Layout | Description |
|------|--------|-------------|
| `example-data.json` | `example-layout.json` | Bar chart with EMAs, Bollinger Band, RSI |
| `example-data.json` | `example-layout-heatmap.json` | Heatmap indicator pane |
| `example-quote-data.json` | — | Quote chart (auto-layout) |
| `example-trade-data.json` | — | Trade chart (auto-layout) |
| `example-annotations-data.json` | `example-annotations-layout.json` | Data-driven markers |
| `example-data.json` | `example-layout-draggable-annotations.json` | All draggable types |

## Key Design Decisions

- **Name vs mnemonic**: series key is the short reference used in layouts; `mnemonic` is the display label shown in legends
- **Null handling**: JSON `null` → JS `NaN` at parse time; creates gaps in lines/bands, transparent cells in heatmaps
- **Horizontals vs hline annotations**: `horizontals` expand the y-axis domain (value always visible); annotation `hline` does not (decorative, may clip)
- **No dependencies**: single HTML file + primitives JS; D3 v7 loaded from CDN

## Documentation

- [SCHEMA.md](SCHEMA.md) — Complete JSON schema for data and layout files
- [THEMES.md](THEMES.md) — CSS custom properties reference and theming guide
