export type Product = {
  id: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  categoryId: number;
  price: number;
};

export type ProductFilters = {
  search?: string;
  category?: number | "";
  page?: number;
};

export type Category = {
  id: number;
  name: string;
};

export type PaginatedProducts = {
  data: Product[];
  totalCount: number;
  totalPages: number;
};
