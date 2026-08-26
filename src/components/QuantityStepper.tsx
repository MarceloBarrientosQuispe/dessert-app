export default function QuantityStepper() {
  return (
    <div
      className="absolute
              bottom-0
              left-1/2
              flex
              -translate-x-1/2
              translate-y-1/2
              items-center
              justify-center"
    >
      <div className="inline-flex items-center justify-between w-40 px-3 py-2 bg-[#c73b0f] text-white rounded-full select-none">
        <button
          type="button"
          className="w-5 h-5 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-[#c73b0f] transition-colors"
        >
          <img
            src="/images/icon-decrement-quantity.svg"
            alt="decrease icon"
            className="w-2.5 h-2.5"
          />
        </button>

        <span className="text-sm font-semibold">1</span>

        <button
          type="button"
          className="w-5 h-5 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-[#c73b0f] transition-colors"
        >
          <img
            src="/images/icon-increment-quantity.svg"
            alt="add icon"
            className="w-2.5 h-2.5"
          />
        </button>
      </div>
    </div>
  );
}
