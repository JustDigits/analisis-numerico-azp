"use client";

import { Input, InputProps } from "@/components/ui/input";

type CoefficientInputProps = InputProps & {
  coefficient: string;
  onCoefficientChange: (newCoefficient: string) => void;
};

export const CoefficientInput = ({
  className,
  coefficient,
  onCoefficientChange,
}: CoefficientInputProps) => {
  const handleInputChange = (value: string) => {
    // Regex pattern to check if the input is an integer ("896") or a decimal ("16.4");
    // both can be followed by a variable ("16a" and ".2b", but never ".a").
    /* const regex = /^((\d*\.\d*)|(\d*|\d*\.\d+)?[a-zA-Z]?)?$/ */
    
    // Temporal, only numbers
    const regex = /^-?\d*\.?\d*$/;

    if (regex.test(value)) {
      onCoefficientChange(value);
    }
  };

  return (
    <Input
      type="text"
      placeholder="0"
      className={`h-6 py-0 px-1 text-right max-w-[6ch] ${className}`}
      value={coefficient}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};
