# Running Indicator Study from the command line

Indicator Study has no Angular build step and needs no repository `npm install`.
Keep `index.html` and `d3-primitives.js` together. The page loads D3 v7 from
`https://d3js.org/d3.v7.min.js`, so internet access is needed unless you replace
that script URL with a downloaded local copy.

The commands below run from `tools/indicator-study/`. On Ubuntu, change to that
directory with `cd tools/indicator-study`; in Windows Command Prompt, use
`cd /d C:\path\to\Mbng\tools\indicator-study`.

## Why opening a file URL does not normally load the JSON files

The page reads `?data=...&layout=...` using the browser's `fetch()` API. Browsers
normally block fetching local `file://` JSON files, even when the JSON files are
beside the HTML file. Opening the HTML from the command line does not change
this restriction. The **Load JSON** button works because choosing a file grants
the page access to that file.

There are three ways to avoid choosing the files manually:

| Option | Needs a server? | Browser | Loads both JSON files automatically? |
|--------|-----------------|---------|---------------------------------------|
| Local HTTP server | Yes, optionally in the background | Any modern browser | Yes, through URL parameters |
| Chrome/Chromium with local file access enabled | No | Chrome or Chromium | Yes, through URL parameters |
| Generated HTML copy with embedded JSON | No | Any modern browser | Yes, from the embedded snapshot |

A local HTTP server is the most portable option for opening the original JSON
files. You can run it in the background, so a separate terminal window is not
required. For normal browser settings without a server, use the embedded HTML
recipe below.

## Local HTTP server

### Start the server and open the study in one command

With Node.js and npm installed, the following command works in both Ubuntu Bash
and Windows Command Prompt:

```sh
npx --yes http-server . -a 127.0.0.1 -p 8080 -c-1 -o "/index.html?data=./examples/example-data.json&layout=./examples/example-layout.json"
```

Serve the directory (`.`), so the browser can load the HTML, `d3-primitives.js`,
and the JSON files. The URL belongs in the `-o` argument, rather than in the
directory argument. Always quote it: an unquoted `&` is a shell operator in both
Bash and Command Prompt.

Here, `-a 127.0.0.1` binds to the local machine, `-c-1` disables caching while
editing studies, and `-o` opens the browser. The first run downloads
`http-server` if it is not already cached. Stop a foreground server with
**Ctrl+C**.

While the server runs, you can also open or bookmark:

```text
http://127.0.0.1:8080/index.html?data=./examples/example-data.json&layout=./examples/example-layout.json
```

### Ubuntu Bash: run in the background

```bash
nohup npx --yes http-server . -a 127.0.0.1 -p 8080 -c-1 -o "/index.html?data=./examples/example-data.json&layout=./examples/example-layout.json" > /tmp/indicator-study-http-server.log 2>&1 < /dev/null &
indicatorStudyServerPid=$!
```

The prompt returns immediately, and `nohup` lets the server continue after you
close the terminal. On the first run, install/cache `http-server` with the
foreground command above before using this background command.

To stop the server from the same shell:

```bash
kill "$indicatorStudyServerPid"
```

If an npm wrapper leaves the server running, or you closed that shell, find the
process listening on port 8080:

```bash
fuser -n tcp 8080
```

Then stop the reported PID with `kill PID`. Check that it belongs to this server
before stopping it. `fuser` is provided by Ubuntu's `psmisc` package. Server
output, including port conflicts, is in `/tmp/indicator-study-http-server.log`.

### Windows Command Prompt: run without a separate console window

```bat
start "" /b npx.cmd --yes http-server . -a 127.0.0.1 -p 8080 -c-1 -o "/index.html?data=./examples/example-data.json&layout=./examples/example-layout.json" > "%TEMP%\indicator-study-http-server.log" 2>&1
```

`start /b` returns the prompt without opening another console window. Keep the
current window open while using the server; `/b` does not detach it from that
console. The first empty string is the window-title argument required by
`start`.

To find the server PID:

```bat
netstat -ano -p tcp | findstr :8080
```

Use the PID in the `LISTENING` row for `127.0.0.1:8080`, then stop that process:

```bat
taskkill /PID PID /T /F
```

Replace the second `PID` with the number shown by `netstat`. The `/T` option also
stops child processes. Output is in `%TEMP%\indicator-study-http-server.log`.

### Use Python instead of npx

Python's standard library can serve the same directory without installing
`http-server`. In Ubuntu Bash:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

In Windows Command Prompt, with the Python launcher installed:

```bat
py -m http.server 8080 --bind 127.0.0.1
```

This is still a server and stays in the foreground until **Ctrl+C**. Open the
study URL above in the browser; Python's server does not open it automatically.

## No server: Chrome or Chromium with local file access

Chrome/Chromium provides `--allow-file-access-from-files` for loading local files
from a local HTML page. Use a separate browser profile so the flag applies to a
new browser process instead of forwarding the URL to your ordinary, already
running browser.

### Ubuntu Bash

With Google Chrome installed:

```bash
google-chrome --user-data-dir="$HOME/.cache/indicator-study-chrome" --allow-file-access-from-files "file://$PWD/index.html?data=./examples/example-data.json&layout=./examples/example-layout.json"
```

For Chromium, replace `google-chrome` with `chromium` or `chromium-browser`,
depending on the installation. Snap-packaged Chromium may also restrict which
local directories the browser can access.

### Windows Command Prompt

With Google Chrome installed in its usual system-wide location:

```bat
start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --user-data-dir="%LOCALAPPDATA%\IndicatorStudyChrome" --allow-file-access-from-files "file:///%CD:\=/%/index.html?data=./examples/example-data.json&layout=./examples/example-layout.json"
```

`%CD:\=/%` changes the current directory's backslashes to forward slashes for
the file URL. If Chrome is installed per user, use
`%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe` instead; older system-wide
installations may use `%ProgramFiles(x86)%`.

This flag permits local pages to read other local files. Use this profile for
trusted local studies. Close all windows using this profile before changing its
launch flags. This is a Chrome/Chromium-specific option, rather than a portable
browser feature; if the browser still rejects the fetch, use a server or the
embedded HTML option.

## No server: generate an HTML copy with both JSON files embedded

This option uses normal browser settings. A short Node.js script reads the two
JSON files and inserts calls to the page's existing `loadFile()` function after
the app script. The browser then receives the data directly, without fetching
the JSON files.

Save the following as `make-study.cjs` in `tools/indicator-study/`. It uses only
Node.js built-ins; no npm installation is needed:

```javascript
const { readFileSync, writeFileSync } = require('node:fs');

const [dataPath, layoutPath] = process.argv.slice(2);
if (!dataPath || !layoutPath) {
  throw new Error('Usage: node make-study.cjs data.json layout.json');
}

const inlineJson = path => JSON.stringify(JSON.parse(readFileSync(path, 'utf8')))
  .replaceAll('<', '\\u003c');

const script = `<script>
loadFile(${inlineJson(layoutPath)}, 'embedded layout');
loadFile(${inlineJson(dataPath)}, 'embedded data');
</script>`;

const html = readFileSync('index.html', 'utf8');
writeFileSync('study.html', html.replace('</body>', () => `${script}\n</body>`));
```

Escaping `<` keeps JSON strings containing HTML, such as `</script>`, from
terminating the inserted script. Loading the layout first lets the data render
with that layout immediately.

Generate the copy with the same command in Bash or Command Prompt:

```sh
node make-study.cjs ./examples/example-data.json ./examples/example-layout.json
```

Then open it in Ubuntu Bash:

```bash
xdg-open ./study.html
```

Or in Windows Command Prompt:

```bat
start "" "study.html"
```

Both files load automatically. Keep `study.html` beside `d3-primitives.js`, and
open it without `data`/`layout` URL parameters. The output embeds a snapshot of
both JSON files and is overwritten each time you run the script. Regenerate it
after changing the data, layout, or `index.html`. D3 still comes from the CDN.

## Paths and troubleshooting

- `layout` is optional when using URL parameters. With only `data`, the page
  generates a layout automatically.
- Relative JSON URLs resolve from the page URL, not from the shell's current
  directory. With a server rooted at `tools/indicator-study/`, use
  `./examples/example-data.json`, not a full filesystem path.
- Use forward slashes in URLs on both operating systems. Encode special
  characters in JSON paths: space as `%20`, `&` as `%26`, `#` as `%23`, and `+`
  as `%2B`. Keep the complete URL quoted in the shell.
- For JSON hosted on a different origin, that server must allow browser access
  through CORS. Serving the page and JSON from the same local server avoids
  this issue.
- If port 8080 is occupied, choose another port with `-p` (http-server) or the
  positional port argument (Python), and update the browser URL accordingly.
- Closing the browser does not stop a background HTTP server. Stop it explicitly
  when finished.
- A blank page or `d3 is not defined` can mean the CDN script could not load.
  Check internet access and the browser's developer console.
