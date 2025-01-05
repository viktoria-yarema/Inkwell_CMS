import ArticleIcon from "../../shared/assets/icons/ArticleIcon";
import { ARTICLES_PATH } from "./paths";
import { Route } from "./type";

export const routes: Route[] = [
  {
    path: ARTICLES_PATH,
    name: "Articles",
    Icon: ArticleIcon,
  },
];
