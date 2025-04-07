import { useMutation } from "@tanstack/react-query";
import { updateTag } from "../api/updateTag";

export const useUpdateTagMutation = () => {
  // const client = useQueryClient();
  return useMutation({
    mutationFn: updateTag,
    // onMutate: (variables) => {
    //   client.cancelQueries({ queryKey: [TAGS_QUERY_KEY] });
    //   const previousTags = client.getQueryData<Tag[]>([TAGS_QUERY_KEY]);

    //   const previousTag = previousTags?.find((tag) => tag.id === variables.id);
    //   const updatedTag = { ...previousTag, ...variables };
    //   client.setQueryData([TAGS_QUERY_KEY], (old: Tag[]) => {
    //     return old.map((tag) => (tag.id === variables.id ? updatedTag : tag));
    //   });

    //   return { previousTags, previousTag };
    // },
    // onError: (error, variables, context: any) => {
    //   client.setQueryData([TAGS_QUERY_KEY], context?.previousTags);
    // },
    // onSettled: () => {
    //   client.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] });
    // },
  });
};
