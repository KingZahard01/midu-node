const fs = require('node:fs')

console.log('Leyendo el primer archivo...')
fs.readFile('./02-text.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Error del primer erchivo', err)
    return
  }
  console.log('Primer texto:', text)
})

console.log('Haciendo cosas mientras lee el archivo')

console.log('Leyendo el segundo archivo...')
fs.readFile('./03-text.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Error del primer erchivo', err)
    return
  }
  console.log('Segundo texto:', text)
})
