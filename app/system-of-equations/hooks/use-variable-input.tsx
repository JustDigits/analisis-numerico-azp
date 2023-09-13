import { create } from "zustand";

type VariableInputStore = {
  editable: boolean;
  variable: string;
  setEditable: (newEditable: boolean) => void;
  setVariable: (newVariable: string) => void;
};

export const useVariableInputStore = create<VariableInputStore>((set) => ({
  editable: false,
  variable: "",
  setEditable: (newEditable: boolean) => set({ editable: newEditable }),
  setVariable: (newVariable: string) => set({ variable: newVariable }),
}));