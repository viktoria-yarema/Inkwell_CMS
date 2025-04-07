import { useQuery } from "@tanstack/react-query";
import { getTags } from "../api/getTags";
import { queryClient } from "@/shared/providers/ReactQueryProvider";
import { Tag } from "../type";

export const TAGS_QUERY_KEY = "tags";

export const useGetTagsQuery = () => {
  return useQuery({
    queryKey: [TAGS_QUERY_KEY],
    queryFn: () => getTags(),
  });
};

export const invalidateTagsQuery = () => {
  queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] });
};

export const getCachedTagById = (id?: string) => {
  if (!id) return undefined;
  const tags = queryClient.getQueryData<Tag[]>([TAGS_QUERY_KEY]);

  return tags?.find((tag) => tag.id === id);
};
