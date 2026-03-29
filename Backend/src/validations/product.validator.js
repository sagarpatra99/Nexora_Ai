import { z } from "zod";
import mongoose from "mongoose";

export const postProductDto = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(150, "Title cannot exceed 150 characters")
      .trim(),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(2000, "Description too long"),

    price: z.preprocess(
      (val) => Number(val),
      z.number().min(0, "Price cannot be negative")
    ),

    category: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid category ID",
      }),

    brand: z.string().optional(),

    stock: z.preprocess(
      (val) => Number(val),
      z.number().min(0, "Stock cannot be negative")
    ),

    images: z
      .array(
        z.object({
          url: z.string().url("Invalid image URL"),
          altText: z.string().optional(),
        })
      )
      .optional(),

    tags: z
      .array(z.string())
      .transform((tags) => tags.map((tag) => tag.toLowerCase()))
      .optional(),

    isFeatured: z.boolean().optional(),

    isActive: z.boolean().optional(),
  })
  .strict();