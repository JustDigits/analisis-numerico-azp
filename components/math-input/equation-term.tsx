"use client";

import { CoefficientInput } from "./coefficient-input";
import { VariableInput } from "./variable-input";

type EquationTermProps = {
  coefficient: string;
  variable: string;
  editable: boolean;
  onCoefficientChange: (newCoefficient: string) => void;
  onVariableChange: (newVariable: string) => void;
};

export const EquationTerm = ({
  coefficient,
  variable,
  editable,
  onCoefficientChange,
  onVariableChange,
}: EquationTermProps) => {
  return (
    <div className="flex items-center space-x-1">
      <CoefficientInput
        coefficient={coefficient}
        onCoefficientChange={onCoefficientChange}
      />
      <VariableInput
        variable={variable}
        onVariableChange={onVariableChange}
        isEditable={editable}
      />
    </div>
  );
};
