"use client";

import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { Input } from "@/components/ui/input";

import { ModuleOptionsBottom } from "@/components/module/options";

import { lagrange } from "../solution-methods/lagrange";
import { useInterpolationStore } from "@/hooks/use-interpolation";
import { toastError } from "@/components/toast/toast-error";
import { InterpolationSolution } from "./interpolation-solution";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

type InterpolationModuleProps = {
  xInput: string;
  yInput: string;
  setXInput: (value: string) => void;
  setYInput: (value: string) => void;
  clearModule: () => void;
};
const InterpolationModule = ({
  xInput,
  yInput,
  setXInput,
  setYInput,
  clearModule,
}: InterpolationModuleProps) => {
  return (
    <>
      <div className="flex items-center pb-3">
        <h2 className="font-bold text-lg py-3">Conjunto de Datos</h2>
        <div className="flex ml-auto">
          <Button variant="destructive" size="icon" onClick={clearModule}>
            <TrashIcon className="h-4 w-4"></TrashIcon>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 w-96">
        <Input
          type="text"
          placeholder="Valores de x"
          value={xInput}
          className="h-10 py-0 px-1"
          onChange={(e) => setXInput(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Valores de y"
          value={yInput}
          className="h-10 py-0 px-1"
          onChange={(e) => setYInput(e.target.value)}
        />
      </div>
    </>
  );
};

export const Interpolation = () => {
  const [xInput, setXInput] = useState("");
  const [yInput, setYInput] = useState("");
  const disable = xInput.length === 0 || yInput.length === 0;

  const setPolynomial = useInterpolationStore((state) => state.setPolynomial);
  const setDataPoints = useInterpolationStore((state) => state.setDataPoints);
  const clearModule = useInterpolationStore((state) => state.onClear);

  const handleSolve = () => {
    const xValues = xInput.split(",").map(Number);
    const yValues = yInput.split(",").map(Number);

    if (xValues.length !== yValues.length) {
      toastError(
        "El conjunto de datos de 'x' y de 'y' debe tener el mismo tamaño."
      );
      return;
    }

    const dataPoints = xValues.map((x, index) => ({ x, y: yValues[index] }));
    setDataPoints(dataPoints);

    const currentPolynomial = lagrange(dataPoints);
    setPolynomial(currentPolynomial);
  };

  const handleClear = () => {
    clearModule();
    setXInput("");
    setYInput("");
  };

  return (
    <div className="mx-52">
      <div className="flex items-center border-b">
        <div className="inline-block py-2">
          <InterpolationModule
            xInput={xInput}
            yInput={yInput}
            setXInput={setXInput}
            setYInput={setYInput}
            clearModule={handleClear}
          />
          <ModuleOptionsBottom
            solveModule={() => handleSolve()}
            disable={disable}
          />
        </div>
      </div>
      <InterpolationSolution />
      <ToastContainer style={{ width: "40%", textAlign: "center" }} />
    </div>
  );
};
