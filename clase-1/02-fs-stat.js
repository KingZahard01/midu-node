const fs = require('node:fs')

const stats = fs.statSync('./02-text.txt')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)
