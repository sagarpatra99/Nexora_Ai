import { z } from "zod";

export const registerDto = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot exceed 20 characters")
    .trim(),

  email: z.string().email("Invalid email format").toLowerCase().trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine(
      (val) =>
        /[A-Z]/.test(val) && // uppercase
        /[a-z]/.test(val) && // lowercase
        /[0-9]/.test(val) && // number
        /[^A-Za-z0-9]/.test(val), // special char
      {
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      },
    ),

  role: z.enum(["admin", "user", "seller"]).optional().default("user"),
});

export const loginDto = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
