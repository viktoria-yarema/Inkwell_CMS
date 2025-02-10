import { z } from "zod";
import { loginSchema } from "./validations";

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type LoginResponse = {
  token: string;
  refreshToken: string;
};
