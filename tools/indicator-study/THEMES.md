# Theme CSS Variables

All theming is done via CSS custom properties on `:root` (light) and `[data-theme="dark"]`.

## Core

| Variable | Light | Dark | Description |
|----------|-------|------|-------------|
| `--bg` | `#ffffff` | `#1e1e1e` | Page/chart background |
| `--fg` | `#1a1a1a` | `#e0e0e0` | Primary text and foreground |
| `--bg2` | `#f5f5f5` | `#2a2a2a` | Secondary background (controls, headers) |
| `--border` | `#ddd` | `#444` | Border color for panels and inputs |
| `--axis` | `#666` | `#aaa` | Axis lines, ticks, and secondary text |

## Candlesticks / OHLC

| Variable | Light | Dark | Description |
|----------|-------|------|-------------|
| `--candle-up-fill` | `#ffffff` | `#1e1e1e` | Up candle body fill |
| `--candle-up-stroke` | `#26a69a` | `#26a69a` | Up candle/OHLC stroke |
| `--candle-down-fill` | `#ef5350` | `#ef5350` | Down candle body fill |
| `--candle-down-stroke` | `#ef5350` | `#ef5350` | Down candle/OHLC stroke |

## Volume

| Variable | Light | Dark | Description |
|----------|-------|------|-------------|
| `--volume-up` | `rgba(38,166,154,0.25)` | `rgba(38,166,154,0.3)` | Up volume bar fill |
| `--volume-down` | `rgba(239,83,80,0.25)` | `rgba(239,83,80,0.3)` | Down volume bar fill |
| `--volume-neutral` | `rgba(100,100,100,0.25)` | `rgba(150,150,150,0.3)` | Neutral volume bar fill |

## Quote

| Variable | Light | Dark | Description |
|----------|-------|------|-------------|
| `--quote-ask-fill` | `rgba(239,83,80,0.35)` | `rgba(239,83,80,0.4)` | Ask bar/area fill |
| `--quote-bid-fill` | `rgba(38,166,154,0.35)` | `rgba(38,166,154,0.4)` | Bid bar/area fill |
| `--quotebar-stroke` | `#7b1fa2` | `#ce93d8` | Quote bar stroke color |
| `--quotebar-width` | `1.5` | `1.5` | Quote bar stroke width |

## Line / Scalar / Area

| Variable | Light | Dark | Description |
|----------|-------|------|-------------|
| `--line-stroke` | `#1976d2` | `#4fc3f7` | Default line color |
| `--area-fill` | `rgba(0,0,0,0.06)` | `rgba(255,255,255,0.06)` | Area chart fill |
| `--point-fill` | `#1976d2` | `#4fc3f7` | Dot/point fill color |
| `--point-radius` | `2.5` | `2.5` | Dot/point radius |

## Navigation Pane

| Variable | Light | Dark | Description |
|----------|-------|------|-------------|
| `--nav-line` | `#999` | `#888` | Nav pane line stroke |
| `--selection` | `rgba(0,0,0,0.25)` | `rgba(255,255,255,0.25)` | Brush selection fill |

## Crosshair & Annotations

| Variable | Light | Dark | Description |
|----------|-------|------|-------------|
| `--crosshair` | `#999` | `#888` | Crosshair wire stroke |
| `--annotation-bg` | `#1a1a1a` | `#e0e0e0` | Axis annotation label background |
| `--annotation-fg` | `#ffffff` | `#1a1a1a` | Axis annotation label text |

## UI Controls

| Variable | Light | Dark | Description |
|----------|-------|------|-------------|
| `--btn-bg` | `#e8e8e8` | `#3a3a3a` | Button background |
| `--btn-hover` | `#d0d0d0` | `#4a4a4a` | Button hover background |

## Usage

The Theme Editor panel allows live editing of all variables. Paste a JSON object with variable names (without `--`) as keys:

```json
{
  "bg": "#0d1117",
  "fg": "#c9d1d9",
  "candle-up-stroke": "#3fb950",
  "candle-down-fill": "#f85149",
  "candle-down-stroke": "#f85149"
}
```

Use **Copy** to export current theme, **Save** to download as `.json`.

## FAQ

> Is it possible to style candlesticks in black-white mode, so that:
>
> - in light theme UP is white with black border around the body and black shadows, DOWN is totally black
> - in dark theme UP is totally white and DOWN is black with white border around the body and white shadows

Yes, that's just a matter of setting the right token values. Here's what you need:

Light theme (black & white):

- --candle-up-fill: #ffffff (white body)
- --candle-up-stroke: #000000 (black border/shadow)
- --candle-down-fill: #000000 (solid black)
- --candle-down-stroke: #000000 (black border/shadow)

Dark theme (black & white):

- --candle-up-fill: #ffffff (solid white)
- --candle-up-stroke: #ffffff (white border/shadow)
- --candle-down-fill: #1e1e1e (dark body, matches bg)
- --candle-down-stroke: #ffffff (white border/shadow)

Paste this in the Theme Editor for light:

```json
{
  "candle-up-fill": "#ffffff",
  "candle-up-stroke": "#000000",
  "candle-down-fill": "#000000",
  "candle-down-stroke": "#000000"
}
```

And for dark:

```json
{
  "candle-up-fill": "#ffffff",
  "candle-up-stroke": "#ffffff",
  "candle-down-fill": "#1e1e1e",
  "candle-down-stroke": "#ffffff"
}
```

No code changes needed — the existing tokens already support this styling.
