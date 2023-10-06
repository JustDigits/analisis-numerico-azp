import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

import { renderAugmentedMatrix } from "@/components/math-ui/matrix";

import { useSystemOfEquationsStore } from "@/hooks/use-system-of-equations";
import { useMatrixStepHistoryStroe } from "@/hooks/step-history/use-matrix-step-history";

const parseStep = (
  matrix: string[][],
  size: number,
  operation: string
): string => {
  return renderAugmentedMatrix(matrix, size).concat(operation);
};

const parseSolution = (solution: string[], variables: string[]) => {
  const math = require("mathjs");
  return variables
    .map(
      (variable, index) =>
        `${variable} = ${math.parse(solution[index]).toTex()}`
    )
    .join(", \\quad ");
};

export const SystemOfEquationsSolution = () => {
  const steps = useMatrixStepHistoryStroe((state) => state.steps);
  const size = useSystemOfEquationsStore((state) => state.size);

  const variables = useSystemOfEquationsStore((state) => state.variables);

  if (steps.matrix.length === 0) return <></>;

  return (
    <div className="py-2">
      <h2 className="font-bold tracking-tight text-3xl py-3 flex justify-center">
        Solución paso por paso
      </h2>
      <div className="flex justify-center flex-wrap">
        {steps.matrix.map((matrix, index) => (
          <div key={index} className="px-0.5">
            <BlockMath>
              {parseStep(matrix, size, steps.operation[index])}
            </BlockMath>
          </div>
        ))}
      </div>
      <h2 className="font-bold tracking-tight text-3xl pt-3 flex justify-center">
        Solución del sistema
      </h2>
      <div className="flex justify-center">
        <BlockMath>{parseSolution(steps.result, variables)}</BlockMath>
      </div>
    </div>
  );
};
