import { DataPoint } from "@/hooks/use-interpolation";

const math = require("mathjs");
const algebrite = require("algebrite");

const getDelta = (data: DataPoint[]): string => {
  let delta = "";

  const size = data.length;
  for (let i = 0; i < size; i++) {
    delta = delta.concat(`(x-${data[i].x})*`);
  }

  return delta.slice(0, delta.length - 1); // Remove last *
};

export const lagrange = (data: DataPoint[]): string => {
  let polynomial = "";
  const delta = getDelta(data);

  const size = data.length;
  for (let i = 0; i < size; i++) {
    if (data[i].y === 0) continue;

    const currentDelta = delta.replace(`(x-${data[i].x})`, "1"); // Change term to multiplication by 1
    const numerator = math.simplify(currentDelta).toString(); // Removes multiplication by 1
    const denominator = currentDelta.replaceAll("x", `${data[i].x}`); // Set current x value
    const coefficient = algebrite
      .run(`${data[i].y}/(${denominator})`)
      .replaceAll("...", ""); // Clean up any decimals i.e. 2.1457...

    polynomial = polynomial.concat(`(${coefficient}) * ${numerator} + `);
  }
  polynomial = polynomial.slice(0, polynomial.length - 2); // Remove last '+ '
  return polynomial;
};
