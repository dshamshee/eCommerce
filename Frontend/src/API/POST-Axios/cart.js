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

export const getCartProducts = async ()=>{
    try {
        const response = await api.get('/cart/get-cart-items');
        return response;
    } catch (error) {
        return error.response;
    }
}
