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
export const patchLayawaySchema = z.object({
  item: z.string().min(1, "Item is required").max(255).optional(),
  description: z
    .string()
    .min(5, "Description is required")
    .max(65535)
    .optional(),
  value: z.number().min(1, "Value is required").optional(),
  downPayment: z.number().min(1, "Down Payment is required").optional(),
  packageCode: z
    .string()
    .min(1, "Package code is required")
    .max(255)
    .optional(),
  setReminder: z.boolean().optional(),
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

export const patchCustomerSchema = z.object({
  name: z.string().min(5, "Name is required").max(255).optional(),
  phone: z.string().min(10, "Phone is required").max(255).optional(),
});

export const paymentSchema = z.object({
  amount: z.number().min(1, "Amount is required"),
  paymentMethod: z.enum(["CARD", "CASH"]).nullable(),
  layawayId: z.number().min(1, "Layaway id is required"),
  customerId: z.number().min(1, "Customer id is required"),
});

export const paymentFormDataSchema = z.object({
  amount: z.number().min(1, "Amount is required"),
  paymentMethod: z.enum(["CARD", "CASH", "UNKNOWN"]),
});
