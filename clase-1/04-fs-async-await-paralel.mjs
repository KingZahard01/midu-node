import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./02-text.txt', 'utf-8'),
  readFile('./03-text.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('Primer texto', text)
  console.log('Segundo texto', secondText)
})
