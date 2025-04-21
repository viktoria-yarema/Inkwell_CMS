import { signup } from "../api/signup";
import { useMutation } from "@tanstack/react-query";
import { SignupSchemaType } from "../type";

export const useSignupMutation = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupSchemaType) => signup(data),
  });
};
