import api from "@/shared/api/apiMiddleware";
import { Article } from "../type";
import { formatArticle } from "@/entities/articles/utils";

export const getArticles = async (): Promise<Article[]> => {
  const response = await api.get<Article[]>("/articles");
  return response.data.map(formatArticle);
};
