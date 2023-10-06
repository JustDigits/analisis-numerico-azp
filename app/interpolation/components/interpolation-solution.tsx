import { useState } from "react";

import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { NumericInput } from "@/components/math-input/numeric-input";

import { useInterpolationStore } from "@/hooks/use-interpolation";

const math = require("mathjs");
const algebrite = require("algebrite");
const parser = math.parser();

type ShowSolutionProps = {
  polynomial: string;
  lagrangePolynomial: any;
  simplifiedPolynomial: any;
};
const ShowSolution = ({
  polynomial,
  lagrangePolynomial,
  simplifiedPolynomial,
}: ShowSolutionProps) => {
  return (
    <div className="py-2">
      <h2 className="font-bold tracking-tight text-3xl py-3 flex justify-center">
        Solución
      </h2>
      <div className="flex items-center flex-col">
        <p className="text-lg">El polinomio de interpolación de Lagrange es</p>
        <span className="my-4">
          <InlineMath>{`${lagrangePolynomial.toTex()}`}</InlineMath>
        </span>
        <p className="text-lg">El polinomio simplificado es</p>
        <BlockMath>{`f(x) = ${simplifiedPolynomial.toTex()}`}</BlockMath>
      </div>
    </div>
  );
};

type EvaluateSolutionProps = {
  simplifiedPolynomial: any;
};
const EvaluateSolution = ({ simplifiedPolynomial }: EvaluateSolutionProps) => {
  const [value, setValue] = useState("2.7");
  parser.evaluate(`f(x) = ${simplifiedPolynomial}`);

  const evaluatePolynomial = (value: string) => {
    if (value.length != 0) return parser.evaluate(`f(${value})`);
    return parser.evaluate(`f(0)`);
  };

  return (
    <div className="py-2">
      <h2 className="font-bold tracking-tight text-3xl py-3 flex justify-center">
        Evaluador
      </h2>
      <div className="flex items-center justify-center">
        <BlockMath>f(</BlockMath>
        <NumericInput
          value={value}
          onValueChange={(value) => {
            setValue(value);
          }}
        />
        <BlockMath>)</BlockMath>
        <BlockMath>{`~ = ${evaluatePolynomial(value)}`}</BlockMath>
      </div>
    </div>
  );
};

export const InterpolationSolution = () => {
  const polynomial = useInterpolationStore((state) => state.polynomial);

  if (polynomial.length === 0) return <></>;

  const lagrangePolynomial = math.parse(polynomial.replaceAll("*", ""));
  const simplifiedPolynomial = math.parse(
    algebrite.run(polynomial).replaceAll("*", "")
  );

  return (
    <>
      <ShowSolution
        polynomial={polynomial}
        lagrangePolynomial={lagrangePolynomial}
        simplifiedPolynomial={simplifiedPolynomial}
      />
      <EvaluateSolution simplifiedPolynomial={simplifiedPolynomial} />
    </>
  );
};
