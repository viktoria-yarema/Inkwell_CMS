"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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

// Example items - replace with your own data
const items = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "ember", label: "Ember" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
];

export function MultiSelect() {
  const [open, setOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<typeof items>([]);

  const handleSelect = (item: (typeof items)[0]) => {
    // Check if item is already selected
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.value === item.value
    );

    if (isSelected) {
      // Remove item if already selected
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.value !== item.value
        )
      );
    } else {
      // Add item if not selected
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
            className="w-full justify-between"
          >
            Search and select items
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
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
    </div>
  );
}
