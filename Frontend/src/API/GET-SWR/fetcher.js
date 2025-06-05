// import axios from "axios";
// const baseUrl = axios.create({
//   baseURL: import.meta.env.VITE_AXIOS_BASE_URI,
//   headers:{
//       'Content-Type': 'application/json',
//       'Authorization': localStorage.getItem('token'),
//   }
// });

export const fetcher = async (url) => {
  const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_AXIOS_BASE_URI}${url}`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    });
    // const res = await baseUrl.get(`${url}`);
  
    if (!res.ok) {
      const errorResponse = await res.json();
      const error = new Error(errorResponse.message || "Unknown error");
  
      throw error;
    }
  
    return res.json();
  };