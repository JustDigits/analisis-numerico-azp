"use client";

import { split } from "postcss/lib/list";

const math = require("mathjs");

export const renderRowSwap = (i: number, j: number) => {
  return `R_{${i}} \\leftrightarrow R_{${j}}`;
};

export const renderVector = (vector: string[]): string => {
  return `\\begin{pmatrix}${parseVectorAsLatex(vector)}\\end{pmatrix}`;
};

export const renderMatrix = (matrix: string[][]): string => {
  return `\\begin{pmatrix}${parseMatrixAsLatex(matrix)}\\end{pmatrix}`;
};

export const renderAugmentedMatrix = (
  matrix: string[][],
  splitIndex: number
): string => {
  const left = getLeftMatrix(matrix, splitIndex);
  const right = getRightMatrix(matrix, splitIndex);

  return parseAugmentedMatrixAsLatex(
    parseMatrixAsLatex(left),
    parseVectorAsLatex(right)
  );
};

const parseMatrixAsLatex = (matrix: string[][]): string => {
  return matrix.map((elem) => elem.join(" & ")).join(" \\\\ ");
};

const parseVectorAsLatex = (vector: string[]): string => {
  return vector.join(" \\\\ ");
};

const parseAugmentedMatrixAsLatex = (left: string, right: string): string => {
  return `\\left(\\begin{matrix}${left}\\end{matrix}\\;\\left|\\;\\begin{matrix}${right}\\end{matrix}\\right.\\right)`;
};

export const getLeftMatrix = (matrix: any, splitIndex: number) => {
  const size = math.size(matrix);
  const rows = size[0];

  return math.subset(
    matrix,
    math.index(math.range(0, rows), math.range(0, splitIndex))
  );
};

export const getRightMatrix = (matrix: any, splitIndex: number) => {
  const size = math.size(matrix);
  const rows = size[0];
  const cols = size[1];

  return math.subset(
    matrix,
    math.index(math.range(0, rows), math.range(splitIndex, cols))
  );
};

// const parseSolutions = (augmentedMatrix: number[][]): string => {
//   const solution = augmentedMatrix.map(
//     (row, idx) => row[row.length - 1] / row[idx]
//   );

//   return solution
//     .map((val, idx) => `x_{${idx + 1}} = ${val}`)
//     .join(", \\quad ");
// };

// const parseEquationTerms = (augmentedMatrix: number[][]): string => {
//   const equations = augmentedMatrix.map((row) => {
//     // Get all coefficients for x values, excluding the last column
//     const coefficients = row.slice(0, -1);

//     // Convert each coefficient into its corresponding LaTeX term (e.g., "3x_1", "5x_2", etc.)
//     const terms = coefficients
//       .map((coeff, colIdx) => {
//         if (coeff === 0) return ""; // Skip terms with a coefficient of 0
//         return `${coeff !== 1 ? coeff : ""} x_{${colIdx + 1}}`;
//       })
//       .filter(Boolean); // Remove any empty strings

//     // Construct and return the complete equation in LaTeX format
//     return `${terms.join(" + ")} &= ${row[row.length - 1]}`;
//   });

//   // Return the equations as a single LaTeX string, with each equation on a new line

//   return `\\begin{align*}${equations.join(" \\\\ ")}\\end{align*}`;
//   return `${equations.join(" \\\\ ")}`;
// };
