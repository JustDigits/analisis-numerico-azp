import { Input, InputProps } from "@/components/ui/input";

type NumericInputProps = InputProps & {
  value: string;
  onValueChange: (newValue: string) => void;
};

export const NumericInput = ({
  className,
  value,
  onValueChange,
}: NumericInputProps) => {
  const handleInputChange = (value: string) => {
    // Only numbers
    const regex = /^(-|\+)?\d*\.?\d*$/;

    if (regex.test(value)) onValueChange(value);
  };

  return (
    <Input
      type="text"
      placeholder="0"
      className={`h-6 py-0 px-1 text-right max-w-[6ch] ${className}`}
      value={value}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};
