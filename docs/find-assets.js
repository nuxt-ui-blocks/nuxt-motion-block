import fs from 'fs';
import path from 'path';

function findFiles(dir, ext) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filePath, ext));
    } else {
      if (filePath.endsWith(ext)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const cssFiles = findFiles('docs/dist', '.css');
console.log("CSS files found in docs/dist:", cssFiles);
const jsFiles = findFiles('docs/dist', '.js');
console.log("JS files found in docs/dist count:", jsFiles.length);
