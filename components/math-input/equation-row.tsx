"use client";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { EquationTerm } from "./equation-term";
import { CoefficientInput } from "./coefficient-input";

import { useSystemOfEquationsStore } from "../../app/system-of-equations/hooks/use-system-of-equations";

type EquationRowProps = {
  isEditable: boolean;
  coefficientRow: string[];
  result: string;
  onCoefficientChange: (newCoefficient: string, colIndex: number) => void;
  onResultChange: (newResult: string) => void;
};

export const EquationRow = ({
  isEditable = false,
  coefficientRow,
  result,
  onCoefficientChange,
  onResultChange,
}: EquationRowProps) => {
  const variables = useSystemOfEquationsStore((state) => state.variables);
  const setVariableElement = useSystemOfEquationsStore(
    (state) => state.setVariableElement
  );

  return (
    <tr className="border-0 hover:bg-muted/0">
      {coefficientRow.map((coefficient, colIndex) => (
        <td key={colIndex} className="py-0.5 px-0.5">
          <div className="flex items-center space-x-1">
            {colIndex ? <InlineMath>+</InlineMath> : <></>}
            <EquationTerm
              coefficient={coefficient}
              variable={variables[colIndex]}
              editable={isEditable}
              onCoefficientChange={(newCoefficient) =>
                onCoefficientChange(newCoefficient, colIndex)
              }
              onVariableChange={(newVariable) =>
                setVariableElement(newVariable, colIndex)
              }
            />
          </div>
        </td>
      ))}
      <td className="py-0 px-0.5">
        <div className="flex items-center space-x-1">
          <InlineMath>=</InlineMath>
          <CoefficientInput
            coefficient={result}
            onCoefficientChange={(newResult) => onResultChange(newResult)}
          />
        </div>
      </td>
    </tr>
  );
};
