import ArticlesPage from "@/modules/articles";
import { ARTICLE_PATH, ARTICLES_PATH } from "./paths";
import { Route } from "./type";
import { FileText } from "lucide-react";
import ArticlePage from "@/modules/articles/pages/Article";

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
];
