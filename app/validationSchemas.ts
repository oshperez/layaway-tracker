import { z } from "zod";

export const createLayawaySchema = z.object({
  customerName: z.string().min(2, "Name is required").max(255),
  customerPhone: z.string().min(10, "Phone is required").max(255),
  description: z.string().min(1, "Description is required"),
});
