import { getArticleById } from "../api/getArticleById";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = "article";

export const useGetArticleQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getArticleById(id),
    enabled: !!id,
  });
};
