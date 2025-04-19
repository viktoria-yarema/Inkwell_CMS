import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/getUser";
import { queryClient } from "@/shared/providers/ReactQueryProvider";

export default function useUserQuery() {
  return useQuery({ queryKey: ["user"], queryFn: getUser });
}

export const invalidateUserQuery = () => {
  queryClient.invalidateQueries({ queryKey: ["user"] });
};
