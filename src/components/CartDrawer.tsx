import { useCartStore } from "../store/cartStore";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmOrder: () => void;
};

export default function CartDrawer({
  isOpen,
  onClose,
  onConfirmOrder,
}: CartDrawerProps) {
  const { items, removeFromCart } = useCartStore();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[380px] transform overflow-y-auto bg-white p-7 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#c73b0f]">
            Your Cart ({cartCount})
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-2xl text-[#87635a]"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
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
              onClick={onConfirmOrder}
              className="mt-6 w-full rounded-full bg-[#c73b0f] py-4 font-bold text-white transition hover:bg-[#a92f09]"
            >
              Confirm Order
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
