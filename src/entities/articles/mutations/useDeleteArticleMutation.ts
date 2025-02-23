import { useMutation } from "@tanstack/react-query";
import { deleteArticle } from "../api/deleteArticle";
import { invalidateArticlesQuery } from "../queries/useGetArticlesQuery";

export const useDeleteArticleMutation = () => {
  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),
    onSuccess: () => {
      invalidateArticlesQuery();
    },
  });
};
