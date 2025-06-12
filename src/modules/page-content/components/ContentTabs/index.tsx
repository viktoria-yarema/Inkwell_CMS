import React, { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/Tabs";
import { PageContentVariants } from "@/entities/user/type";
import { contentMap } from "../../constants";

type ContentTabsProps = {
  pageType: PageContentVariants;
};

export const ContentTabs: React.FC<ContentTabsProps> = ({ pageType }) => {
  const [currentTab, setCurrentTab] = useState<string>(
    contentMap[pageType][0]?.value || ""
  );
  const tabs = contentMap[pageType];

  if (!tabs) {
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
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      className="flex flex-col space-y-6"
    >
      <TabsList className="w-fit">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ value, Component }) => (
        <TabsContent key={value} value={value}>
          <Component />
        </TabsContent>
      ))}
    </Tabs>
  );
};
