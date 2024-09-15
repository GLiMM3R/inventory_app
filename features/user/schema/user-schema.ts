import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" }),
  password: z.string().min(5, { message: "Password lenght must more than 5!" }),
  email: z.string().email(),
  branch_id: z.string(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
