import axios from "axios";

import type { Category } from "../types/product";

const apiUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiUrl.get<Category[]>("/categories");

  return response.data;
};