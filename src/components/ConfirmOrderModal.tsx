import type { CartItem } from "../store/cartStore";

type ConfirmOrderModalProps = {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
};

export default function ConfirmOrderModal({
  isOpen,
  items,
  total,
  onClose,
}: ConfirmOrderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 md:items-center">
      <div className="w-full max-w-[480px] rounded-t-2xl bg-white p-8 md:rounded-2xl">
        <img
          src="/images/icon-order-confirmed.svg"
          alt=""
          className="h-12 w-12"
        />

        <h2 className="mt-6 text-3xl font-bold text-[#260f08]">
          Order Confirmed
        </h2>

        <p className="mt-2 text-sm text-[#87635a]">
          We hope you enjoy your food!
        </p>

        <div className="mt-6 max-h-[280px] overflow-y-auto rounded-xl bg-[#fcf8f6] p-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border-b border-[#f0e5e2] py-3 first:pt-0 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image.thumbnail}
                  alt={item.name}
                  className="h-10 w-10 rounded-md object-cover"
                />

                <div>
                  <h3 className="text-sm font-medium text-[#260f08]">
                    {item.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="font-semibold text-[#c73b0f]">
                      {item.quantity}x
                    </span>

                    <span className="text-[#87635a]">
                      @ ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <span className="font-medium text-[#260f08]">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="mt-4 flex items-center justify-between pt-3">
            <span className="text-sm text-[#260f08]">Order Total</span>

            <span className="text-xl font-bold text-[#260f08]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-[#c73b0f] py-4 font-bold text-white transition hover:bg-[#a92f09]"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
