import type { Product } from "../types/product";
import QuantityStepper from "./QuantityStepper";

type ProductCardTypes = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardTypes) {
  return (
    <div className="w-full max-w-[300px]">
      {/* Image + Cart button */}
      <div className="relative">
        <img
          src={product.image.desktop}
          alt={product.name}
          className="w-full rounded-xl object-cover"
        />

        {/* Add cart Button */}
        {true ? (
          <button
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
          <QuantityStepper />
        )}
      </div>

      {/* Product information */}
      <div className="mt-10">
        <p className="text-sm font-normal text-[#a08f89]">
          {product.category}
        </p>

        <h2 className="mt-1 text-xl font-semibold text-black">
          {product.name}
        </h2>

        <h3 className="mt-1 text-xl font-medium text-[#c94320]">
          ${product.price.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}
