import { useMemo, useState } from "react";
import type { Product } from "../types/product";
import QuantityStepper from "./QuantityStepper";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

type ProductCardTypes = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardTypes) {
  const item = useCartStore((state) =>
    state.items.find((item) => item.id === product.id),
  );

  const addToCart = useCartStore((state) => state.addToCart);

  const quantity = item?.quantity ?? 0;

  return (
    <article className="w-full max-w-[300px]">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image.desktop}
            alt={product.name}
            className="w-full rounded-xl object-cover"
          />
        </Link>

        {quantity === 0 ? (
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="
              absolute
              bottom-0
              left-1/2
              flex
              -translate-x-1/2
              translate-y-1/2
              items-center
              justify-center
              gap-2
              whitespace-nowrap
              rounded-full
              border
              border-[#ad3f1f]
              bg-white
              px-8
              py-3
              text-base
              font-medium
              text-black
              transition
              hover:bg-[#fff7f4]
            "
          >
            <img
              src="/images/icon-add-to-cart.svg"
              alt=""
              className="h-5 w-5"
            />
            Add to Cart
          </button>
        ) : (
          <QuantityStepper productId={product.id} quantity={quantity} />
        )}
      </div>
      <div className="mt-10">
        <p className="text-sm font-normal text-[#a08f89]">{product.category}</p>

        <Link to={`/product/${product.id}`}>
          <h2 className="mt-1 text-xl font-semibold text-black">
            {product.name}
          </h2>
        </Link>

        <p className="mt-1 text-xl font-medium text-[#c94320]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}
