import { useMutation } from "@tanstack/react-query";
import { deleteTag } from "../api/deleteTag";
import { invalidateTagsQuery } from "../queries/useGetTagsQuery";

export const useDeleteTagMutation = () => {
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      invalidateTagsQuery();
    },
  });
};
