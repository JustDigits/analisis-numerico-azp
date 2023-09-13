"use client";

import { useState } from "react";

import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, TrashIcon } from "@radix-ui/react-icons";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { syntheticDivision, solveByBirgeVieta } from "./birge-vieta";
import { Polynomial } from "./polynomial";

import { useRootsOfEquationsStore } from "../hooks/use-root-of-equations";
import { useStepsStore } from "../hooks/use-steps";

const RootsOfEquationsTopOptions = () => {
  const degree = useRootsOfEquationsStore((state) => state.degree);
  const setDegree = useRootsOfEquationsStore((state) => state.setDegree);
  const onClear = useRootsOfEquationsStore((state) => state.onClear);

  const clearSteps = useStepsStore((state) => state.onClear);

  const minDegree = 3;
  const maxDegree = 6;

  return (
    <div className="flex py-2 gap-5">
      <div className="flex gap-1">
        <Button
          variant="outline"
          disabled={degree >= maxDegree}
          size="icon"
          onClick={() => {
            clearSteps();
            setDegree(degree + 1);
          }}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          onClick={() => {
            clearSteps();
            setDegree(degree - 1);
          }}
          variant="outline"
          disabled={degree <= minDegree}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex ml-auto gap-1">
        <Button variant="destructive" size="icon" onClick={onClear}>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const RootsOfEquationsBody = () => {
  const coefficients = useRootsOfEquationsStore((state) => state.coefficients);
  const setCoefficientElement = useRootsOfEquationsStore(
    (state) => state.setCoefficientElement
  );

  const variables = useRootsOfEquationsStore((state) => state.variables);
  const setVariableElement = useRootsOfEquationsStore(
    (state) => state.setVariableElement
  );

  return (
    <div className="flex items-center gap-2">
      <InlineMath>{`P_${coefficients.length - 1}(x) =`}</InlineMath>
      <Polynomial
        editableVariables
        coefficients={coefficients}
        variables={variables}
        onCoefficientChange={(value, index) =>
          setCoefficientElement(value, index)
        }
        onVariableChange={(value, index) => setVariableElement(value, index)}
      />
    </div>
  );
};

const RootsOfEquationsBottomOptions = () => {
  const [iteraciones, setIteraciones] = useState(10);
  const [tolerancia, setTolerancia] = useState(0);
  const coefficients = useRootsOfEquationsStore((state) => state.coefficients);

  const roots = useRootsOfEquationsStore((state) => state.roots);
  const setRootElement = useRootsOfEquationsStore(
    (state) => state.setRootElement
  );

  const steps = useStepsStore((state) => state.steps);
  const setSteps = useStepsStore((state) => state.setSteps);
  const clearSteps = useStepsStore((state) => state.onClear);

  const anyCoefficientEmpty = coefficients.some(
    (coefficient) => coefficient === ""
  );
  const degree = useRootsOfEquationsStore((state) => state.degree);

  const handleClick = () => {
    clearSteps();

    const getCoefficientsAsNumber = (coefficients: string[]) => {
      return coefficients.map((value) => {
        if (value == "") return 0;
        return Number(value);
      });
    };

    let stepHistory: number[][][] = [];
    let currentPolynomial = getCoefficientsAsNumber(coefficients);
    for (let i = 0; i < degree - 1; i++) {
      const { steps: newSteps, root: newRoot } = solveByBirgeVieta(
        currentPolynomial,
        iteraciones,
        tolerancia
      );

      setRootElement(newRoot, i);
      stepHistory = stepHistory.concat(newSteps);

      const { additionRow, resultsRow } = syntheticDivision(
        newRoot,
        currentPolynomial
      );

      if (i == degree - 1) break;

      currentPolynomial = resultsRow;
      currentPolynomial.pop();
    }
    setSteps(stepHistory);
  };

  return (
    <div className="flex items-center py-2 gap-5">
      <div className="flex gap-5">
        <div className="grid w-fit items-center gap-1.5">
          <Label htmlFor="iteraciones" className="font-bold">
            Max. Iteraciones
          </Label>
          <Input
            type="text"
            id="iteraciones"
            placeholder="10"
            value={iteraciones}
            onChange={(e) => setIteraciones(Number(e.target.value))}
          />
        </div>
        {/*         <div className="grid w-min items-center gap-1.5">
          <Label htmlFor="error" className="font-bold">
            Tolerancia
          </Label>
          <Input
            type="text"
            id="error"
            placeholder="0"
            value={tolerancia}
            onChange={(e) => setTolerancia(Number(e.target.value))}
          />
        </div> */}
      </div>
      <div className="flex ml-auto gap-1">
        <Button onClick={handleClick} disabled={anyCoefficientEmpty}>
          Resolver
        </Button>
      </div>
    </div>
  );
};

const ShowSteps = () => {
  const steps = useStepsStore((state) => state.steps);
  const roots = useRootsOfEquationsStore((state) => state.roots);

  if (!steps || steps.length === 0) {
    return <></>;
  }

  const signString = (num: number): string => {
    const sign = Math.sign(num);
    const numberString = Math.abs(num).toString();

    if (sign === 1) {
      return `+${numberString}`;
    } else if (sign === -1) {
      return `-${numberString}`;
    }

    return numberString;
  };
  return (
    <>
      <h1 className=" font-bold text-2xl text-center py-8">
        Raíces de la ecuación
      </h1>
      <div className="flex gap-4 items-center justify-center">
        {roots.map((root, index) => (
          <div key={index}>
            <InlineMath>{`(x ${signString(-root)})`}</InlineMath>
          </div>
        ))}
      </div>
      <h1 className=" font-bold text-2xl text-center py-8">
        Solución Paso a Paso
      </h1>
      <div className="flex flex-col gap-10 text-right items-start">
        {steps.map((iteration, iterationIndex) => (
          <table key={iterationIndex}>
            <tbody>
              {iteration.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 == 0 ? " border-b" : ""}>
                  <td>
                    {rowIndex && rowIndex % 2 == 0 ? (
                      <InlineMath>+</InlineMath>
                    ) : (
                      <></>
                    )}
                  </td>

                  {row.map((value, valueIndex) => (
                    <td key={valueIndex} className="px-4">
                      <div>
                        <InlineMath>
                          {(rowIndex == 0 ? `x_{${iterationIndex}} = ` : ``) +
                            value.toString()}
                        </InlineMath>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </>
  );
};

export const RootsOfEquations = () => {
  return (
    <div className="mx-52">
      <div className="flex items-center border-b">
        <div className="inline-block py-2">
          <RootsOfEquationsTopOptions />
          <RootsOfEquationsBody />
          <RootsOfEquationsBottomOptions />
        </div>
      </div>
      <ShowSteps />
    </div>
  );
};
