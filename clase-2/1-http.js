const http = require("node:http");

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  // establecer el tipo de contenido de la respuesta
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.statusCode = 200; // OK
    res.end("<h1>Bienvenido a mi página de inicio</h1>");
  } else if (req.url === "/contacto") {
    res.statusCode = 200;
    res.end("<h1>Contacto</h1");
  } else {
    res.statusCode = 404; // Not Found
    res.end("<h1>404</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`);
});

// para reiniciar el servidor automaticamante al hacer cambios en el código, instalar nodemon o usar el comando `node --watch`

// Tipos de respuestas (status codes):
// 1xx: Informational
// 2xx: Success
// 3xx: Redirection
// 4xx: Client Error
// 5xx: Server Error
