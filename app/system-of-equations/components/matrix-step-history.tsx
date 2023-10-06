export type MatrixStepHistory = {
  result: string[];
  matrix: string[][][];
  operation: string[];
};

export const wrapWithMatrixStepHistory = (): MatrixStepHistory => {
  return {
    result: [],
    matrix: [],
    operation: [],
  };
};

export const runWithMatrixStepHistory = (
  input: MatrixStepHistory,
  value: string[][],
  result: string[],
  transform: (
    value: string[][],
    result: string[],
    i: number,
    j: number
  ) => MatrixStepHistory,
  i = -1,
  j = -1
): MatrixStepHistory => {
  const newMatrixWithStepHistory = transform(value, result, i, j);
  return {
    result: newMatrixWithStepHistory.result,
    matrix: input.matrix.concat(newMatrixWithStepHistory.matrix),
    operation: input.operation.concat(newMatrixWithStepHistory.operation),
  };
};

export const pushMatrixToStepHistory = (
  x: string[][],
  y: string[]
): MatrixStepHistory => {
  return {
    result: y,
    matrix: [x],
    operation: [""],
  };
};

export const pushTransformToStepHistory = (
  x: string[][],
  y: string[]
): MatrixStepHistory => {
  return {
    result: y,
    matrix: [x],
    operation: ["\\large \\sim"],
  };
};

export const pushRowSwapToStepHistory = (
  x: string[][],
  y: string[],
  i: number,
  j: number
): MatrixStepHistory => {
  return {
    result: y,
    matrix: [x],
    operation: [`R_{${i}} \\leftrightarrow R_{${j}}`],
  };
};
