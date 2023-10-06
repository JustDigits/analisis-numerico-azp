"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { EquationTerm } from "./equation-term";
import { CoefficientInput } from "./coefficient-input";

import { useSystemOfEquationsStore } from "../../app/system-of-equations/hooks/use-system-of-equations";

type EquationRowProps = {
  isEditable: boolean;
  coefficients: string[];
  variables: string[];
  isEqualTo: string;
  onCoefficientChange: (newCoefficient: string, index: number) => void;
  onVariableChange: (newVariable: string, index: number) => void;
  onIsEqualToChange: (newIsEqualTo: string) => void;
};

export const EquationRow = ({
  coefficients,
  variables,
  isEqualTo,
  isEditable = false,
  onCoefficientChange,
  onVariableChange,
  onIsEqualToChange,
}: EquationRowProps) => {
  return (
    <>
      {coefficients.map((coefficient, index) => (
        <td key={index} className="p-0.5">
          <div className="flex items-center space-x-1">
            {index ? <InlineMath>+</InlineMath> : <></>}
            <EquationTerm
              coefficient={coefficient}
              variable={variables[index]}
              isEditable={isEditable}
              onCoefficientChange={(newCoefficient) =>
                onCoefficientChange(newCoefficient, index)
              }
              onVariableChange={(newVariable) =>
                onVariableChange(newVariable, index)
              }
            />
          </div>
        </td>
      ))}
      <td className="p-0.5">
        <div className="flex items-center space-x-1">
          <InlineMath>=</InlineMath>
          <CoefficientInput
            coefficient={isEqualTo}
            onCoefficientChange={(newIsEqualTo) =>
              onIsEqualToChange(newIsEqualTo)
            }
          />
        </div>
      </td>
    </>
  );
};
