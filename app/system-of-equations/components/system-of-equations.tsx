"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import {
  ModuleOptionsTop,
  ModuleOptionsBottom,
} from "@/components/module/options";
import { EquationRow } from "@/components/math-input/equation-row";
import { ShowMatrixSteps } from "./show-matrix-steps";

import { montante } from "../solution-methods/montante";
import { renderSystemOfEquations } from "@/components/math-ui/system-of-equations";

import { useSystemOfEquationsStore } from "../hooks/use-system-of-equations";
import { useMatrixStepHistoryStroe } from "../hooks/use-matrix-step-history";

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
  const coefficients = useSystemOfEquationsStore((state) => state.coefficients);
  const equalities = useSystemOfEquationsStore((state) => state.equalities);

  const size = useSystemOfEquationsStore((state) => state.size);
  const maxSize = useSystemOfEquationsStore((state) => state.maxSize);
  const minSize = useSystemOfEquationsStore((state) => state.minSize);
  const setSize = useSystemOfEquationsStore((state) => state.setSize);

  const setSteps = useMatrixStepHistoryStroe((state) => state.setSteps);
  const handleSolve = () => {
    const currentSteps = montante({ size, coefficients, equalities });
    setSteps(currentSteps);

    if (currentSteps.matrix.length === 0) {
      toast.error(
        "La matriz es singular. El sistema podría no tener solución o tener soluciones infinitas.",
        {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const clearSystem = useSystemOfEquationsStore((state) => state.onClear);
  const clearSteps = useMatrixStepHistoryStroe((state) => state.onClear);
  const handleClear = () => {
    clearSystem();
    clearSteps();
  };

  return (
    <div className="mx-52">
      <div className="flex items-center border-b">
        <div className="inline-block py-2">
          <ModuleOptionsTop
            size={size}
            maxSize={maxSize}
            minSize={minSize}
            setSize={setSize}
            clearModule={handleClear}
          />
          <SystemOfEquationsModule />
          <ModuleOptionsBottom solveModule={() => handleSolve()} />
        </div>
      </div>
      <ShowMatrixSteps />
      <ToastContainer style={{ width: "50%", textAlign: "center" }} />
    </div>
  );
};
