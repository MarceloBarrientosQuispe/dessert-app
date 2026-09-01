import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useCreateProduct } from "../hooks/useProductsMutations";
import type { ProductFormValues } from "../schema/productSchema";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateProduct();

  const handleSubmit = (data: ProductFormValues) => {
    mutate(data, {
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <main className="mx-auto max-w-[600px] px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-[#260f08]">Create Product</h1>

      <ProductForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Crear producto"
      />
    </main>
  );
}
