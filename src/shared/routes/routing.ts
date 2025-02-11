import ArticlesPage from "@/modules/articles";
import { ARTICLES_PATH } from "./paths";
import { Route } from "./type";
import { FileText } from "lucide-react";

export const routes: Route[] = [
  {
    path: ARTICLES_PATH,
    name: "Articles",
    Icon: FileText,
    Component: ArticlesPage,
  },
];
