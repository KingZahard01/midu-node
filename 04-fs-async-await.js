const { readFile } = require("node:fs/promises");

// IIFE - Inmediatly Invoked Function Expression
(async () => {
  console.log("Leyendo el primer archivo...");
  const text = await readFile("./02-text.txt", "utf-8");
  console.log("Primer texto", text);

  console.log("Haciendo cosas mientras lee el archivo");

  console.log("Leyendo el segundo archivo...");
  const secondText = await readFile("./03-text.txt", "utf-8");
  console.log("Segundo texto", secondText);
})();
