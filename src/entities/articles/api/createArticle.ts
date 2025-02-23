import api from "@/shared/api/apiMiddleware";
import { Article, CreateArticle } from "../type";

export const createArticle = async (
  article: CreateArticle
): Promise<Article> => {
  const response = await api.post<Article>("/articles", article);
  return response.data;
};
