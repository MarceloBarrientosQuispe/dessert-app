import axios from "axios";
import type { Product, ProductFilters } from "../types/product";
import type { ProductFormValues } from "../schema/productSchema";

const apiUrl = axios.create({
  baseURL: "http://localhost:3000",
});

export const getProducts = async (
  filters?: ProductFilters,
): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const response = await apiUrl.get<Product[]>("/products", {
    params: {
      name: filters?.search || undefined,
      categoryId: filters?.category || undefined,
    },
  });

  return response.data;
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
