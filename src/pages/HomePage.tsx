import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import Header from "../components/Header";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import CartDrawer from "../components/CartDrawer";
import { useProductsQuery } from "../hooks/useProductsQueries";
import { useCartStore } from "../store/cartStore";
import ConfirmOrderModal from "../components/ConfirmOrderModal";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<number | "">("");
  const [page, setPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const { items, clearCart } = useCartStore();

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const { data, isLoading, isError, error } = useProductsQuery({
    search,
    category,
    page,
  });

  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isError) {
    return <p>Error to loading data: {error.message}</p>;
  }

  const handleConfirmOrder = () => {
    setIsCartOpen(false);
    setIsOrderConfirmed(true);
  };

  const handleCloseConfirmedModal = () => {
    setIsOrderConfirmed(false);
    clearCart();
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: number | "") => {
    setCategory(value);
    setPage(1);
  };

  return (
    <>
      <main className="mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-12">
        <Header onCartClick={() => setIsCartOpen(true)} />

        <div className="mb-6">
          <Link
            to="/product/new"
            className="inline-block rounded-full bg-[#c73b0f] px-6 py-3 font-bold text-white transition hover:bg-[#a92f09]"
          >
            + Add Product
          </Link>
        </div>

        <ProductFilters
          search={search}
          category={category}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

          {!isLoading && products.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <h2 className="text-xl font-bold">No products found</h2>

              <p className="mt-2 text-gray-500">
                Try another search or category.
              </p>
            </div>
          )}
        </div>

        {!isLoading && products.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="rounded-full border border-[#caafa7] px-5 py-2 font-medium text-[#260f08] disabled:opacity-40"
            >
              Back
            </button>

            <span className="text-sm text-[#87635a]">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page >= totalPages}
              className="rounded-full border border-[#caafa7] px-5 py-2 font-medium text-[#260f08] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onConfirmOrder={handleConfirmOrder}
      />

      <ConfirmOrderModal
        isOpen={isOrderConfirmed}
        items={items}
        total={cartTotal}
        onClose={handleCloseConfirmedModal}
      />
    </>
  );
}
