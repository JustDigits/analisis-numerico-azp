import { create } from "zustand";

type SystemOfEquationsStore = {
  size: number;
  minSize: number;
  maxSize: number;
  coefficients: string[][];
  variables: string[];
  results: string[];
  setSize: (newSize: number) => void;
  setMinSize: (newMinSize: number) => void;
  setMaxSize: (newMaxSize: number) => void;
  onIncrementSize: () => void;
  onDecrementSize: () => void;
  onClear: () => void;
  setCoefficients: (newCoefficients: string[][]) => void;
  setCoefficientRow: (newCoefficientRow: string[], row: number) => void;
  setCoefficientElement: (
    newCoefficientElement: string,
    row: number,
    column: number
  ) => void;
  setVariables: (newVariables: string[]) => void;
  setVariableElement: (newVariableElement: string, index: number) => void;
  setResults: (newResults: string[]) => void;
  setResultElement: (newResultElement: string, index: number) => void;
};

const getDefaultCoefficientValues = (size: number) => {
  return Array.from({ length: size }, () => Array(size).fill(""));
};

const getDefaultVariableValues = (size: number) => {
  return Array.from({ length: size }).map((_, i) => `x_{${i + 1}}`);
};

const getDefaultResultValues = (size: number) => {
  return Array(size).fill("");
};

const initialSize = 3;
const initialMinSize = 1;
const initialMaxSize = 10;

const initialCoefficients = getDefaultCoefficientValues(initialSize);
const initialVariables = getDefaultVariableValues(initialSize);
const initialResults = getDefaultResultValues(initialSize);

export const useSystemOfEquationsStore = create<SystemOfEquationsStore>(
  (set, get) => ({
    size: initialSize,
    minSize: initialMinSize,
    maxSize: initialMaxSize,
    coefficients: initialCoefficients,
    variables: initialVariables,
    results: initialResults,
    setSize: (newSize) => {
      const size = get().size;
      const minSize = get().minSize;
      const maxSize = get().maxSize;

      if (newSize < minSize || newSize > maxSize) return;

      set({ size: newSize });
      newSize > size ? get().onIncrementSize() : get().onDecrementSize();
    },
    setMinSize: (newMinSize) => {
      if (newMinSize < 1) return;
      set({ minSize: newMinSize });
    },
    setMaxSize: (newMaxSize) => {
      if (newMaxSize <= get().minSize) return;
      set({ maxSize: newMaxSize });
    },
    onIncrementSize: () => {
      const size = get().size;
      const currentVariables = [...get().variables];
      const currentCoefficients = [...get().coefficients];
      const currentResults = [...get().results];

      // Add a new empty term to the end of each existing coefficients row
      const updatedCoefficients = currentCoefficients.map((row) => [
        ...row,
        "",
      ]);

      // Add a new empty row or with the corresponding new value
      get().setCoefficients([...updatedCoefficients, Array(size).fill("")]);
      get().setVariables([...currentVariables, `x_{${size}}`]);
      get().setResults([...currentResults, ""]);
    },
    onDecrementSize: () => {
      const currentVariables = [...get().variables];
      const currentCoefficients = [...get().coefficients];
      const currentResults = [...get().results];

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
      get().setResults(updatedResults);
      get().setVariables(updatedVariables);
    },
    onClear: () => {
      const size = get().size;
      get().setCoefficients(getDefaultCoefficientValues(size));
      get().setVariables(getDefaultVariableValues(size));
      get().setResults(getDefaultResultValues(size));
    },
    setCoefficients: (newCoefficients) => {
      set({ coefficients: newCoefficients });
    },
    setCoefficientRow: (newCoefficientRow, row) => {
      const updatedCoefficients = [...get().coefficients];
      updatedCoefficients[row] = newCoefficientRow;
      set({ coefficients: updatedCoefficients });
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
    setResults: (newResults) => {
      set({ results: newResults });
    },
    setResultElement: (newResultsElement, index) => {
      const updatedResults = [...get().results];
      updatedResults[index] = newResultsElement;
      set({ results: updatedResults });
    },
  })
);
