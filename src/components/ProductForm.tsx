import { useForm } from "react-hook-form";
import {
  productSchema,
  type ProductFormValues,
  type ProductFormInput,
} from "../schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category } from "../types/product";
import { useCategoriesQuery } from "../hooks/useCategoriesQueries";

type ProductFormProps = {
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting: boolean;
  submitLabel: string;
};

export default function ProductForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}: ProductFormProps) {
  const { data: categories = [] } = useCategoriesQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      categoryId: 0,
      image: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-[#260f08]">
          Nombre
        </label>

        <input
          type="text"
          {...register("name")}
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#260f08]">
          Precio
        </label>

        <input
          type="number"
          step="0.01"
          {...register("price")}
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#260f08]">
          Categoría
        </label>

        <select
          {...register("categoryId")}
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value={0}>Selecciona una categoría</option>
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#260f08]">
          URL de imagen
        </label>

        <input
          type="text"
          {...register("image")}
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.image && (
          <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-full bg-[#c73b0f] py-4 font-bold text-white transition hover:bg-[#a92f09] disabled:opacity-60"
      >
        {isSubmitting ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
