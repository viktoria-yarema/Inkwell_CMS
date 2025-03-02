import ArticlesPage from "@/modules/articles";
import CreateArticlePage from "@/modules/articles/pages/CreateArticlePage";
import { FileText } from "lucide-react";
import { ARTICLES_PATH, CREATE_ARTICLE_PATH } from "./paths";
import { Route } from "./type";

export const routes: Route[] = [
  {
    pathname: ARTICLES_PATH,
    title: "Articles",
    Icon: FileText,
    Component: ArticlesPage,
    children: [
      {
        pathname: CREATE_ARTICLE_PATH,
        title: "Create Article",
        Component: CreateArticlePage,
      },
    ],
  },
];
