import api from "@/shared/api/apiMiddleware";
import { UpdatePageContentRequest, User } from "../type";

export const updatePageContent = async (
  data: UpdatePageContentRequest
): Promise<User> => {
  const response = await api.put<User>(`/user/page-content`, data);

  return response.data;
};
