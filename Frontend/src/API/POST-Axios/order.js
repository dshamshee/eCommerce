/* eslint-disable no-useless-catch */
import api from "../POST-Axios/apiConfig"

export const createOrder = async(products, totalAmount, deliveryAddress, paymentMethod)=>{

    try {
        // console.log(products, totalAmount, deliveryAddress)
        const response = await api.post("/order/create-order", {products, totalAmount, deliveryAddress, paymentMethod});
        return response;
    } catch (error) {
        throw error;
    }
}


// Update Order Status 
export const UpdateOrderStatus = async(id, status)=>{

    try {
        const response = await api.post(`/order/update-order-status/${id}`, {status});
        return response;
    } catch (error) {
        throw error;
    }
}