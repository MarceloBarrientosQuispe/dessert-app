import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductQuery } from "../hooks/useProductsQueries";
import { useCategoriesQuery } from "../hooks/useCategoriesQueries";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { useState } from "react";
import { useDeleteProduct } from "../hooks/useProductsMutations";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const productId = id ? Number(id) : NaN;
  const { data: product, isLoading, isError } = useProductQuery(productId);

  const { data: categories = [] } = useCategoriesQuery();
  const categoryName = categories.find(
    (cat) => cat.id === product?.categoryId,
  )?.name;

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const handleConfirmDelete = () => {
    deleteProduct(productId, {
      onSuccess: () => navigate("/"),
    });
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <p>Loading Products...</p>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-bold">404</h1>

        <p className="mt-4 text-xl">Product not found</p>

        <Link
          to="/"
          className="mt-6 rounded-lg bg-[#c73b0f] px-5 py-3 text-white"
        >
          Back to desserts
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-10">
      <Link to="/">← Back to desserts</Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <img
          src={product.image.desktop}
          alt={product.name}
          className="w-full rounded-xl"
        />

        <div>
          {categoryName && (
            <span className="inline-block rounded-full bg-[#fff3ee] px-3 py-1 text-xs font-medium text-[#c73b0f]">
              {categoryName}
            </span>
          )}

          <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</p>

          <div className="mt-8 flex gap-3">
            <Link
              to={`/product/${product.id}/edit`}
              className="flex-1 rounded-full border border-[#c73b0f] py-3 text-center font-medium text-[#c73b0f]"
            >
              Editar
            </Link>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex-1 rounded-full bg-red-600 py-3 font-bold text-white"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        productName={product.name}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </main>
  );
}
