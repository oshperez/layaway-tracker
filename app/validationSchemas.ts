import { z } from "zod";

export const layawaySchema = z.object({
  customerName: z.string().min(2, "Name is required").max(255),
  customerPhone: z.string().min(10, "Phone is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const userSchema = z.object({
  name: z.string().min(5, "Name is required").max(255).optional(),
  email: z.string().email("Email is required"),
  password: z.string().min(5, "Password is required"),
});
