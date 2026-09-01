import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../services/product";
import type { ProductFilters } from "../types/product";

export const useProductsQuery = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
};

export const useProductQuery = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
    retry: false,
  });
};
