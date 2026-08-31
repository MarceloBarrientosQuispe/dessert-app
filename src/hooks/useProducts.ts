import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product";
import type { ProductFilters } from "../types/product";

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
};
