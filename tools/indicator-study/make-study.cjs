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
