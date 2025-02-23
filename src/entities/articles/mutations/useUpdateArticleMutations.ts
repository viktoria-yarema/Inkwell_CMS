import { useMutation } from "@tanstack/react-query";
import { updateArticle } from "../api/updateArticle";

export const useUpdateArticleMutation = () => {
  return useMutation({ mutationFn: updateArticle });
};
