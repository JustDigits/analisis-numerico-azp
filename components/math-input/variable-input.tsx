"use client";

import { useRef, useState } from "react";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type StaticVariableInputProps = {
  variable: string;
};

type EditableVariableInputProps = {
  variable: string;
  onVariableChange: (newVariable: string) => void;
};

type VariableInputProps = {
  isEditable: boolean;
  variable: string;
  onVariableChange: (newVariable: string) => void;
};

export const VariableInput = ({
  isEditable,
  variable,
  onVariableChange,
}: VariableInputProps) => {
  return (
    <>
      {isEditable ? (
        <EditableVariableInput
          variable={variable}
          onVariableChange={onVariableChange}
        />
      ) : (
        <StaticVariableInput variable={variable} />
      )}
    </>
  );
};

const StaticVariableInput = ({ variable }: StaticVariableInputProps) => {
  return (
    <span>
      <Button className={"h-6 px-0 py-0"} variant="container" disabled>
        <InlineMath>{variable ? variable : "x"}</InlineMath>
      </Button>
    </span>
  );
};

const EditableVariableInput = ({
  variable,
  onVariableChange,
}: EditableVariableInputProps) => {
  const input = useRef<HTMLInputElement>(null);
  const [editable, setEditable] = useState(false);

  const handleButtonClick = () => {
    setEditable(true);
    setTimeout(() => {
      input.current?.focus(); // Workaround to ensure that the focus and select
      input.current?.select(); // operations occur after the current rendering cycle
    }, 0);
  };

  const handleInputResize = () => {
    const inputElement = input.current;
    if (!inputElement) return;

    const minWidth = 6;
    const maxWidth = 20;
    const contentWidth = inputElement.value.length + 2;

    const newWidth = Math.max(minWidth, Math.min(contentWidth, maxWidth));
    inputElement.style.width = `${newWidth}ch`;
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditable(false);

    const inputValue = e.target.value;
    const inputElement = input.current;
    if (!inputElement) return;

    inputValue
      ? onVariableChange(String(inputValue))
      : (inputElement.value = variable);
  };

  return (
    <>
      <span
        hidden={editable}
        className="border-b-2 border-blue-500 border-dotted"
      >
        <Button
          className="h-6 px-0 py-0 text-blue-500 rounded"
          variant="container"
          onClick={handleButtonClick}
        >
          <InlineMath>{variable ? variable : "x"}</InlineMath>
        </Button>
      </span>
      <span hidden={!editable}>
        <Input
          type="text"
          className="h-6 py-0 px-1 text-right w-[6ch]"
          defaultValue={variable ? variable : "x"}
          onBlur={handleInputBlur}
          onChange={handleInputResize}
          ref={input}
        />
      </span>
    </>
  );
};
