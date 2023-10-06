import { create } from "zustand";

import {
  MatrixStepHistory,
  wrapWithMatrixStepHistory,
} from "../../components/step-history/matrix-step-history";

type MatrixStepHistoryStore = {
  steps: MatrixStepHistory;
  setSteps: (newSteps: MatrixStepHistory) => void;

  onClear: () => void;
};

const getDefaultSteps = (): MatrixStepHistory => {
  return wrapWithMatrixStepHistory();
};

const initialSteps = getDefaultSteps();

export const useMatrixStepHistoryStroe = create<MatrixStepHistoryStore>(
  (set, get) => ({
    steps: initialSteps,
    setSteps: (newSteps) => {
      set({ steps: newSteps });
    },
    onClear: () => {
      get().setSteps(getDefaultSteps());
    },
  })
);
