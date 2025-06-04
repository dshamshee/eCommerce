import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URI,
    headers:{
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
    }
});

export default api;
