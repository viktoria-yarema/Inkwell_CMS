import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/updateUser";

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
