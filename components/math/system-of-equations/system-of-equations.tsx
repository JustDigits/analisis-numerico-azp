"use client";

import React from "react";
import { useState } from "react";

import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import {
  RenderSystemBrace,
  SolveByMontantesMethod,
} from "@/components/ui/math";
import { isZeroed } from "@/components/util/arrays";

interface EquationTermProps {
  index: number;
  value: number;
  onChange: (value: number) => void;
}

interface EquationRowProps {
  size: number;
  coefficientRowValues: number[];
  resultValue: number;
  onCoefficientValueChange: (colIndex: number, value: number) => void;
  onResultValueChange: (value: number) => void;
}

interface SystemOfEquationsProps {
  size: number;
  minSize: number;
  maxSize: number;
  coefficients: number[][];
  results: number[];
  onCoefficientChange: (row: number, col: number, value: number) => void;
  onResultChange: (row: number, value: number) => void;
}

interface SystemOptionsProps {
  size: number;
  minSize: number;
  maxSize: number;
  onIncrementSize: () => void;
  onDecrementSize: () => void;
  onResetSystem: () => void;
}

interface ShowSolutionProps {
  steps: string[];
  finalEquationSystem: string;
  solution: string;
}

/**
 * Renders a single equation term input component.
 *
 * @param {EquationTermInputProps} index - The index of the term.
 * @return {ReactElement} The rendered single term input component.
 */
const EquationTerm: React.FC<EquationTermProps> = ({
  index,
  value,
  onChange,
}) => {
  const variable = `x_{${index + 1}}`;

  return (
    <span className="flex items-center space-x-1">
      <Input
        type="number"
        placeholder="0"
        className="input__equation-term"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <InlineMath>{variable}</InlineMath>
    </span>
  );
};

/**
 * Renders an input equation row.
 *
 * @param {number} size - The number of terms to render in the equation.
 * @return {ReactNode} The rendered input equation row.
 */
const EquationRow: React.FC<EquationRowProps> = ({
  size,
  coefficientRowValues,
  resultValue,
  onCoefficientValueChange,
  onResultValueChange,
}) => {
  return (
    <div className="flex items-center space-x-1 py-px">
      {Array.from({ length: size }).map((_, termIndex) => (
        <>
          <EquationTerm
            key={termIndex}
            index={termIndex}
            value={coefficientRowValues[termIndex]}
            onChange={(value) => onCoefficientValueChange(termIndex, value)}
          />
          <InlineMath>{termIndex < size - 1 ? " + " : " = "}</InlineMath>
        </>
      ))}
      <Input
        type="number"
        placeholder="0"
        className="input__equation-term"
        value={resultValue}
        onChange={(e) => onResultValueChange(Number(e.target.value))}
      />
    </div>
  );
};

/**
 * Renders an input system of equations.
 *
 * @param {number} size - The number of equations to render in the system.
 * @return {ReactNode} The rendered input system of equations.
 */
const SystemOfEquations: React.FC<SystemOfEquationsProps> = ({
  size,
  minSize,
  maxSize,
  coefficients,
  results,
  onCoefficientChange,
  onResultChange,
}) => {
  size = minSize > size ? minSize : size;
  size = maxSize < size ? maxSize : size;

  return (
    <div className="flex items-center justify-center">
      <InlineMath>{RenderSystemBrace(size)}</InlineMath>
      <div>
        {Array.from({ length: size }).map((_, rowIndex) => (
          <EquationRow
            key={rowIndex}
            size={size}
            coefficientRowValues={coefficients[rowIndex]}
            resultValue={results[rowIndex]}
            onCoefficientValueChange={(colIndex, value) =>
              onCoefficientChange(rowIndex, colIndex, value)
            }
            onResultValueChange={(value) => onResultChange(rowIndex, value)}
          />
        ))}
      </div>
    </div>
  );
};

const SystemOptions: React.FC<SystemOptionsProps> = ({
  size,
  minSize,
  maxSize,
  onIncrementSize,
  onDecrementSize,
  onResetSystem,
}) => {
  size = minSize > size ? minSize : size;
  size = maxSize < size ? maxSize : size;

  return (
    <div className="flex py-2 gap-5">
      <div className="flex gap-1">
        <Button
          variant="outline"
          disabled={size >= maxSize}
          size="icon"
          onClick={onIncrementSize}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          onClick={onDecrementSize}
          variant="outline"
          disabled={size <= minSize}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex ml-auto gap-1">
        <Button variant="destructive" size="icon" onClick={onResetSystem}>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ShowSolution: React.FC<ShowSolutionProps> = ({
  steps,
  finalEquationSystem,
  solution,
}) => {
  if (steps.length <= 0) return <></>;

  const finalEQS = `
  \\left \\{
  \\begin{array}{}
      ${finalEquationSystem}
  \\end{array}
  \\right \.
`;

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
      <div className="flex justify-center items-center">
        <div className="flex justify-start">
          <BlockMath>{finalEQS}</BlockMath>
        </div>
      </div>
      <div className="flex justify-center">
        <BlockMath>{solution}</BlockMath>
      </div>
    </div>
  );
};

export function SolveSystemOfEquations() {
  const [systemSize, setSystemSize] = useState<number>(3);
  const minSize = 1;
  const maxSize = 10;

  const [results, setResults] = useState<number[]>(Array(systemSize).fill(0));
  const [coefficients, setCoefficients] = useState<number[][]>(
    Array.from({ length: systemSize }, () => Array(systemSize).fill(0))
  );
  const [steps, setSteps] = useState<string[]>([]);
  const [solution, setSolution] = useState<string>("");
  const [finalEquationSystem, setFinalEquationSystem] = useState<string>("");

  const isSystemZeroed = isZeroed(coefficients) && isZeroed(results);

  const handleResultChange = (index: number, value: number) => {
    const newResults = [...results];
    newResults[index] = value;
    setResults(newResults);
  };
  const handleCoefficientChange = (row: number, col: number, value: number) => {
    const newCoefficients = [...coefficients];
    newCoefficients[row][col] = value;
    setCoefficients(newCoefficients);
  };
  const handleIncrementSize = () => {
    if (systemSize >= maxSize) return;

    // Update the system
    setSystemSize((prevSize) => prevSize + 1);

    // Update the coefficients
    setCoefficients((prevCoefficients) => {
      // Add a zero to the end of each existing row
      const updatedRows = prevCoefficients.map((row) => [...row, 0]);
      // Add a new row filled with zeros for the new system size
      return [...updatedRows, Array(systemSize + 1).fill(0)];
    });

    // Update the results
    setResults((prevResults) => [...prevResults, 0]); // Add a new zero
  };
  const handleDecrementSize = () => {
    if (systemSize <= minSize) return;

    setSystemSize((prevSize) => prevSize - 1);

    // Update the coefficients
    setCoefficients((prevCoefficients) => {
      // Remove the last element from each existing row
      const updatedRows = prevCoefficients.map((row) => {
        const newRow = [...row];
        newRow.pop();
        return newRow;
      });
      // Remove the last row
      updatedRows.pop();
      return updatedRows;
    });

    // Update the results
    setResults((prevResults) => {
      const newResults = [...prevResults];
      newResults.pop(); // Remove the last element
      return newResults;
    });
  };
  const handleResetSystem = () => {
    setResults(Array(systemSize).fill(0));
    setCoefficients(
      Array.from({ length: systemSize }, () => Array(systemSize).fill(0))
    );
  };
  const handleSolveSystem = () => {
    const { finalEquationValues, solutionValues, stepHistory } =
      SolveByMontantesMethod(coefficients, results);

    setSteps(stepHistory);
    setSolution(solutionValues);
    setFinalEquationSystem(finalEquationValues);
  };

  return (
    <div className="mx-52">
      <div className="flex items-center border-b">
        <div className="inline-block py-2">
          <SystemOptions
            size={systemSize}
            minSize={minSize}
            maxSize={maxSize}
            onIncrementSize={handleIncrementSize}
            onDecrementSize={handleDecrementSize}
            onResetSystem={handleResetSystem}
          />
          <SystemOfEquations
            size={systemSize}
            minSize={minSize}
            maxSize={maxSize}
            coefficients={coefficients}
            results={results}
            onCoefficientChange={handleCoefficientChange}
            onResultChange={handleResultChange}
          />
          <div className="flex justify-end py-2">
            <Button onClick={handleSolveSystem} disabled={isSystemZeroed}>
              Resolver
            </Button>
          </div>
        </div>
      </div>
      <ShowSolution
        steps={steps}
        solution={solution}
        finalEquationSystem={finalEquationSystem}
      />
    </div>
  );
}
