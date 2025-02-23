import { useMutation } from "@tanstack/react-query";
import { createArticle } from "../api/createArticle";

export const useCreateArticleMutation = () => {
  return useMutation({ mutationFn: createArticle });
};
