import { useMutation } from "@tanstack/react-query";
import { updateSocialMedia } from "../api/updateSocialMedia";

export const useUpdateSocialMediaMutation = () => {
  return useMutation({
    mutationFn: updateSocialMedia,
  });
};
