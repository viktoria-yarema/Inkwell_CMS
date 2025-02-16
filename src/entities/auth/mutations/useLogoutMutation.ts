import { useMutation } from "@tanstack/react-query";
import logout from "../api/logout";

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};
