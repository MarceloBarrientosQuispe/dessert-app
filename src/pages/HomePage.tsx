import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import ProductFilters from "../components/ProductFilters";
import Header from "../components/Header";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useCartStore } from "../store/cartStore";

export default function HomePage() {
  const { removeFromCart, items } = useCartStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

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

  console.log(search);

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

          {/* CART */}
          <aside className="h-fit rounded-xl bg-white p-7 lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold text-[#c73b0f]">
              Your Cart ({cartCount})
            </h2>

            {items.length === 0 ? (
              /* EMPTY CART */
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
            ) : (
              /* CART WITH PRODUCTS */
              <div className="mt-6">
                <div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-[#f0e5e2] py-4 first:pt-0"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-[#260f08]">
                            {item.name}
                          </h3>

                          <div className="mt-2 flex items-center gap-3 text-sm">
                            <span className="font-semibold text-[#c73b0f]">
                              {item.quantity}x
                            </span>

                            <span className="text-[#87635a]">
                              @ ${item.price.toFixed(2)}
                            </span>

                            <span className="font-medium text-[#87635a]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#caafa7] text-[#caafa7] transition hover:border-[#c73b0f] hover:text-[#c73b0f]"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm text-[#260f08]">Order Total</span>

                  <span className="text-2xl font-bold text-[#260f08]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-[#fcf8f6] px-4 py-4 text-sm">
                  <span className="text-xl text-[#1fa774]">♧</span>

                  <span className="text-[#260f08]">
                    This is a <strong>carbon neutral</strong> delivery
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-6 w-full rounded-full bg-[#c73b0f] py-4 font-bold text-white transition hover:bg-[#a92f09]"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}
