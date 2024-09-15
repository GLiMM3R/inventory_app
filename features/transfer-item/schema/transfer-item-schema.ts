import { z } from "zod";

export const TransferItemSchema = z.object({
  to_branch_id: z.string(),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Quantity must be a positive number",
  }),
});

export type TransferItemSchemaType = z.infer<typeof TransferItemSchema>;
