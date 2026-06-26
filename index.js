import { Drug, Pharmacy } from "./pharmacy.js";
import { writeFile } from "node:fs/promises";

const drugs = [
  new Drug("Doliprane", 20, 30),
  new Drug("Herbal Tea", 10, 5),
  new Drug("Fervex", 12, 35),
  new Drug("Magic Pill", 15, 40),
  new Drug("Dafalgan", 10, 20),
];

const pharmacy = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
}

await writeFile("output.json", JSON.stringify({ result: log }, null, 2) + "\n");
console.log("success");