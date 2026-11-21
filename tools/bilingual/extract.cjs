// Read trusted local lesson data without a browser or dependencies.
const fs = require('node:fs');
const vm = require('node:vm');
const sandbox = {window: {}};
vm.createContext(sandbox);
for (const file of ['cg', 'ip']) vm.runInContext(fs.readFileSync(`visdat/${file}.js`, 'utf8'), sandbox);
fs.writeFileSync('graphify-out/bilingual-original.json', JSON.stringify(sandbox.window, null, 2));
