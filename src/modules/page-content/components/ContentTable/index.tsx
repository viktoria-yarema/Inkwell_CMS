import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/Table";
import { Button } from "@/shared/components/Button";
import { Edit } from "lucide-react";
import { ContentSection } from "../../types";

type ContentTableProps = {
  sections: ContentSection[];
  onSectionEdit: (section: ContentSection) => void;
};

export const ContentTable: React.FC<ContentTableProps> = ({
  sections,
  onSectionEdit,
}) => {
  const getSectionPreview = (section: ContentSection): string => {
    if (section.fields.length > 0) {
      const firstField = section.fields[0];
      return firstField.value || "No content";
    }
    return "No fields";
  };

  const getFieldCount = (section: ContentSection): number => {
    return section.fields.length;
  };

  if (sections.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No content sections available for this page.</p>
        <p className="text-sm mt-2">
          Content sections will be added here in the future.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Section Name</TableHead>
          <TableHead>Fields</TableHead>
          <TableHead>Preview</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sections.map((section) => (
          <TableRow
            key={section.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onSectionEdit(section)}
          >
            <TableCell className="font-medium">{section.name}</TableCell>
            <TableCell className="text-muted-foreground">
              {getFieldCount(section)} field
              {getFieldCount(section) !== 1 ? "s" : ""}
            </TableCell>
            <TableCell className="max-w-[300px] truncate text-muted-foreground">
              {getSectionPreview(section)}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSectionEdit(section);
                }}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit section</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
