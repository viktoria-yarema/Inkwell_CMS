import { useMutation } from "@tanstack/react-query";
import { addSocialMedia } from "../api/addSocialMedia";

export const useAddSocialMediaMutation = () => {
  return useMutation({
    mutationFn: addSocialMedia,
  });
};
