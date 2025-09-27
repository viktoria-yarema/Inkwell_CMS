import api from "@/shared/api/apiMiddleware";
import { UpdateSocialMediaRequest, User } from "../type";

export const updateSocialMedia = async (data: UpdateSocialMediaRequest): Promise<User> => {
  const response = await api.put<User>(`/user/social-media`, data);

  return response.data;
};
