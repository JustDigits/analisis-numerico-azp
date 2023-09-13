"use client";

export const renderSystemOfEquations = (
  size: number,
  systemOfEquations?: string[][]
): string => {
  const equations = parseSystemOfEquationsAsLatex(size, systemOfEquations);

  return `\\left\\{\\begin{array}{} ${equations} \\end{array}\\right.`;
};

const parseSystemOfEquationsAsLatex = (
  size: number,
  systemOfEquations?: string[][]
): string => {
  const equations = systemOfEquations
    ? systemOfEquations.map((elem) => elem.join(" + ")).join(" \\\\ ")
    : Array(size).fill(" \\\\[3.3px] ").join("");

  return equations;
};
