/* eslint-disable no-useless-catch */
import api from "../POST-Axios/apiConfig"

export const createOrder = async(products, totalAmount, deliveryAddress)=>{

    try {
        // console.log(products, totalAmount, deliveryAddress)
        const response = await api.post("/order/create-order", {products, totalAmount, deliveryAddress});
        return response;
    } catch (error) {
        throw error;
    }
}