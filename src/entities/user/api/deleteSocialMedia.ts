import api from "@/shared/api/apiMiddleware";
import { User } from "../type";

export const deleteSocialMedia = async (id: string): Promise<User> => {
  const response = await api.delete<User>(`/user/social-media/${id}`);

  return response.data;
};
