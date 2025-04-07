import api from "@/shared/api/apiMiddleware";
import { Tag, UpdateTag } from "../type";

export const updateTag = async (tag: UpdateTag): Promise<Tag> => {
  const response = await api.put<Tag>(`/tags/update/${tag.id}`, {
    ...tag,
    updatedAt: new Date().toISOString(),
  });
  return response.data;
};
