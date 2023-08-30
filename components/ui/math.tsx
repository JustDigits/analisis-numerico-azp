"use client";

// Convert each row to a string, where values are separated by &.
const getMatrixAsString = (matrix: number[][]) => {
  return matrix.map((row) => row.join(" & ")).join(" \\\\ ");
};

// Convert each value to a string, where values are separated by \\.
const getVectorAsString = (vector: number[]) => {
  return vector.join(" \\\\ ");
};

export const RenderMatrix = (values: number[][]) => {
  return `
    \\begin{pmatrix}
    ${getMatrixAsString(values)}
    \\end{pmatrix}
  `;
};

export const RenderVector = (values: number[]) => {
  return `
    \\begin{pmatrix}
    ${getVectorAsString(values)}
    \\end{pmatrix}
  `;
};

export const RenderAugmentedMatrix = (left: number[][], right?: number[]) => {
  if (typeof right == "undefined") {
    right = left.map((row) => row[left.length]);
    left = left.map((row) => row.slice(0, left.length));
  } else if (left.length != right.length) return "";

  return `
  \\left(
    \\begin{matrix}
      ${getMatrixAsString(left)}
    \\end{matrix}
    \\;
    \\left|
      \\;
      \\begin{matrix}
        ${getVectorAsString(right)}
      \\end{matrix}
    \\right.
  \\right)
  `;
};

export const RenderSystemBrace = (size: number) => {
  // Repeating the '\\\\' string 'n' times to get the desired number
  // of equations, adding [2pt] for extra spacing between lines.
  const equations = Array(size).fill("\\\\[2pt]").join("");

  return `
    \\left \\{
    \\begin{array}{}
        ${equations}
    \\end{array}
    \\right \.
  `;
};

export const RenderRowSwap = (i: number, j: number) => {
  return `
    R_{${i}} \\leftrightarrow R_{${j}}
  `;
};

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

  return `\\begin{align*}${equations.join(' \\\\ ')}\\end{align*}`;
  return `${equations.join(' \\\\ ')}`;
};

export const SolveByMontantesMethod = (
  coefficients: number[][],
  results: number[]
) => {
  const size = coefficients.length;
  
  let stepHistory = [];
  let solutionValues = "";
  let finalEquationValues = ""

  let prevAugmented = coefficients.map((row, idx) => [...row, results[idx]]);
  let currentAugmented = coefficients.map((row, idx) => [...row, results[idx]]);

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

  const handleZeroPivot = (matrix: number[][], k: number): number[][] => {
    const size = matrix.length;

    for (let s = k + 1; s < size; s++) {
      if (matrix[s][k] == 0) continue;

      [matrix[k], matrix[s]] = [matrix[s], matrix[k]];
      stepHistory.push(RenderRowSwap(k + 1, s + 1));
      stepHistory.push(RenderAugmentedMatrix(prevAugmented));
      return matrix;
    }

    alert("La matriz es singular. El sistema podría no tener solución o tener infinitas soluciones.");
    return [];
  };

  let pivot = 1;
  for (let k = 0; k < size; k++) {
    stepHistory.push(RenderAugmentedMatrix(prevAugmented));

    if (prevAugmented[k][k] == 0) {
      prevAugmented = handleZeroPivot(prevAugmented, k);
      if(prevAugmented.length === 0) {
        stepHistory.length = 0;
        return {finalEquationValues, solutionValues, stepHistory};
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
    stepHistory.push(" {\\large \\sim} ");
  }

  stepHistory.push(RenderAugmentedMatrix(currentAugmented));
  solutionValues = parseSolutions(currentAugmented);
  finalEquationValues = parseEquationTerms(currentAugmented);

  return { finalEquationValues, solutionValues, stepHistory };
};
