import { getArticleById } from "../api/getArticleById";
import { useQuery } from "@tanstack/react-query";

export const useGetArticleQuery = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id),
  });
};
