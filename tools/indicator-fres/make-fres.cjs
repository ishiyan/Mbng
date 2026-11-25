const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const { dirname, join } = require('node:path');

const args = process.argv.slice(2);
if (args.length < 1 || args.length > 3) {
  throw new Error('Usage: node make-fres.cjs <fres-data.json> [fres-layout.json] [output.html]');
}

const dataPath = args[0];
let layoutPath = null;
let outputPath = 'fres.html';

if (args.length === 2) {
  if (args[1].toLowerCase().endsWith('.json')) {
    layoutPath = args[1];
  } else {
    outputPath = args[1];
  }
} else if (args.length === 3) {
  layoutPath = args[1];
  outputPath = args[2];
}

const inlineJson = filePath => JSON.stringify(JSON.parse(readFileSync(filePath, 'utf8')))
  .replaceAll('<', '\\u003c');

const calls = [];
if (layoutPath) {
  calls.push(`loadFile(${inlineJson(layoutPath)}, 'embedded layout');`);
}
calls.push(`loadFile(${inlineJson(dataPath)}, 'embedded data');`);

const script = `<script>\n${calls.join('\n')}\n</script>`;

const html = readFileSync(join(__dirname, 'index.html'), 'utf8')
  .replace('</body>', () => `${script}\n</body>`);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, html);
