import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-[#c73b0f]">404</h1>

      <h2 className="mt-4 text-2xl font-bold">Page not found</h2>

      <p className="mt-2 text-gray-500">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-[#c73b0f] px-6 py-3 font-semibold text-white"
      >
        Back to desserts
      </Link>
    </main>
  );
}
