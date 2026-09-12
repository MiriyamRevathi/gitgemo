import fs from 'node:fs'; import path from 'node:path';
const root=path.resolve('src'), skip=new Set(['node_modules','dist','coverage','generated','tests','__tests__']);
const ext=new Set(['.ts','.tsx','.js','.jsx','.mjs','.cjs']); let total=0,files=0;
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(skip.has(e.name))continue;const p=path.join(d,e.name);
if(e.isDirectory())walk(p);else if(ext.has(path.extname(e.name))){total+=fs.readFileSync(p,'utf8').split(/\r?\n/).filter(x=>x.trim()).length;files++;}}}
walk(root); console.log(`Production source lines: ${total.toLocaleString()}`); console.log(`Production source files: ${files}`); if(total<600000)process.exit(1);
