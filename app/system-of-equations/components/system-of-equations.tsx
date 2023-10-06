"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import {
  ModuleOptionsTop,
  ModuleOptionsBottom,
} from "@/components/module/options";
import { EquationRow } from "@/components/math-input/equation-row";
import { SystemOfEquationsSolution } from "./system-of-equations-solution";

import { toastError } from "@/components/toast/toast-error";
import { renderSystemOfEquations } from "@/components/math-ui/system-of-equations";
import { montante } from "../solution-methods/montante";

import { useSystemOfEquationsStore } from "@/hooks/use-system-of-equations";
import { useMatrixStepHistoryStroe } from "@/hooks/step-history/use-matrix-step-history";

const SystemOfEquationsModule = () => {
  const size = useSystemOfEquationsStore((state) => state.size);
  const coefficients = useSystemOfEquationsStore((state) => state.coefficients);
  const variables = useSystemOfEquationsStore((state) => state.variables);
  const equalities = useSystemOfEquationsStore((state) => state.equalities);

  const setCoefficient = useSystemOfEquationsStore(
    (state) => state.setCoefficientElement
  );
  const setVariable = useSystemOfEquationsStore(
    (state) => state.setVariableElement
  );
  const setEquality = useSystemOfEquationsStore(
    (state) => state.setEqualityElement
  );

  return (
    <div className="flex items-center justify-center">
      <InlineMath>{renderSystemOfEquations(size)}</InlineMath>
      <table>
        <tbody>
          {coefficients.map((_, index) => (
            <tr key={index} className="border-0 hover:bg-muted/0">
              <EquationRow
                coefficients={coefficients[index]}
                variables={variables}
                isEqualTo={equalities[index]}
                isEditable={!index}
                onCoefficientChange={(newCoefficient, colIndex) =>
                  setCoefficient(newCoefficient, index, colIndex)
                }
                onVariableChange={(newVaraible, index) =>
                  setVariable(newVaraible, index)
                }
                onIsEqualToChange={(newIsEqualTo) =>
                  setEquality(newIsEqualTo, index)
                }
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SystemOfEquations = () => {
  const size = useSystemOfEquationsStore((state) => state.size);
  const coefficients = useSystemOfEquationsStore((state) => state.coefficients);
  const equalities = useSystemOfEquationsStore((state) => state.equalities);

  const clearStepHistory = useMatrixStepHistoryStroe((state) => state.onClear);
  const clearSystemOfEquations = useSystemOfEquationsStore(
    (state) => state.onClear
  );

  const setSteps = useMatrixStepHistoryStroe((state) => state.setSteps);
  const handleSolve = () => {
    const currentSteps = montante({ size, coefficients, equalities });
    setSteps(currentSteps);

    if (currentSteps.matrix.length === 0) {
      toastError(
        "La matriz es singular. El sistema podría no tener solución o tener soluciones infinitas."
      );
    }
  };

  const handleClear = () => {
    clearStepHistory();
    clearSystemOfEquations();
  };

  return (
    <div className="mx-52">
      <div className="flex items-center border-b">
        <div className="inline-block py-2">
          <ModuleOptionsTop
            size={size}
            maxSize={useSystemOfEquationsStore((state) => state.maxSize)}
            minSize={useSystemOfEquationsStore((state) => state.minSize)}
            setSize={useSystemOfEquationsStore((state) => state.setSize)}
            clearModule={handleClear}
          />
          <SystemOfEquationsModule />
          <ModuleOptionsBottom solveModule={() => handleSolve()} />
        </div>
      </div>
      <SystemOfEquationsSolution />
      <ToastContainer style={{ width: "50%", textAlign: "center" }} />
    </div>
  );
};
