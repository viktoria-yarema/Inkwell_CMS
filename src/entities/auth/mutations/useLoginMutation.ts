import { login } from "../api/login";
import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType } from "../type";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginSchemaType) => login(data),
  });
};
