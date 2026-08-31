import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import ProductFilters from "../components/ProductFilters";
import Header from "../components/Header";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useProducts({
    search,
    category,
  });

  if (isError) {
    return <p>Error al cargar los productos: {error.message}</p>;
  }

  return (
    <>
      <main className="mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <Header />

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
          </section>

          <aside className="h-fit rounded-xl bg-white p-7 lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold text-[#c73b0f]">Your Cart {0}</h2>

            <div className="flex flex-col items-center justify-center py-10">
              <img
                src="/images/illustration-empty-cart.svg"
                alt="No products in cart"
                className="mb-6 w-32"
              />

              <p className="text-sm font-medium text-[#87635a]">
                Your added items will appear here
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
