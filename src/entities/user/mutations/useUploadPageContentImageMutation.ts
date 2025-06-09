import { useMutation } from "@tanstack/react-query";
import { uploadPageContentImage } from "../api/uploadPageContentImage";

export const useUploadPageContentImageMutation = () => {
  return useMutation({
    mutationFn: uploadPageContentImage,
  });
};