"use client";

import {
  wrapWithMatrixStepHistory,
  runWithMatrixStepHistory,
  pushTransformToStepHistory,
  pushMatrixToStepHistory,
  pushRowSwapToStepHistory,
} from "../components/matrix-step-history";
import { getRightMatrix } from "@/components/math-ui/matrix";

const math = require("mathjs");
const algebrite = require("algebrite");

const sanitizeCoefficients = (coefficients: string[][]) => {
  const emptyString = /^$/;
  return coefficients.map((row) =>
    row.map((value) => value.replace(emptyString, "0"))
  );
};

const sanitizeEqualities = (equalities: string[]) => {
  const emptyString = /^$/;
  return equalities.map((value) => value.replace(emptyString, "0"));
};

const isNumericZero = (value: string) => {
  return math.isNumeric(+value) && math.isZero(+value);
};

const det = (M: string[][]) => {
  return algebrite.run(
    `(${M[0][0]}) * (${M[1][1]}) - (${M[1][0]}) * (${M[0][1]})`
  );
};

type Montante = {
  size: number;
  coefficients: string[][];
  equalities: string[];
};
export const montante = ({ size, coefficients, equalities }: Montante) => {
  coefficients = sanitizeCoefficients(coefficients);
  equalities = sanitizeEqualities(equalities);

  /* Augmented matrix of coefficients and equalities */
  const augmentedMatrix = math.concat(
    coefficients,
    math.reshape(equalities, [size, 1])
  );

  let pivot = "1";
  let prevMatrix = math.clone(augmentedMatrix);
  let currentMatrix = math.clone(augmentedMatrix);
  let matrixStepHistrory = wrapWithMatrixStepHistory();

  /* Montante's Method */
  for (let k = 0; k < size; k++) {
    /* Handle zero pivot */
    if (isNumericZero(prevMatrix[k][k])) {
      let hasSolution = false;
      for (let s = k + 1; s < size; s++) {
        if (isNumericZero(prevMatrix[s][k])) continue;

        matrixStepHistrory = runWithMatrixStepHistory(
          matrixStepHistrory,
          math.clone(prevMatrix),
          getRightMatrix(prevMatrix, size),
          pushRowSwapToStepHistory,
          k + 1,
          s + 1
        );

        [prevMatrix[k], prevMatrix[s]] = [prevMatrix[s], prevMatrix[k]];
        currentMatrix = math.clone(prevMatrix);

        hasSolution = true;
      }
      if (!hasSolution) return wrapWithMatrixStepHistory();
    }

    /* Apply Montante's Formula */
    for (let i = 0; i < size; i++) {
      if (k == i) continue;
      for (let j = 0; j <= size; j++) {
        const submatrix = math.subset(prevMatrix, math.index([k, i], [k, j]));
        currentMatrix[i][j] = algebrite
          .run(`(${det(submatrix)}) / (${pivot})`)
          .replace("*", "");
      }
    }

    matrixStepHistrory = runWithMatrixStepHistory(
      matrixStepHistrory,
      prevMatrix,
      getRightMatrix(prevMatrix, size),
      pushTransformToStepHistory
    );

    /* Redefine pivot and matrix for next iteration */
    pivot = prevMatrix[k][k];
    prevMatrix = math.clone(currentMatrix);
  }
  matrixStepHistrory = runWithMatrixStepHistory(
    matrixStepHistrory,
    prevMatrix,
    getRightMatrix(prevMatrix, size),
    pushMatrixToStepHistory
  );

  matrixStepHistrory.result = matrixStepHistrory.result.map(function (value) {
    return algebrite.run(`(${value}) / (${prevMatrix[0][0]})`).replace("*", "");
  });

  return matrixStepHistrory;
};
