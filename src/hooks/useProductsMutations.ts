import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product";
import type { ProductFormValues } from "../schema/productSchema";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductFormValues) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto creado con éxito");
    },
    onError: () => {
      toast.error("Ocurrió un error al crear el producto");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormValues }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto actualizado con éxito");
    },
    onError: () => {
      toast.error("Ocurrió un error al actualizar el producto");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto eliminado con éxito");
    },
    onError: () => {
      toast.error("Ocurrió un error al eliminar el producto");
    },
  });
};
