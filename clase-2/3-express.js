const express = require("express");
const ditto = require("./pokemon/ditto.json");

const port = process.env.PORT ?? 1234;

const app = express();
app.disable("x-powered-by");

// midelwares son funciones que se ejecutan antes de las rutas
// se pueden usar para trackear requests, revisar headers, etc.
// se ejecutan en orden, si no se llama a next() no se ejecuta la siguiente funcion

app.use(express.json()); // este middleware convierte el body de la request a JSON y lo guarda en req.body

// app.use((req, res, next) => {
//   if (req.method !== "POST") return next();
//   if (req.headers["content-type"] !== "application/json") return next();

//   // solo llegan requests que son POST y tienen content-type application/json

//   let body = "";

//   // Escuchar el evento 'data'
//   req.on("data", (chunk) => {
//     body += chunk.toString(); // Convertir el Buffer a string
//   });

//   // Escuchar el evento 'end'
//   req.on("end", () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();
//     // mutar la request y meter la informacion en el req.body
//     req.body = data;
//     next();
//   });
// });

app.get("/pokemon/ditto", (req, res) => {
  res.json(ditto);
});

app.post("/pokemon", (req, res) => {
  // req.body deberiamos guardar en una base de datos
  res.status(201).json(req.body);
});

// la ultima ruta debe ir al final
app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
