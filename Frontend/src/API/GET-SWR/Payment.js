import useSWR from "swr";
import { fetcher } from "./fetcher";

export const GetAllPayments = ()=>{
    const {data, error, isLoading} = useSWR("/payment/get-all-payments", fetcher);
    return{
        payments: data?.payments,
        error,
        isLoading,
    }
}