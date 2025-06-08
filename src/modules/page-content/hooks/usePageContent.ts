import { useState } from "react";
import { ContentSection, PageContentType, BaseField } from "../types";
import { DEFAULT_PAGE_CONTENT } from "../constants";

export const usePageContent = () => {
  const [pageContent, setPageContent] = useState(DEFAULT_PAGE_CONTENT);
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSectionClick = (section: ContentSection) => {
    setSelectedSection(section);
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
    setSelectedSection(null);
  };

  const updateSectionFields = (
    sectionId: string,
    pageType: PageContentType,
    updatedFields: BaseField[]
  ) => {
    setPageContent((prev) => ({
      ...prev,
      [pageType]: prev[pageType].map((section) =>
        section.id === sectionId
          ? { ...section, fields: updatedFields }
          : section
      ),
    }));
  };

  const handleFieldUpdate = (fieldId: string, newValue: string) => {
    if (!selectedSection) return;

    const updatedFields = selectedSection.fields.map((field) =>
      field.id === fieldId ? { ...field, value: newValue } : field
    );

    setSelectedSection({ ...selectedSection, fields: updatedFields });
  };

  const handleSaveSection = (pageType: PageContentType) => {
    if (!selectedSection) return;

    updateSectionFields(selectedSection.id, pageType, selectedSection.fields);
    handleSheetClose();
  };

  const getSectionsForPage = (pageType: PageContentType): ContentSection[] => {
    return pageContent[pageType];
  };

  return {
    pageContent,
    selectedSection,
    isSheetOpen,
    handleSectionClick,
    handleSheetClose,
    handleFieldUpdate,
    handleSaveSection,
    getSectionsForPage,
  };
};
