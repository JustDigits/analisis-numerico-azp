import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

type ModuleOptionsTopProps = {
  size: number;
  maxSize: number;
  minSize: number;
  setSize: (value: number) => void;
  clearModule: () => void;
};
export const ModuleOptionsTop = ({
  size,
  maxSize,
  minSize,
  setSize,
  clearModule,
}: ModuleOptionsTopProps) => {
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
          variant="outline"
          disabled={size <= minSize}
          size="icon"
          onClick={() => setSize(size - 1)}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex ml-auto gap-1">
        <Button variant="destructive" size="icon" onClick={clearModule}>
          <TrashIcon className="h-4 w-4"></TrashIcon>
        </Button>
      </div>
    </div>
  );
};

type ModuleOptionsBottomProps = {
  solveModule: () => void;
  disable?: boolean;
};
export const ModuleOptionsBottom = ({
  solveModule,
  disable = false,
}: ModuleOptionsBottomProps) => {
  return (
    <div className="flex justify-end py-2">
      <Button disabled={disable} onClick={solveModule}>
        Resolver
      </Button>
    </div>
  );
};
