import useSWR from "swr";
import { fetcher } from "./fetcher";


// Get all delivery addresses
export const GetAllAddresses = ()=>{
    const {data, error, isLoading} = useSWR("/delivery-address/get-all-delivery-addresses", fetcher);
    return{
        deliveryAddresses: data?.deliveryAddresses,
        error,
        isLoading,
    }
}

// Get Delivery Address by id
export const GetAddressById = (id)=>{
    const {data, error, isLoading} = useSWR(`/delivery-address/get-delivery-address/${id}`, fetcher);
    return{
        deliveryAddress: data?.deliveryAddress,
        error,
        isLoading,
    }
}



// Delete Delivery Address
export const DeleteAddress = (id)=>{
    const {data, error, isLoading} = useSWR(`/delivery-address/delete-delivery-address/${id}`, fetcher);
    return{
        data,
        error,
        isLoading,
    }
}
