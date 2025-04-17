import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z.string().refine(
  (val) => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(formatNumberWithDecimal(Number(val)));
  },
  {
    message: "Price must be a valid number with up to 2 decimal places",
  }
);

// Schema for inserting  products

export const productInsertSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  brand: z.string().min(3, "Brand must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// schema for sighin users in

export const signInFromSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
