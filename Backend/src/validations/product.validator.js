import { z } from "zod";

export const postProductDto = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title cannot exceed 150 characters")
    .trim(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description too long"),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price cannot be negative"),

  category: z
    .string()
    .min(2, "Category is required"),

  brand: z
    .string()
    .optional(),

  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, "Stock cannot be negative"),

  images: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL"),
        altText: z.string().optional(),
      })
    )
    .optional(),

  tags: z
    .array(z.string().toLowerCase())
    .optional(),

  isFeatured: z
    .boolean()
    .optional(),

  isActive: z
    .boolean()
    .optional(),
}).strict();