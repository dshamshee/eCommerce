
import api from "../POST-Axios/apiConfig"

export const returnOrder = async(orderId, bankDetails, reason)=>{

    try {
        const response = await api.post("/return/create-return-order", {orderId, bankDetails, reason});
        return response;
    } catch (error) {
        console.log("Error in return order", error);
        throw error;
    }
}


