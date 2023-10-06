import { DataPoint } from "@/hooks/use-interpolation";

const getDelta = (data: DataPoint[]): string => {
  let delta = "";

  const size = data.length;
  for (let i = 0; i < size; i++) {
    delta = delta.concat(`(x-${data[i].x})*`);
  }

  return delta.slice(0, delta.length - 1); // Remove last *
};

const math = require("mathjs");
export const lagrange = (data: DataPoint[]): string => {
  let polynomial = "";
  const delta = getDelta(data);

  const size = data.length;
  for (let i = 0; i < size; i++) {
    const currentDelta = delta.replace(`(x-${data[i].x})`, "1"); // Change term to multiplication by 1
    const numerator = math.simplify(currentDelta).toString(); // Removes multiplication by 1
    const denominator = currentDelta.replaceAll("x", `${data[i].x}`); // Set current x value

    const coefficient = math.simplify(`${data[i].y}/(${denominator})`);
    polynomial = polynomial.concat(`(${coefficient}) * ${numerator} + `);
  }
  polynomial = polynomial.slice(0, polynomial.length - 2); // Remove last '+ '
  return polynomial;
};
