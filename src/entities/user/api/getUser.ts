import api from "@/shared/api/apiMiddleware";
import { User } from "../type";

export const getUser = async (): Promise<User> => {
  const response = await api.get<User>(`/user`);

  return response.data;
};
