import api from './apiConfig';

export const getProducts = async()=>{

    try {
        const response = await api.get('/product/getProducts');
        // console.log(response.data);
        return response;
    } catch (error) {
      return error;  
    } 
}