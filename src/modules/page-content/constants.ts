import { HomeSections, PageContentVariants } from "@/entities/user/type";
import HeaderForm from "./components/Forms/home/HeaderForm";
import HeroForm from "./components/Forms/home/HeroForm";
import { FC } from "react";

export const pageTabs: {
  value: PageContentVariants;
  label: string;
  description: string;
}[] = [
  {
    value: PageContentVariants.HOME,
    label: "Home",
    description:
      "Manage the content sections displayed on your home page including header, hero, articles preview, and footer.",
  },
  {
    value: PageContentVariants.ARTICLES,
    label: "Articles",
    description:
      "Manage the content sections for your articles page. This section is currently empty and will be populated in the future.",
  },
  {
    value: PageContentVariants.ABOUT,
    label: "About",
    description:
      "Manage your personal information, professional experience, philosophy, education, and skills displayed on the about page.",
  },
];

export const homeTabs: {
  value: HomeSections;
  label: string;
  Component: FC;
}[] = [
  {
    value: HomeSections.HEADER,
    label: "Header",
    Component: HeaderForm,
  },
  {
    value: HomeSections.HERO,
    label: "Hero",
    Component: HeroForm,
  },

  {
    value: HomeSections.LATEST_ARTICLES,
    label: "Latest Articles",
    Component: HeroForm,
  },
  {
    value: HomeSections.CATEGORIES,
    label: "Categories",
    Component: HeroForm,
  },

  {
    value: HomeSections.FOOTER,
    label: "Footer",
    Component: HeroForm,
  },
];

export const contentMap = {
  [PageContentVariants.HOME]: homeTabs,
  [PageContentVariants.ARTICLES]: [],
  [PageContentVariants.ABOUT]: [],
};
