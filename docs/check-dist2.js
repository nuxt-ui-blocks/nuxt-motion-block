import fs from 'fs';
const html = fs.readFileSync('docs/dist/index.html', 'utf8');
const match = html.match(/href="(\/_nuxt\/[^"]+)"/);
console.log(match ? match[1] : 'No match');
