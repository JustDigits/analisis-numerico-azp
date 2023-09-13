import { create } from "zustand";

type StepsStore = {
  steps: number[][][];
  setSteps: (array3D: number[][][]) => void;
  onClear: () => void;
};

const getDefaultSteps = () => {
  return [];
};

export const useStepsStore = create<StepsStore>((set) => ({
  steps: getDefaultSteps(),
  setSteps: (array3D) => {
    set({ steps: array3D });
  },
  onClear: () => {
    set({ steps: getDefaultSteps() });
  },
}));
