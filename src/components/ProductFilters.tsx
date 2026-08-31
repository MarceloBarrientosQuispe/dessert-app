type ProductFiltersProps = {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export default function ProductFilters({
  search,
  category,
  onCategoryChange,
  onSearchChange,
}: ProductFiltersProps) {
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
        onChange={(event) => onCategoryChange(event.target.value)}
        className="rounded-lg border px-4 py-3"
      >
        <option value="">All categories</option>
        <option value="Waffle">Waffle</option>
        <option value="Crème Brûlée">Crème Brûlée</option>
        <option value="Macaron">Macaron</option>
        <option value="Tiramisu">Tiramisu</option>
        <option value="Baklava">Baklava</option>
        <option value="Pie">Pie</option>
        <option value="Cake">Cake</option>
        <option value="Brownie">Brownie</option>
        <option value="Panna Cotta">Panna Cotta</option>
      </select>
    </div>
  );
}
