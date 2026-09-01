import axios from "axios";
import type {
  PaginatedProducts,
  Product,
  ProductFilters,
} from "../types/product";
import type { ProductFormValues } from "../schema/productSchema";

const apiUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const PRODUCTS_PER_PAGE = 8;

type JsonServerPaginatedResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Product[];
};

export const getProducts = async (
  filters?: ProductFilters,
): Promise<PaginatedProducts> => {
  const response = await apiUrl.get<JsonServerPaginatedResponse>("/products", {
    params: {
      name: filters?.search || undefined,
      categoryId: filters?.category || undefined,
      _page: filters?.page || 1,
      _per_page: PRODUCTS_PER_PAGE,
    },
  });

  return {
    data: response.data.data,
    totalCount: response.data.items,
    totalPages: response.data.pages,
  };
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiUrl.get<Product>(`/products/${id}`);

  return response.data;
};

const buildPayload = (data: ProductFormValues) => ({
  name: data.name,
  price: data.price,
  categoryId: data.categoryId,
  image: {
    thumbnail: data.image,
    mobile: data.image,
    tablet: data.image,
    desktop: data.image,
  },
});

export const createProduct = async (
  data: ProductFormValues,
): Promise<Product> => {
  const response = await apiUrl.post<Product>("/products", buildPayload(data));

  return response.data;
};

export const updateProduct = async (
  id: number,
  data: ProductFormValues,
): Promise<Product> => {
  const response = await apiUrl.put<Product>(
    `/products/${id}`,
    buildPayload(data),
  );

  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await apiUrl.delete(`/products/${id}`);
};
