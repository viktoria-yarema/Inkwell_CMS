import api from "@/shared/api/apiMiddleware";
import { Tag } from "../type";
import { formatTag } from "../utils";

export const getTags = async (): Promise<Tag[]> => {
  const response = await api.get<Tag[]>("/tags");
  return response.data.map(formatTag);
};
