// .js -> por defecto utiliza CommonJS
// .mjs -> para utilizar ES Modules
// .cjs -> para utilizar CommonJS

import { sum, sub, mult } from "./sum.mjs"

console.log(sum(2, 3));

console.log(sub(2, 3));

console.log(mult(2, 3));