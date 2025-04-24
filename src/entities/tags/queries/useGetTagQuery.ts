import { useQuery } from "@tanstack/react-query";
import { getTagById } from "../api/getTagById";
import { getCachedTagById } from "./useGetTagsQuery";
import { queryClient } from "@/shared/providers/ReactQueryProvider";

export const useGetTagQuery = (id?: string) => {
  return useQuery({
    queryKey: ["tag", id],
    queryFn: () => getTagById(id!),
    enabled: !!id,
    initialData: () => getCachedTagById(id),
  });
};

export const invalidateTagQuery = (id: string) => {
  queryClient.invalidateQueries({ queryKey: ["tag", id] });
};
