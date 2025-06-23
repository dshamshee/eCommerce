import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecommerce-g9j4.onrender.com/api', // http://localhost:3000/api
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    },
    withCredentials: true
});

export default api;


export const apiForAddProduct = axios.create({
    baseURL: 'https://ecommerce-g9j4.onrender.com/api', // http://localhost:3000/api
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('token')
    },
    withCredentials: true
})