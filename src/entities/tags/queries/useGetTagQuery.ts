import { useQuery } from "@tanstack/react-query";
import { getTagById } from "../api/getTagById";
import { getCachedTagById } from "./useGetTagsQuery";

export const useGetTagQuery = (id?: string) => {
  return useQuery({
    queryKey: ["tag", id],
    queryFn: () => getTagById(id!),
    enabled: !!id,
    initialData: () => getCachedTagById(id),
  });
};
