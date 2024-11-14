import { z } from "zod";

export const validEmail = z.object({
  email: z.string().email("Invalid email address"),
});

// error types
export type ValidEmailError = z.inferFlattenedErrors<
  typeof validEmail
>["fieldErrors"];
