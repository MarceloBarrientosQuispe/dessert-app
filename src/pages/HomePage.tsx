import { useState } from "react";
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const { items, clearCart } = useCartStore();

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProductsQuery({
    search,
    category,
  });

  if (isError) {
    return <p>Error al cargar los productos: {error.message}</p>;
  }

  const handleConfirmOrder = () => {
    setIsCartOpen(false);
    setIsOrderConfirmed(true);
  };

  const handleCloseConfirmedModal = () => {
    setIsOrderConfirmed(false);
    clearCart();
  };

  return (
    <>
      <main className="mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-12">
        <Header onCartClick={() => setIsCartOpen(true)} />

        <ProductFilters
          search={search}
          category={category}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
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
