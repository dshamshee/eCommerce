import api from './apiConfig'

export const createOrder = async(data)=>{
    try {
        const response = await api.post("/payment/create-order", data);
        return response;
    } catch (error) {
        console.log("Error in creating order in frontend payment api", error);
        throw error;
    }
}