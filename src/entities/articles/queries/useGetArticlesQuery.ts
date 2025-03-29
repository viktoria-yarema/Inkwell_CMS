import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../api/getArticles";
import { queryClient } from "@/shared/providers/ReactQueryProvider";
import { Article } from "../type";

export const ARTICLES_QUERY_KEY = "articles";

export const useGetArticlesQuery = () => {
  return useQuery({
    queryKey: [ARTICLES_QUERY_KEY],
    queryFn: () => getArticles(),
  });
};

export const invalidateArticlesQuery = () => {
  queryClient.invalidateQueries({ queryKey: [ARTICLES_QUERY_KEY] });
};

export const getCachedArticleById = (id?: string) => {
  if (!id) return undefined;
  const articles = queryClient.getQueryData<Article[]>([ARTICLES_QUERY_KEY]);

  return articles?.find((article) => article.id === id);
};
