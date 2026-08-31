import React from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useProduct(id ?? "");

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <p>Cargando producto...</p>
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
          <p className="text-sm text-gray-500">{product.category}</p>

          <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>

          <p className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </main>
  );
}
