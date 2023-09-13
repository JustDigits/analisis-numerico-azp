import { create } from "zustand";

type StepHistoryStore = {
  steps: string[];
  solution: string;
  setSteps: (newSteps: string[]) => void;
  setStepElement: (newStep: string, index: number) => void;
  setSolution: (newSolution: string) => void;
  onClear: () => void;
};

const getDefaultSteps = (): string[] => {
  return Array.from({ length: 0 });
};

const getDefaultSolution = (): string => {
  return "";
};

const initialSteps = getDefaultSteps();
const initialSolution = getDefaultSolution();

export const useStepHistoryStore = create<StepHistoryStore>((set, get) => ({
  steps: initialSteps,
  solution: initialSolution,
  setSteps: (newSteps) => {
    set({ steps: newSteps });
  },
  setStepElement: (newStepElement, index) => {
    const updatedSteps = [...get().steps];
    updatedSteps[index] = newStepElement;
    set({ steps: updatedSteps });
  },
  setSolution: (newSolution) => {
    set({ solution: newSolution });
  },
  onClear: () => {
    get().setSteps(getDefaultSteps());
    get().setSolution(getDefaultSolution());
  },
}));
