import axios from "axios";

const apiUrl = axios.create({
    baseURL: 'http://localhost:3000'
})

export const getProducts = async () => {
    const response = await apiUrl.get('/products');
    return response.data
}

