"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { renderSystemOfEquations } from "@/components/math-ui/system-of-equations";
import { useSystemOfEquationsStore } from "../hooks/use-system-of-equations";

import { EquationRow } from "../../../components/math-input/equation-row";
import {
  SystemOfEquationsTopOptions,
  SystemOfEquationsBottomOptions,
} from "./system-of-equations-options";
import { ShowSolution } from "./show-solution";

const SystemOfEquationsBody = () => {
  const size = useSystemOfEquationsStore((state) => state.size);
  const results = useSystemOfEquationsStore((state) => state.results);
  const coefficients = useSystemOfEquationsStore((state) => state.coefficients);
  const setCoefficientElement = useSystemOfEquationsStore(
    (state) => state.setCoefficientElement
  );
  const setResultElement = useSystemOfEquationsStore(
    (state) => state.setResultElement
  );

  return (
    <div className="flex items-center justify-center">
      <InlineMath>{renderSystemOfEquations(size)}</InlineMath>
      <table>
        <tbody>
          {coefficients.map((_, rowIndex) => (
            <EquationRow
              isEditable={!rowIndex}
              coefficientRow={coefficients[rowIndex]}
              result={results[rowIndex]}
              onCoefficientChange={(newCoefficient, colIndex) =>
                setCoefficientElement(newCoefficient, rowIndex, colIndex)
              }
              onResultChange={(newResult) =>
                setResultElement(newResult, rowIndex)
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SystemOfEquationsInput = () => {
  return (
    <div className="mx-52">
      <div className="flex items-center border-b">
        <div className="inline-block py-2">
          <SystemOfEquationsTopOptions />
          <SystemOfEquationsBody />
          <SystemOfEquationsBottomOptions />
        </div>
      </div>
      <ShowSolution />
    </div>
  );
};
