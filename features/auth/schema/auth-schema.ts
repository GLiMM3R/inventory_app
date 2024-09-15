import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" }),
  password: z.string().min(5, { message: "Password lenght must more than 5!" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
