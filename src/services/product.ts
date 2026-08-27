import axios from "axios";
import type { Product } from "../types/product";

const apiUrl = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getProducts = async () : Promise<Product[]> => {
    const response = await apiUrl.get('/products');
    return response.data
}

