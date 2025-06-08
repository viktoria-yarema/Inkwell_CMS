import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/Tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/Card";
import { ContentTable } from "./components/ContentTable";
import { EditSectionSheet } from "./components/EditSectionSheet";
import { usePageContent } from "./hooks/usePageContent";
import { PageContentType } from "./types";

const PageContent: React.FC = () => {
  const {
    selectedSection,
    isSheetOpen,
    handleSectionClick,
    handleSheetClose,
    handleFieldUpdate,
    handleSaveSection,
    getSectionsForPage,
  } = usePageContent();

  const [currentPageType, setCurrentPageType] =
    React.useState<PageContentType>("home");

  const handleTabChange = (value: string) => {
    setCurrentPageType(value as PageContentType);
  };

  return (
    <div className="flex flex-col gap-6 w-full p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Page Content Management
        </h1>
        <p className="text-muted-foreground">
          Manage static content for your website pages. Click on any section to
          edit its content.
        </p>
      </div>

      <Tabs
        value={currentPageType}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Home Page Content</CardTitle>
              <CardDescription>
                Manage the content sections displayed on your home page
                including header, hero, articles preview, and footer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable
                sections={getSectionsForPage("home")}
                onSectionEdit={handleSectionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Articles Page Content</CardTitle>
              <CardDescription>
                Manage the content sections for your articles page. This section
                is currently empty and will be populated in the future.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable
                sections={getSectionsForPage("articles")}
                onSectionEdit={handleSectionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About Page Content</CardTitle>
              <CardDescription>
                Manage your personal information, professional experience,
                philosophy, education, and skills displayed on the about page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContentTable
                sections={getSectionsForPage("about")}
                onSectionEdit={handleSectionClick}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditSectionSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
        section={selectedSection}
        onFieldUpdate={handleFieldUpdate}
        onSave={handleSaveSection}
        currentPageType={currentPageType}
      />
    </div>
  );
};

export default PageContent;
