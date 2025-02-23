import api from "@/shared/api/apiMiddleware";
import { LoginResponse, LoginSchemaType } from "../type";

export const login = async (data: LoginSchemaType): Promise<LoginResponse> => {
  const response = await api.post("/login", data);

  return response.data;
};
