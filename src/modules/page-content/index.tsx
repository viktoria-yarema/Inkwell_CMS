import { FC, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/Tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/Card";
import { ContentTabs } from "./components/ContentTabs";
import { PageContentVariants } from "@/entities/user/type";
import { pageTabs } from "./constants";

const PageContent: FC = () => {
  const [currentPageType, setCurrentPageType] = useState<PageContentVariants>(
    PageContentVariants.HOME
  );

  const handleTabChange = (value: string) => {
    setCurrentPageType(value as PageContentVariants);
  };

  return (
    <div className="flex flex-col gap-6 w-full px-6">
      <div>
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
          {pageTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {pageTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{tab.label} Page Content</CardTitle>
                <CardDescription>{tab.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentTabs pageType={tab.value} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PageContent;
