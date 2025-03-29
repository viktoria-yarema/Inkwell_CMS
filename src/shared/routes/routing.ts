import ArticlesPage from "@/modules/articles";
import CreateArticlePage from "@/modules/articles/pages/CreateArticlePage";
import { FileText } from "lucide-react";
import { ARTICLES_PATH, CREATE_ARTICLE_PATH, ARTICLE_PATH } from "./paths";
import { Route } from "./type";
import EditArticlePage from "@/modules/articles/pages/EditArticlePage";

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
      {
        pathname: ARTICLE_PATH,
        title: "Edit Article",
        Component: EditArticlePage,
      },
    ],
  },
];
