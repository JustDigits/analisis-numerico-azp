"use client";

import {
  renderRowSwap,
  renderAugmentedMatrix,
} from "@/components/math-ui/matrix";
import { useStepHistoryStore } from "../hooks/use-step-history";
import { useSystemOfEquationsStore } from "../hooks/use-system-of-equations";

const parseSolutions = (augmentedMatrix: number[][]): string => {
  const solution = augmentedMatrix.map(
    (row, idx) => row[row.length - 1] / row[idx]
  );

  return solution
    .map((val, idx) => `x_{${idx + 1}} = ${val}`)
    .join(", \\quad ");
};

const parseEquationTerms = (augmentedMatrix: number[][]): string => {
  const equations = augmentedMatrix.map((row) => {
    // Get all coefficients for x values, excluding the last column
    const coefficients = row.slice(0, -1);

    // Convert each coefficient into its corresponding LaTeX term (e.g., "3x_1", "5x_2", etc.)
    const terms = coefficients
      .map((coeff, colIdx) => {
        if (coeff === 0) return ""; // Skip terms with a coefficient of 0
        return `${coeff !== 1 ? coeff : ""} x_{${colIdx + 1}}`;
      })
      .filter(Boolean); // Remove any empty strings

    // Construct and return the complete equation in LaTeX format
    return `${terms.join(" + ")} &= ${row[row.length - 1]}`;
  });

  // Return the equations as a single LaTeX string, with each equation on a new line

  return `\\begin{align*}${equations.join(" \\\\ ")}\\end{align*}`;
  return `${equations.join(" \\\\ ")}`;
};

const pushStep = (
  matrix: number[][],
  steps: string[],
  setSteps: (newSteps: string[]) => void
) => {
  const stringArray: string[][] = matrix.map((innerArray) => {
    return innerArray.map((value) => {
      return value.toString();
    });
  });

  const left = stringArray.map((row) => row.slice(0, stringArray.length));
  const right = stringArray.map((row) => row[stringArray.length]);

  const newSteps = [...steps, renderAugmentedMatrix(left, right)];
  setSteps(newSteps);
};

const pushRowOperation = (
  operation: string,
  setSteps: (newSteps: string[]) => void,
  steps: string[]
) => {
  const newSteps = [...steps, operation];
  setSteps(newSteps);
};

const det = (
  values: number[][],
  newPivot: number,
  row: number,
  column: number
) => {
  return (
    values[newPivot][newPivot] * values[row][column] -
    values[row][newPivot] * values[newPivot][column]
  );
};

type Montante = {
  size: number;
  coefficients: number[][];
  results: number[];
  setSolution: (newSolution: string) => void;
  onClear: () => void;
  steps: string[];
  setSteps: (newSteps: string[]) => void;
};

export const solveByMontantesMethod = ({
  size,
  coefficients,
  results,
  setSolution,
  onClear,
  steps,
  setSteps,
}: Montante) => {
  let prevAugmented = coefficients.map((row, idx) => [...row, results[idx]]);
  let currentAugmented = coefficients.map((row, idx) => [...row, results[idx]]);

  const handleZeroPivot = (matrix: number[][], k: number): number[][] => {
    const size = matrix.length;

    for (let s = k + 1; s < size; s++) {
      if (matrix[s][k] == 0) continue;

      [matrix[k], matrix[s]] = [matrix[s], matrix[k]];
      pushRowOperation(renderRowSwap(k + 1, s + 1), setSteps, steps);
      pushStep(prevAugmented, steps, setSteps);
      return matrix;
    }

    alert(
      "La matriz es singular. El sistema podría no tener solución o tener infinitas soluciones."
    );
    return [];
  };

  let pivot = 1;
  for (let k = 0; k < size; k++) {
    pushStep(prevAugmented, steps, setSteps);

    if (prevAugmented[k][k] == 0) {
      prevAugmented = handleZeroPivot(prevAugmented, k);

      if (prevAugmented.length === 0) {
        onClear();
        return <></>;
      }
      currentAugmented = prevAugmented.map((row) => [...row]);
    }

    for (let i = 0; i < size; i++) {
      if (k == i) continue;

      for (let j = 0; j <= size; j++) {
        currentAugmented[i][j] = det(prevAugmented, k, i, j) / pivot;
      }
    }

    pivot = prevAugmented[k][k];
    prevAugmented = currentAugmented.map((row) => [...row]);
    pushRowOperation(" {\\large \\sim} ", setSteps, steps);
  }

  pushStep(currentAugmented, steps, setSteps);
  setSolution(parseSolutions(currentAugmented));
  return <></>;
};
