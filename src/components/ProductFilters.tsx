import { useCategoriesQuery } from "../hooks/useCategoriesQueries";
import type { Category } from "../types/product";

type ProductFiltersProps = {
  search: string;
  category: number | "";
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: number | "") => void;
};

export default function ProductFilters({
  search,
  category,
  onCategoryChange,
  onSearchChange,
}: ProductFiltersProps) {
  const { data: categories = [] } = useCategoriesQuery();

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="rounded-lg border px-4 py-3"
      />

      <select
        value={category}
        onChange={(event) =>
          onCategoryChange(event.target.value ? Number(event.target.value) : "")
        }
        className="rounded-lg border px-4 py-3"
      >
        <option value="">All categories</option>
        {categories.map((cat: Category) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
