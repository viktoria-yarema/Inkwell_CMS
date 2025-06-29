import { useMutation } from "@tanstack/react-query";
import { updatePageContent } from "../api/updatePageContent";

export const useUpdatePageContentMutation = () => {
  return useMutation({
    mutationFn: updatePageContent,
  });
};
