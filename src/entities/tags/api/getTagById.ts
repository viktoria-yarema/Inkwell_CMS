import api from "@/shared/api/apiMiddleware";
import { Tag } from "../type";
import { formatTag } from "../utils";

export const getTagById = async (id: string): Promise<Tag> => {
  const response = await api.get<Tag>(`/tags/${id}`);
  return formatTag(response.data);
};
