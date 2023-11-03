import { create } from "zustand";

type SystemOfEquationsStore = {
  size: number;
  maxSize: number;
  minSize: number;
  setSize: (newSize: number) => void;

  coefficients: string[][];
  setCoefficients: (newCoefficients: string[][]) => void;
  setCoefficientElement: (
    newCoefficientElement: string,
    row: number,
    column: number
  ) => void;

  variables: string[];
  setVariables: (newVariables: string[]) => void;
  setVariableElement: (newVariableElement: string, index: number) => void;

  equalities: string[];
  setEqualities: (newEqualities: string[]) => void;
  setEqualityElement: (newEqualityElement: string, index: number) => void;

  onIncrementSize: () => void;
  onDecrementSize: () => void;
  onClear: () => void;
};

const getDefaultCoefficientValues = (size: number) => {
  return Array.from({ length: size }, () => Array(size).fill(""));
};

const getDefaultVariableValues = (size: number) => {
  return Array.from({ length: size }).map((_, i) => `x_{${i + 1}}`);
};

const getDefaultEqualityValues = (size: number) => {
  return Array(size).fill("");
};

const initialSize = 3;
const initialMaxSize = 10;
const initialMinSize = 2;
const initialCoefficients = getDefaultCoefficientValues(initialSize);
const initialVariables = getDefaultVariableValues(initialSize);
const initialResults = getDefaultEqualityValues(initialSize);

export const useSystemOfEquationsStore = create<SystemOfEquationsStore>(
  (set, get) => ({
    size: initialSize,
    minSize: initialMinSize,
    maxSize: initialMaxSize,
    coefficients: initialCoefficients,
    variables: initialVariables,
    equalities: initialResults,
    setSize: (newSize) => {
      const size = get().size;
      const minSize = get().minSize;
      const maxSize = get().maxSize;

      if (newSize < minSize || newSize > maxSize) return;

      set({ size: newSize });
      newSize > size ? get().onIncrementSize() : get().onDecrementSize();
    },
    setCoefficients: (newCoefficients) => {
      set({ coefficients: newCoefficients });
    },
    setCoefficientElement: (newCoefficientElement, row, column) => {
      const updatedCoefficients = [...get().coefficients];
      updatedCoefficients[row][column] = newCoefficientElement;
      set({ coefficients: updatedCoefficients });
    },
    setVariables: (newVariables) => {
      set({ variables: newVariables });
    },
    setVariableElement: (newVariableElement, index) => {
      const updatedVariables = [...get().variables];
      updatedVariables[index] = newVariableElement;
      set({ variables: updatedVariables });
    },
    setEqualities: (newResults) => {
      set({ equalities: newResults });
    },
    setEqualityElement: (newResultsElement, index) => {
      const updatedResults = [...get().equalities];
      updatedResults[index] = newResultsElement;
      set({ equalities: updatedResults });
    },
    onIncrementSize: () => {
      const size = get().size;
      const currentVariables = [...get().variables];
      const currentCoefficients = [...get().coefficients];
      const currentEqualities = [...get().equalities];

      // Add a new empty term to the end of each existing coefficients row
      const updatedCoefficients = currentCoefficients.map((row) => [
        ...row,
        "",
      ]);

      // Add a new empty row or with the corresponding new value
      get().setCoefficients([...updatedCoefficients, Array(size).fill("")]);
      get().setVariables([...currentVariables, `x_{${size}}`]);
      get().setEqualities([...currentEqualities, ""]);
    },
    onDecrementSize: () => {
      const currentVariables = [...get().variables];
      const currentCoefficients = [...get().coefficients];
      const currentResults = [...get().equalities];

      // Remove the last term from each existing row
      const updatedCoefficientRows = currentCoefficients.map((row) => {
        const newRow = [...row];
        newRow.pop();
        return newRow;
      });

      // Remove the last row
      updatedCoefficientRows.pop();
      currentVariables.pop();
      currentResults.pop();
      const updatedCoefficients = updatedCoefficientRows;
      const updatedVariables = currentVariables;
      const updatedResults = currentResults;

      get().setCoefficients(updatedCoefficients);
      get().setEqualities(updatedResults);
      get().setVariables(updatedVariables);
    },
    onClear: () => {
      const size = get().size;
      get().setCoefficients(getDefaultCoefficientValues(size));
      get().setVariables(getDefaultVariableValues(size));
      get().setEqualities(getDefaultEqualityValues(size));
    },
  })
);
