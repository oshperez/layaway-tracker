import { z } from "zod";

export const layawaySchema = z.object({
  item: z.string().min(1, "Item is required"),
  description: z.string().optional(),
  value: z.number().min(1, "Value is required"),
  downPayment: z.number().min(1, "Down Payment is required"),
  packageCode: z.string().min(1, "Package code is required"),
  setReminder: z.boolean(),
  customerId: z.string().min(1, "Customer id is required"),
});

export const userSchema = z.object({
  name: z.string().min(5, "Name is required").max(255).optional(),
  email: z.string().email("Email is required"),
  password: z.string().min(5, "Password is required"),
});

export const customerSchema = z.object({
  name: z.string().min(5, "Name is required").max(255),
  phone: z.string().min(10, "Phone is required").max(255),
});
