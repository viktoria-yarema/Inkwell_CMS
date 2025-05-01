import api from "@/shared/api/apiMiddleware";
import { Article } from "../type";

type GetArticlesResponse = {
  articles: Article[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};

type GetArticlesParams = {
  page: number;
  limit: number;
};

export const getArticles = async (
  params: GetArticlesParams
): Promise<GetArticlesResponse> => {
  const response = await api.get<GetArticlesResponse>("/articles", { params });
  return response.data;
};
