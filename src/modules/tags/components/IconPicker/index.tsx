import { FC, useEffect, useState } from "react";
import { InkwellIcon } from "@/entities/tags/type";
import cn from "@/shared/utils/cn";
import { Label } from "@/shared/components/Label";
import { iconComponents } from "../../constants";

interface IconPickerProps {
  value?: InkwellIcon;
  onChange?: (value: InkwellIcon) => void;
}

const IconPicker: FC<IconPickerProps> = ({ value, onChange }) => {
  const [selectedIcon, setSelectedIcon] = useState<InkwellIcon | undefined>(
    value
  );

  const iconNames = Object.values(InkwellIcon);

  const handleIconSelect = (icon: InkwellIcon) => {
    setSelectedIcon(icon);
    onChange?.(icon);
  };

  useEffect(() => {
    setSelectedIcon(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      <Label>Icon</Label>
      <div className="flex flex-wrap gap-2">
        {iconNames.map((iconName) => {
          const Icon = iconComponents[iconName];

          return (
            <div
              key={iconName}
              className={cn(
                "p-2 rounded-md cursor-pointer hover:bg-gray-100 flex items-center justify-center transition-colors",
                selectedIcon === iconName &&
                  "bg-primary text-white hover:bg-primary"
              )}
              onClick={() => handleIconSelect(iconName)}
              title={iconName}
            >
              <Icon className="h-5 w-5" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconPicker;
