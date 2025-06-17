import api from "../POST-Axios/apiConfig";

export const fetcher = async (url) => {
  // const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_AXIOS_BASE_URI}${url}`, {
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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


  export const cartFetcher = async (url)=>{
    const res = await api.get(url);
    return res.data;
  }