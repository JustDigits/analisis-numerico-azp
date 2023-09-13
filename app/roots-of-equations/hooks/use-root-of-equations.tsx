import { create } from "zustand";

type RootsOfEquationsStore = {
  degree: number;
  coefficients: string[];
  variables: string[];
  roots: number[];
  setDegree: (value: number) => void;
  setCoefficients: (array: string[]) => void;
  setVariables: (array: string[]) => void;
  setRoots: (array: number[]) => void;
  setCoefficientElement: (value: string, index: number) => void;
  setVariableElement: (value: string, index: number) => void;
  setRootElement: (value: number, index: number) => void;
  onClear: () => void;
  steps: number[][][];
  setSteps: (array3D: number[][][]) => void;
  setStepIteration: (matrix: number[][], index: number) => void;
  onStepClear: () => void;
};

const getDefaultRoots = (size: number): number[] => {
  return Array.from({ length: size });
};

const getDefaultCoefficients = (degree: number): string[] => {
  return Array(degree).fill("");
};

const getDefaultVariables = (degree: number): string[] => {
  const getVariable = (degree: number) => {
    if (degree >= 2) return `x^{${degree}}`;
    else if (degree == 1) return `x`;
    return ` `;
  };

  return Array.from({ length: degree }).map((_, i) =>
    getVariable(degree - 1 - i)
  );
};

const getDefaultSteps = () => {
  return [];
};

const minDegree = 3;
const maxDegree = 6;
const initialDegree = 4;

export const useRootsOfEquationsStore = create<RootsOfEquationsStore>(
  (set, get) => ({
    degree: initialDegree,
    coefficients: getDefaultCoefficients(initialDegree),
    variables: getDefaultVariables(initialDegree),
    roots: getDefaultRoots(initialDegree - 1),
    setDegree: (value) => {
      if (value < minDegree || value > maxDegree) return;

      set({ degree: value });

      const degree = get().degree;
      get().setCoefficients(getDefaultCoefficients(degree));
      get().setVariables(getDefaultVariables(degree));
      get().setRoots(getDefaultRoots(degree - 1));
    },
    setCoefficients: (array) => {
      set({ coefficients: array });
    },
    setVariables: (array) => {
      set({ variables: array });
    },
    setRoots: (array) => {
      set({ roots: array });
    },
    setCoefficientElement: (value, index) => {
      const updatedCoefficients = [...get().coefficients];
      updatedCoefficients[index] = value;
      set({ coefficients: updatedCoefficients });
    },
    setVariableElement: (value, index) => {
      const updatedVariables = [...get().variables];
      updatedVariables[index] = value;
      set({ variables: updatedVariables });
    },
    setRootElement: (value, index) => {
      const updatedRoots = [...get().roots];
      updatedRoots[index] = value;
      set({ roots: updatedRoots });
    },
    onClear: () => {
      const degree = get().degree;
      get().setCoefficients(getDefaultCoefficients(degree));
      get().setVariables(getDefaultVariables(degree));
      get().setRoots(getDefaultRoots(degree));
    },
    steps: [],
    setSteps: (array3D) => {
      set({ steps: array3D });
    },
    setStepIteration: (matrix, index) => {
      const updatedSteps = [...get().steps];
      updatedSteps[index] = matrix;
      set({ steps: updatedSteps });
    },
    onStepClear: () => {
      set({ steps: getDefaultSteps() });
    },
  })
);
