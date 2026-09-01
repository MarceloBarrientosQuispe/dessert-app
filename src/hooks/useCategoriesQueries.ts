import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categories";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
