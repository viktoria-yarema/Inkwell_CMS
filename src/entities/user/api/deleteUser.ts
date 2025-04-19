import api from "@/shared/api/apiMiddleware";

export const deleteUser = async (): Promise<void> => {
  await api.delete(`/user`);
};
