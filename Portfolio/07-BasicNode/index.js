/* import { randomSuperhero } from "superheroes";
import { randomSupervillain } from "supervillains";

console.log(`${randomSuperhero()} battles ${randomSupervillain()}!`);
*/

// To read the file in input 

import { readFileSync } from "node:fs";

const message = readFileSync("./data/input.txt", "utf8");
console.log(message);