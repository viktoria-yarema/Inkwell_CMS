import api from "@/shared/api/apiMiddleware";

export const deleteArticle = async (id: string): Promise<void> => {
  const response = await api.delete(`/articles/${id}`);
  return response.data;
};
