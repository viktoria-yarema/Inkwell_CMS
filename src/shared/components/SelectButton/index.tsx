import cn from "@/shared/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/Select";

export type SelectOption = {
  label: string;
  value: string;
  color?: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

type SelectButtonProps = {
  selected: SelectOption;
  options: SelectOption[];
  onClick: (option: SelectOption) => void;
  className?: string;
};

const SelectButton = ({
  selected,
  options,
  onClick,
  className,
}: SelectButtonProps) => {
  const Icon = selected.Icon;
  return (
    <Select
      value={selected.value}
      onValueChange={(value) => {
        const selectedOption = options.find((option) => option.value === value);
        if (selectedOption) onClick(selectedOption);
      }}
    >
      <SelectTrigger
        className={cn(
          "rounded-full border px-4 py-2 text-lg transition-all duration-500 linear",
          className,
          selected.color
        )}
      >
        <span>{<Icon className="w-4 h-4" />}</span>
        <SelectValue>{selected.label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectButton;
