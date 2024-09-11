import { z } from "zod";

export const InventorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Quantity must be a non-negative number",
    }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
});

export type InventorySchemaType = z.infer<typeof InventorySchema>;
