import { useMutation } from "@tanstack/react-query";
import { createTag } from "../api/createTag";

export const useCreateTagMutation = () => {
  return useMutation({ mutationFn: createTag });
};

