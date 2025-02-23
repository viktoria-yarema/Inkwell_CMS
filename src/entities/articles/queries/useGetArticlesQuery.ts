import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../api/getArticles";

export const useGetArticlesQuery = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(),
  });
};
