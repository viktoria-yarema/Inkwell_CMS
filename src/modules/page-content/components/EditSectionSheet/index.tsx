import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/Sheet";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Label } from "@/shared/components/Label";
import { ContentSection, PageContentType } from "../../types";

type EditSectionSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  section: ContentSection | null;
  onFieldUpdate: (fieldId: string, newValue: string) => void;
  onSave: (pageType: PageContentType) => void;
  currentPageType: PageContentType;
};

export const EditSectionSheet: React.FC<EditSectionSheetProps> = ({
  isOpen,
  onClose,
  section,
  onFieldUpdate,
  onSave,
  currentPageType,
}) => {
  if (!section) return null;

  const handleSave = () => {
    onSave(currentPageType);
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <textarea
              id={field.id}
              value={field.value}
              onChange={(e) => onFieldUpdate(field.id, e.target.value)}
              className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              rows={3}
            />
          </div>
        );
      case "image":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type="text"
              value={field.value}
              onChange={(e) => onFieldUpdate(field.id, e.target.value)}
              placeholder="Enter image URL or path"
            />
            <p className="text-xs text-muted-foreground">
              Enter the URL or path to your image
            </p>
          </div>
        );
      default: // text
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              type="text"
              value={field.value}
              onChange={(e) => onFieldUpdate(field.id, e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit {section.name}</SheetTitle>
          <SheetDescription>
            Update the content for this section. Changes will be saved when you
            click Save.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">{section.fields.map(renderField)}</div>

        <SheetFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
