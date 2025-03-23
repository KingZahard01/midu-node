const http = require('node:http')
const { findAvilablePort } = require('./10-free-port.js')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Reqest received')
  res.end('Hola mundo')
})

findAvilablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(
      `Server listening on port http://localhost:${server.address().port}`
    )
  })
})
