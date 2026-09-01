import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProductQuery } from "../hooks/useProductsQueries";
import { useUpdateProduct } from "../hooks/useProductsMutations";
import type { ProductFormValues } from "../schema/productSchema";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = id ? Number(id) : NaN;
  const { data: product, isLoading } = useProductQuery(productId);
  const { mutate, isPending } = useUpdateProduct();

  const handleSubmit = (data: ProductFormValues) => {
    mutate(
      { id: productId, data },
      {
        onSuccess: () => navigate(`/product/${productId}`),
      },
    );
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[600px] px-6 py-10">
        <p>Cargando producto...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-[600px] px-6 py-10">
        <p>Product not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[600px] px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold text-[#260f08]">
       Edit product
      </h1>

      <ProductForm
        defaultValues={{
          name: product.name,
          price: product.price,
          categoryId: product.categoryId,
          image: product.image.desktop,
        }}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Guardar cambios"
      />
    </main>
  );
}
