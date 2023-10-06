import { create } from "zustand";

export type DataPoint = {
  x: number;
  y: number;
};

type InterpolationStore = {
  data: DataPoint[];
  polynomial: string;
  setDataPoints: (newData: DataPoint[]) => void;
  setPolynomial: (newPolynomial: string) => void;
  onClear: () => void;
};

const getDefaultData = (): DataPoint[] => {
  return [];
};

const getDefaultPolynomial = (): string => {
  return "";
};

export const useInterpolationStore = create<InterpolationStore>((set, get) => ({
  data: getDefaultData(),
  polynomial: getDefaultPolynomial(),
  setDataPoints: (newData) => {
    set({ data: newData });
  },
  setPolynomial: (newPolynomial) => {
    set({ polynomial: newPolynomial });
  },
  onClear: () => {
    get().setDataPoints(getDefaultData());
    get().setPolynomial(getDefaultPolynomial());
  },
}));
