import api from "@/shared/api/apiMiddleware";
import { UpdateUser, User } from "../type";

export const updateUser = async (data: UpdateUser): Promise<User> => {
  const response = await api.put<User>(`/user`, data);

  return response.data;
};
