import axios from "axios";
import type { Product, ProductFilters } from "../types/product";

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
      category: filters?.category || undefined,
    },
  });

  console.log("PRODUCTS:", response.data);

  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiUrl.get<Product>(`/products/${id}`);

  return response.data;
};
