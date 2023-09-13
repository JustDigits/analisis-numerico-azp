"use client";

export const syntheticDivision = (
  root: number,
  coefficients: number[]
): { additionRow: number[]; resultsRow: number[] } => {
  // coefficients + additionRow = resultsRow
  const additionRow: number[] = [];
  const resultsRow: number[] = [];

  let currentAdditionValue = 0;
  for (let i = 0; i < coefficients.length; i++) {
    additionRow.push(currentAdditionValue);
    resultsRow.push(coefficients[i] + additionRow[i]);
    currentAdditionValue = root * resultsRow[i];
  }

  return { additionRow, resultsRow };
};

const performBiergeVietaIteration = (
  root: number,
  coefficients: number[]
): { newRoot: number; newSteps: number[][] } => {
  const length = coefficients.length;
  const newSteps: number[][] = [];

  newSteps.push([root]);

  // Value of P(x)
  const {
    additionRow: firstIterationAdditionRow,
    resultsRow: firstIterationResultsRow,
  } = syntheticDivision(root, coefficients);
  newSteps.push(
    coefficients,
    firstIterationAdditionRow,
    firstIterationResultsRow
  );

  // Check if current root is a root of P(x)
  if (firstIterationResultsRow[length - 1] == 0)
    return { newRoot: root, newSteps };

  // Value of P'(x)
  const newCoefficients = [...firstIterationResultsRow];
  newCoefficients.pop();

  const {
    additionRow: secondIterationAdditionRow,
    resultsRow: secondIterationResultsRow,
  } = syntheticDivision(root, newCoefficients);
  newSteps.push(secondIterationAdditionRow, secondIterationResultsRow);

  const newRoot =
    root -
    firstIterationResultsRow[length - 1] /
      secondIterationResultsRow[length - 2];
  return { newRoot, newSteps };
};

export const solveByBirgeVieta = (
  coefficients: number[],
  iteraciones: number = 10,
  tolerancia: number = 0
): { steps: number[][][]; root: number } => {
  const steps: number[][][] = [];

  const length = coefficients.length;
  let root = -coefficients[length - 1] / coefficients[length - 2];

  for (let i = 0; i < iteraciones; i++) {
    const { newRoot, newSteps } = performBiergeVietaIteration(
      root,
      coefficients
    );
    steps.push(newSteps);

    if (root == newRoot) {
      break;
    }
    root = newRoot;
  }
  return { steps, root };
};
