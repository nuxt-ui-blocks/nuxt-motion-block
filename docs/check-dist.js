import fs from 'fs';
const html = fs.readFileSync('docs/dist/index.html', 'utf8');
const match = html.match(/href="(\/_nuxt\/[^"]+\.css)"/);
if (match) {
  const fullPath = 'docs/dist' + match[1];
  console.log("Checking:", fullPath);
  console.log("Exists:", fs.existsSync(fullPath));
} else {
  console.log("No CSS match found");
}
