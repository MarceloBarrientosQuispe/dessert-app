export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-xl bg-gray-500" />

      <div className="mt-4 h-4 w-20 rounded bg-gray-500" />

      <div className="mt-2 h-5 w-40 rounded bg-gray-500" />

      <div className="mt-2 h-5 w-16 rounded bg-gray-500" />
    </div>
  );
}
