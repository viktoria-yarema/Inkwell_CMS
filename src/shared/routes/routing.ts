import ArticlesPage from "@/modules/articles";
import { ARTICLE_PATH, ARTICLES_PATH, CREATE_ARTICLE_PATH } from "./paths";
import { Route } from "./type";
import { FileText } from "lucide-react";
import ArticlePage from "@/modules/articles/pages/CreateArticlePage";
import CreateArticlePage from "@/modules/articles/pages/CreateArticlePage";

export const routes: Route[] = [
  {
    path: ARTICLES_PATH,
    name: "Articles",
    Icon: FileText,
    Component: ArticlesPage,
  },
  {
    path: ARTICLE_PATH,
    name: "Article",
    Icon: FileText,
    Component: ArticlePage,
  },
  {
    path: CREATE_ARTICLE_PATH,
    name: "Create Article",
    Icon: FileText,
    Component: CreateArticlePage,
  },
];
