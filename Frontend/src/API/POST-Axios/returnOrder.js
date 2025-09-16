
import api from "../POST-Axios/apiConfig"

export const returnOrder = async(orderId, bankDetails, reason)=>{

    // const bankDetailsData = new FormData();
    // bankDetailsData.append('accountHolderName', bankDetails.accountHolderName);
    // bankDetailsData.append('accountNumber', bankDetails.accountNumber);
    // bankDetailsData.append('ifsc', bankDetails.ifsc);
    // bankDetailsData.append('reason', reason);
    try {
        const response = await api.post("/return/create-return-order", {orderId, bankDetails, reason});
        return response;
    } catch (error) {
        console.log("Error in return order", error);
        throw error;
    }
}