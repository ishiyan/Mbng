# Running Indicator Frequency Response from the command line

Indicator Frequency Response (`tools/indicator-fres/`) has no Angular build step
and needs no repository `npm install`. Everything lives in `index.html`, loading
D3 v7 from `https://d3js.org/d3.v7.min.js`.

The commands below run from `tools/indicator-fres/`. On Ubuntu, change to that
directory with `cd tools/indicator-fres`; in Windows Command Prompt, use
`cd /d C:\path\to\Mbng\tools\indicator-fres`.

## Why opening a file URL does not normally load the JSON files

The page reads `?data=...&layout=...` using the browser's `fetch()` API. Browsers
normally block fetching local `file://` JSON files, even when the JSON files are
beside `index.html`. The **Load JSON** button (and drag-and-drop onto the window)
always works without a server because choosing or dropping files grants the page
access to them.

There are three ways to load JSON automatically from the command line:

| Option | Needs a server? | Browser | Loads JSON files automatically? |
|--------|-----------------|---------|---------------------------------|
| Local HTTP server | Yes, optionally in the background | Any modern browser | Yes, through URL parameters |
| Chrome/Chromium with local file access enabled | No | Chrome or Chromium | Yes, through URL parameters |
| Generated HTML copy with embedded JSON (`make-fres.cjs`) | No | Any modern browser | Yes, from the embedded snapshot |

## Local HTTP server

### Start the server and open the chart in one command

With Node.js and npm installed, this command works in both Ubuntu Bash and
Windows Command Prompt:

```sh
npx --yes http-server . -a 127.0.0.1 -p 8081 -c-1 -o "/index.html?data=./examples/example-fres-data.json&layout=./examples/example-fres-layout.json"
```

Always quote the `-o` URL because `&` is a shell operator in both Bash and
Command Prompt. Stop a foreground server with **Ctrl+C**.

While the server runs, you can open any example or custom file pair:

```text
http://127.0.0.1:8081/index.html?data=./examples/example-fres-data.json
http://127.0.0.1:8081/index.html?data=./examples/example-fres-data.json&layout=./examples/example-fres-layout-grid-2x2.json
http://127.0.0.1:8081/index.html?data=./examples/example-ma-sweep-data.json&layout=./examples/example-fres-layout-period-freq.json&theme=print
```

### Ubuntu Bash: run in the background

```bash
nohup npx --yes http-server . -a 127.0.0.1 -p 8081 -c-1 -o "/index.html?data=./examples/example-fres-data.json&layout=./examples/example-fres-layout.json" > /tmp/indicator-fres-http-server.log 2>&1 < /dev/null &
indicatorFresServerPid=$!
```

Stop the server when finished:

```bash
kill "$indicatorFresServerPid"
```

### Windows Command Prompt: run without a separate console window

```bat
start "" /b npx.cmd --yes http-server . -a 127.0.0.1 -p 8081 -c-1 -o "/index.html?data=./examples/example-fres-data.json&layout=./examples/example-fres-layout.json" > "%TEMP%\indicator-fres-http-server.log" 2>&1
```

### Use Python instead of npx

In Ubuntu Bash:

```bash
python3 -m http.server 8081 --bind 127.0.0.1
```

In Windows Command Prompt:

```bat
py -m http.server 8081 --bind 127.0.0.1
```

## Chrome or Chromium without a server

### Ubuntu Bash

```bash
google-chrome --user-data-dir="$HOME/.cache/indicator-fres-chrome" --allow-file-access-from-files "file://$PWD/index.html?data=./examples/example-fres-data.json&layout=./examples/example-fres-layout.json"
```

### Windows Command Prompt

```bat
start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --user-data-dir="%LOCALAPPDATA%\IndicatorFresChrome" --allow-file-access-from-files "file:///%CD:\=/%/index.html?data=./examples/example-fres-data.json&layout=./examples/example-fres-layout.json"
```

## No server: generate a self-contained HTML snapshot (`make-fres.cjs`)

`make-fres.cjs` uses only Node.js built-ins and embeds `fres-data.json` (plus an
optional `fres-layout.json`) directly into a standalone HTML file (`fres.html`
by default):

```sh
node make-fres.cjs ./examples/example-fres-data.json
node make-fres.cjs ./examples/example-fres-data.json ./examples/example-fres-layout-grid-2x2.json
node make-fres.cjs ./examples/example-ma-sweep-data.json ./examples/example-fres-layout-period-freq.json ./ma-sweep-fres.html
```

Open the generated HTML file directly in any browser (`xdg-open ./fres.html` on
Ubuntu or `start "" "fres.html"` on Windows) without a local server.

## URL Parameters

- `?data=path/to/fres-data.json` — load frequency-response data (auto-layout if `layout` is omitted)
- `?layout=path/to/fres-layout.json` — load optional single-chart or subfigure-grid layout
- `?theme=light|dark|print` — select initial theme preset
