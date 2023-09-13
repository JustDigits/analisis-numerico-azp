import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { EquationTerm } from "@/components/math-input/equation-term";

type PolynomialProps = {
  editableVariables: boolean;
  coefficients: string[];
  variables: string[];
  onCoefficientChange: (value: string, index: number) => void;
  onVariableChange: (value: string, index: number) => void;
};

export const Polynomial = ({
  editableVariables = false,
  coefficients,
  variables,
  onCoefficientChange,
  onVariableChange,
}: PolynomialProps) => {
  return (
    <div className="flex py-4">
      {coefficients.map((coefficient, index) => (
        <div key={index} className="flex items-center space-x-1 py-0.5 px-0.5">
          {index ? <InlineMath>+</InlineMath> : <></>}
          <EquationTerm
            coefficient={coefficient}
            variable={variables[index]}
            editable={editableVariables}
            onCoefficientChange={(value) => onCoefficientChange(value, index)}
            onVariableChange={(value) => onVariableChange(value, index)}
          />
        </div>
      ))}
    </div>
  );
};
