import { useMutation } from "@tanstack/react-query";
import { deleteSocialMedia } from "../api/deleteSocialMedia";

export const useDeleteSocialMediaMutation = () => {
  return useMutation({
    mutationFn: deleteSocialMedia,
  });
};
