import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticles } from "../api/getArticles";
import { queryClient } from "@/shared/providers/ReactQueryProvider";
import { Article } from "../type";

export const ARTICLES_QUERY_KEY = "articles";

export const useGetArticlesQuery = ({ limit = 1 }: { limit?: number }) => {
  return useInfiniteQuery({
    queryKey: [ARTICLES_QUERY_KEY, { limit }],
    queryFn: ({ pageParam = 1 }) => getArticles({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.meta.page > 1) {
        return firstPage.meta.page - 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const invalidateArticlesQuery = () => {
  queryClient.invalidateQueries({ queryKey: [ARTICLES_QUERY_KEY] });
};

export const getCachedArticleById = (id?: string, limit?: number) => {
  if (!id) return undefined;

  const articlesData = queryClient.getQueryData<{
    pages: { articles: Article[] }[];
  }>([ARTICLES_QUERY_KEY, { limit }]);

  if (!articlesData) return undefined;

  for (const page of articlesData.pages) {
    const article = page.articles.find((article) => article.id === id);
    if (article) return article;
  }

  return undefined;
};
