import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";

import { getProducts } from "./services/product";
import type { Product } from "./types/product";

function App() {
  // const [store, setStore] = useState([])
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError("No se puedieron cargar los productos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);


  return (
    <>
      <main className="mx-auto max-w-[1440px] px-6 py-10 md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <Header />

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-xl bg-white p-7 lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold text-[#c73b0f]">Your Cart {0}</h2>

            {true ? (
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
              <div></div>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
