import api from "@/shared/api/apiMiddleware";
import { Article } from "../type";

export const updateArticle = async (article: Article): Promise<Article> => {
  const response = await api.put<Article>(`/articles/${article.id}`, article);
  return response.data;
};
