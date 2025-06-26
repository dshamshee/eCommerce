import api from './apiConfig'

export const addAddress = async (addressData)=>{
    try {
        const response = await api.post('/delivery-address/add-delivery-address', addressData);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


// Update address
export const updateAddress = async(addressData)=>{
    try {
        const response = await api.post(`/delivery-address/update-delivery-address/${addressData._id}`, addressData);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Delete address
export const deleteAddress = async(addressID)=>{
    try {
        const response = await api.get(`/delivery-address/delete-delivery-address/${addressID}`);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Set default address
export const setDefaultAddress = async(addressID)=>{
    try {
        const response = await api.post(`/delivery-address/set-default-address/${addressID}`, {addressId: addressID});
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}