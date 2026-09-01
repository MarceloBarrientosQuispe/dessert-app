import axios from "axios";

import type { Category } from "../types/product";

const apiUrl = axios.create({
  baseURL: "http://localhost:3000",
});

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiUrl.get<Category[]>("/categories");

  return response.data;
};