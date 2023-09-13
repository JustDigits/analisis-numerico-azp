import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { useStepHistoryStore } from "../hooks/use-step-history";

export const ShowSolution = () => {
  const steps = useStepHistoryStore((state) => state.steps);
  const solution = useStepHistoryStore((state) => state.solution);

  if (steps.length <= 0) return <></>;

/*   const finalEQS = `
  \\left \\{
  \\begin{array}{}
      ${finalEquationSystem}
  \\end{array}
  \\right \.
`; */

  return (
    <div className="py-2">
      <h2 className="font-bold tracking-tight text-3xl py-3 flex justify-center">
        Paso por paso
      </h2>
      <div className="grid gap-8 justify-center items-center grid-container--fill">
        {steps.map((step, index) => (
          <BlockMath key={index}>{step}</BlockMath>
        ))}
      </div>
      <h2 className="font-bold tracking-tight text-3xl pt-3 flex justify-center">
        Solución del sistema
      </h2>
{/*       <div className="flex justify-center items-center">
        <div className="flex justify-start">
          <BlockMath>{finalEQS}</BlockMath>
        </div>
      </div> */}
      <div className="flex justify-center">
        <BlockMath>{solution}</BlockMath>
      </div>
    </div>
  );
};
