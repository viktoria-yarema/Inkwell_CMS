import api from "@/shared/api/apiMiddleware";

export const deleteTag = async (id: string): Promise<void> => {
  await api.delete(`/tags/delete/${id}`);
};
