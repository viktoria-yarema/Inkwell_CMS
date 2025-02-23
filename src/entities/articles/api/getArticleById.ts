import api from "@/shared/api/apiMiddleware";
import { Article } from "../type";
import { formatArticle } from "@/entities/articles/utils";

export const getArticleById = async (id: string): Promise<Article> => {
  const response = await api.get<Article>(`/articles/${id}`);
  return formatArticle(response.data);
};
