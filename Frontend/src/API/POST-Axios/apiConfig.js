import axios from 'axios';

// const isProd = import.meta.env.MODE === 'production';

const api = axios.create({
       baseURL: 'https://ecommerce-g9j4.onrender.com/api', // for production
       // baseURL: 'http://localhost:3000/api', // for development
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    },
    withCredentials: true
});

export default api;


export const apiForAddProduct = axios.create({
        baseURL: 'https://ecommerce-g9j4.onrender.com/api', // for production
        // baseURL: 'http://localhost:3000/api', // for development
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('token')
    },
    withCredentials: true
})