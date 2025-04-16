import { productInsertSchema } from "@/lib/validators";
import { z } from "zod";

export type Product = z.infer<typeof productInsertSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};
