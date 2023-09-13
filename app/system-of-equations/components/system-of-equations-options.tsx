"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import { useSystemOfEquationsStore } from "../hooks/use-system-of-equations";
import { solveByMontantesMethod } from "../solution-methods/montante";
import { useStepHistoryStore } from "../hooks/use-step-history";

export const SystemOfEquationsTopOptions = () => {
  const size = useSystemOfEquationsStore((state) => state.size);
  const minSize = useSystemOfEquationsStore((state) => state.minSize);
  const maxSize = useSystemOfEquationsStore((state) => state.maxSize);
  const setSize = useSystemOfEquationsStore((state) => state.setSize);
  const onClear = useSystemOfEquationsStore((state) => state.onClear);

  return (
    <div className="flex py-2 gap-5">
      <div className="flex gap-1">
        <Button
          variant="outline"
          disabled={size >= maxSize}
          size="icon"
          onClick={() => setSize(size + 1)}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          onClick={() => setSize(size - 1)}
          variant="outline"
          disabled={size <= minSize}
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

export const SystemOfEquationsBottomOptions = () => {
  const size = useSystemOfEquationsStore((state) => state.size);
  const coefficientsAsString = useSystemOfEquationsStore(
    (state) => state.coefficients
  );
  const resultsAsString = useSystemOfEquationsStore((state) => state.results);
  const setSolution = useStepHistoryStore((state) => state.setSolution);
  const onClear = useStepHistoryStore((state) => state.onClear);

  const coefficients: number[][] = coefficientsAsString.map((row) =>
    row.map((value) => (value === "" ? 0 : Number(value)))
  );
  const results: number[] = resultsAsString.map((value) =>
    value === "" ? 0 : Number(value)
  );
  const steps = useStepHistoryStore((state) => state.steps);
  const setSteps = useStepHistoryStore((state) => state.setSteps);

  const handleClick = () => {
    console.log(steps);
    solveByMontantesMethod({
      size,
      coefficients,
      results,
      setSolution,
      onClear,
      steps,
      setSteps,
    });
    console.log(steps);
  };

  return (
    <div className="flex justify-end py-2">
      <Button onClick={handleClick}>Resolver</Button>
    </div>
  );
};
