const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { dirname, join } = require('node:path');

const [dataPath, layoutPath, outputPath = 'study.html'] = process.argv.slice(2);
if (!dataPath || !layoutPath) {
  throw new Error('Usage: node make-study.cjs data.json layout.json [output.html]');
}

const inlineJson = filePath => JSON.stringify(JSON.parse(readFileSync(filePath, 'utf8')))
  .replaceAll('<', '\\u003c');

const primitives = readFileSync(join(__dirname, 'd3-primitives.js'), 'utf8')
  .replaceAll('</script', '<\\/script');

const script = `<script>
loadFile(${inlineJson(layoutPath)}, 'embedded layout');
loadFile(${inlineJson(dataPath)}, 'embedded data');
</script>`;

const html = readFileSync(join(__dirname, 'index.html'), 'utf8')
  .replace('<script src="d3-primitives.js"></script>', () => `<script>\n${primitives}\n</script>`)
  .replace('</body>', () => `${script}\n</body>`);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, html);
