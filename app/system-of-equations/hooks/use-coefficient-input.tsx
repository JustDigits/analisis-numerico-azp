import { create } from "zustand";

type CoefficientInputStore = {
  coefficient: string;
  setCoefficient: (newCoefficient: string) => void;
};

export const useCoefficientInputStore = create<CoefficientInputStore>((set) => ({
  coefficient: "",
  setCoefficient: (newCoefficient: string) =>
    set({ coefficient: newCoefficient }),
}));
