import api from './apiConfig';

export const addToCart = async (productData)=>{
    // console.log(productData);
    try {
        const response = await api.post('/cart/add-to-cart', productData);
        return response;
    } catch (error) {
        return error.response;
    }
}