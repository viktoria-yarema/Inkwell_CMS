import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/getUser";

export default function useUserQuery() {
  return useQuery({ queryKey: ["user"], queryFn: getUser });
}
