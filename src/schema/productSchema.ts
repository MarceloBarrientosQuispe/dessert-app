import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "The name must be at least 3 characters long."),
  price: z.coerce.number().positive("The price must be greater than 0"),
  categoryId: z.coerce.number().min(1, "Select a category"),
  image: z.string().url("It must be a valid URL"),
});

export type ProductFormValues = z.output<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;
