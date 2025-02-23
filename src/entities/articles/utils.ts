import { Article } from "./type";
import { format, parseISO } from "date-fns";

export const formatArticle = (article: Article): Article => {
  return {
    ...article,
    createdAt: format(parseISO(article.createdAt as string), "dd MMMM yyyy"),
    updatedAt: format(parseISO(article.updatedAt as string), "dd MMMM yyyy"),
  };
};
