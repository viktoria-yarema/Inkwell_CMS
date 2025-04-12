"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/shared/components/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/Popover";
import cn from "@/shared/utils/cn";
import SelectBadge from "./component/SelectBadge";

export type MultiSelectItem = { value: string; label: string };

type MultiSelectProps = {
  items: MultiSelectItem[];
  selectedItems: MultiSelectItem[];
  setSelectedItems: (items: MultiSelectItem[]) => void;
};

export function MultiSelect({
  items = [],
  selectedItems = [],
  setSelectedItems,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (item: MultiSelectItem) => {
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.value === item.value
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.value !== item.value
        )
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemove = (label: string) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.label !== label)
    );
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[250px] group min-h-14 justify-start rounded-2xl"
          >
            <div className="flex flex-wrap gap-2">
              {selectedItems.map((item, index) => (
                <SelectBadge
                  key={item.value}
                  index={index}
                  label={item.label}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Search and assign article's tags...
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="min-w-[250px] p-0"
          align="start"
          sideOffset={4}
          style={{ width: "var(--radix-popper-anchor-width)" }}
        >
          <Command>
            <CommandInput placeholder="Search items..." />
            <CommandList>
              <CommandEmpty>No items found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = selectedItems.some(
                    (selectedItem) => selectedItem.value === item.value
                  );

                  return (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => handleSelect(item)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
