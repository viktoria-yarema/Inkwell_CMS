import { z } from "zod";
import { loginSchema, signupSchema } from "./validations";

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type SignupSchemaType = z.infer<typeof signupSchema>;

export type LoginResponse = {
  token: string;
};

export type SignupResponse = {
  token: string;
};
