import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api/deleteUser";

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
