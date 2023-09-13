"use client";

export const renderRowSwap = (i: number, j: number) => {
  return `
    R_{${i}} \\leftrightarrow R_{${j}}
  `;
};

export const renderMatrix = (matrix: string[][]): string => {
  return `
    \\begin{pmatrix}
        ${parseMatrixAsLatex(matrix)}
    \\end{pmatrix}
    `;
};

export const renderVector = (vector: string[]): string => {
  return `
    \\begin{pmatrix}
        ${parseVectorAsLatex(vector)}
    \\end{pmatrix}
    `;
};

export const renderAugmentedMatrix = (
  left: string[][],
  right: string[]
): string => {
  return parseAugmentedMatrixAsLatex(
    parseMatrixAsLatex(left),
    parseVectorAsLatex(right)
  );
};

type AugmentedMatrixParams =
  | { type: "combine"; left: string[][]; right: string[][] | string[] }
  | { type: "insert"; matrix: string[][]; position: number };

export const renderAugmentedMatrixTest = (
  params: AugmentedMatrixParams
): string => {
  switch (params.type) {
    case "combine":
      const leftParsed = parseMatrixAsLatex(params.left);
      const rightParsed = Array.isArray(params.right[0])
        ? parseMatrixAsLatex(params.right as string[][])
        : parseVectorAsLatex(params.right as string[]);

      return parseAugmentedMatrixAsLatex(leftParsed, rightParsed);

    case "insert":
      const splitPosition = params.position;
      const leftPart = parseMatrixAsLatex(
        params.matrix.map((row) => row.slice(0, splitPosition))
      );
      const rightPart = parseMatrixAsLatex(
        params.matrix.map((row) => row.slice(splitPosition))
      );

      return parseAugmentedMatrixAsLatex(leftPart, rightPart);

    default:
      return "";
  }
};

const parseMatrixAsLatex = (matrix: string[][]): string => {
  return matrix.map((elem) => elem.join(" & ")).join(" \\\\ ");
};

const parseVectorAsLatex = (vector: string[]): string => {
  return vector.join(" \\\\ ");
};

const parseAugmentedMatrixAsLatex = (left: string, right: string): string => {
  return `
  \\left(
    \\begin{matrix}
      ${left}
    \\end{matrix}
    \\;
    \\left|
      \\;
      \\begin{matrix}
        ${right}
      \\end{matrix}
    \\right.
  \\right)
  `;
};
