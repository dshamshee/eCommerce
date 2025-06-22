/* eslint-disable no-useless-catch */
import api from './apiConfig'


// Create the Order for Razorpay Payment
export const createOrder = async(data)=>{
    try {
        const response = await api.post("/payment/create-order", data);
        return response;
    } catch (error) {
        console.log("Error in creating order in frontend payment api", error);
        throw error;
    }
}

// Set the Payment Details in the database
export const setPaymentDetails = async(paymentID, orderID)=>{

    try {
        const response = await api.post("/payment/fetch-payment", {paymentID, orderID});
        return response;
    } catch (error) {
        console.log("Error in setting payment details in frontend payment api", error);
        throw error;
    }
}