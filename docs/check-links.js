const fs = require('node:fs')

const content = fs.readFileSync('docs/dist/index.html', 'utf8')
console.log('CSS:', content.match(/href="[^"]+\.css"/g))
console.log('JS:', content.match(/src="[^"]+\.js"/g))
