import api from "@/shared/api/apiMiddleware";
import { AddSocialMediaRequest, User } from "../type";

export const addSocialMedia = async (data: AddSocialMediaRequest): Promise<User> => {
  const response = await api.post<User>(`/user/social-media`, data);

  return response.data;
};
