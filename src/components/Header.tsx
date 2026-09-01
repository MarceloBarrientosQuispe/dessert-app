import { useCartStore } from "../store/cartStore";

type HeaderProps = {
  onCartClick: () => void;
};

export default function Header({ onCartClick }: HeaderProps) {
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-4xl font-bold text-[#260f08]">Desserts</h1>

      <button
        type="button"
        onClick={onCartClick}
        aria-label="Open cart"
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#fff3ee]"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c73b0f] text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
