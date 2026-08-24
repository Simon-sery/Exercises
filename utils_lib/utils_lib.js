import { randomNummer } from "../utils_lib/utils_lib.js";

//function randomNummer(max) {
//return Math.ceil(Math.random() * max);
//}

const randomNr = randomNummer(100);

console.log("randomNr", randomNr);
export function randomNummer(max) {
  return Math.ceil(Math.random() * max);
}
