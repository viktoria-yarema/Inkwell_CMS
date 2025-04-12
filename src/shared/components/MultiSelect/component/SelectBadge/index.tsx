import { Button } from "@/shared/components/Button";
import { X } from "lucide-react";
import cn from "@/shared/utils/cn";
import { FC } from "react";

type SelectBadgeProps = {
  index: number;
  label: string;
  className?: string;
  onRemove: (label: string) => void;
};

const SelectBadge: FC<SelectBadgeProps> = ({
  label,
  className,
  index,
  onRemove,
}) => {
  const generateColor = () => {
    const colors = [
      "bg-green-500/80",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500",
      "bg-rose-500",
      "bg-emerald-500",
    ];

    return colors[index % colors.length];
  };

  return (
    <div
      className={cn(
        "rounded-2xl text-sm gap-2 uppercase font-bold px-3 py-1 w-min h-8 flex items-center justify-center transition-opacity duration-300 cursor-pointer",
        generateColor(),
        className
      )}
    >
      <p className="text-primary">{label}</p>
      <Button
        variant="ghost"
        size="sm"
        className="h-4 w-4 hover:bg-white/15 p-1"
        onClick={() => onRemove(label)}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Remove {label}</span>
      </Button>
    </div>
  );
};

export default SelectBadge;
