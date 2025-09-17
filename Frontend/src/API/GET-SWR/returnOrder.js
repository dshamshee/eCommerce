import useSWR from "swr";
import { fetcher } from "./fetcher";


export const GetetReturnedOrder = (orderId)=>{
    const {data, error, isLoading} = useSWR(`/return/get-return-order/${orderId}`, fetcher);
    return{
        returnedOrder: data?.returnedOrder || data?.success,
        error,
        isLoading,
    }
}