import api from "@/shared/api/apiMiddleware";
import { SignupResponse, SignupSchemaType } from "../type";

export const signup = async (
  data: SignupSchemaType
): Promise<SignupResponse> => {
  const response = await api.post("/register-user", data);

  return response.data;
};
