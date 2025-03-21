const path = require("node:path");

// barra separadora de carpetas segun SO
console.log(path.sep);

// unir ritas con path.join
const filePath = path.join("content", "subfolder", "text.txt");
console.log(filePath);

// el nombre de un archivo
const base = path.basename("tmp/juanin/password.txt");
console.log(base);

const filename = path.basename("tmp/juanin/password.txt", ".txt");
console.log(filename);

// extension
const extension = path.extname("hola.mundo.jpg");
console.log(extension);
