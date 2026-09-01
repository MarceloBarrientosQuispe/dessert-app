type DeleteConfirmModalProps = {
  isOpen: boolean;
  productName: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

export default function DeleteConfirmModal({
  isOpen,
  productName,
  onCancel,
  onConfirm,
  isDeleting,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-8">
        <h2 className="text-xl font-bold text-[#260f08]">
          Delete Product?
        </h2>

        <p className="mt-2 text-sm text-[#87635a]">
          This action cannot be undone. It will be deleted{" "}
          <strong>{productName}</strong> permanently.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-[#caafa7] py-3 font-medium text-[#260f08]"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 rounded-full bg-red-600 py-3 font-bold text-white disabled:opacity-60"
          >
            {isDeleting ? "Deleating..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
