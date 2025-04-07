import api from "@/shared/api/apiMiddleware";
import { Tag } from "../type";

export type CreateTag = Omit<Tag, "id" | "createdAt" | "updatedAt">;

export const createTag = async (tag: CreateTag): Promise<Tag> => {
  const response = await api.post<Tag>("/tags/create", tag);
  return response.data;
};
