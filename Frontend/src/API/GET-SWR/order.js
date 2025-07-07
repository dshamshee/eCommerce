import useSWR from "swr";
import { fetcher } from "./fetcher";


// Get all orders (only for user)
export const GetAllOrders = ()=>{
    const {data, error, isLoading} = useSWR("/order/get-all-orders", fetcher);
    return{
        orders: data?.orders,
        error,
        isLoading,
    }
}

// Get all orders (only for admin)
export const GetAllOrdersAdmin = ()=>{
    const {data, error, isLoading} = useSWR("/order/admin/get-all-orders", fetcher);
    return{
        orders: data?.orders,
        error,
        isLoading,
    }
}

// Get limited orders (only for admin)
export const GetLimitedOrdersAdmin = (limit)=>{
    const {data, error, isLoading} = useSWR(`/order/admin/get-all-orders/${limit}`, fetcher);
    return{
        orders: data?.orders,
        error,
        isLoading,
    }
}

// Get order by id
export const GetOrderById = (id)=>{
    const {data, error, isLoading} = useSWR(`/order/get-order/${id}`, fetcher);
    return{
        order: data?.order,
        error,
        isLoading,
    }
}


// Delete Order 
export const DeleteOrder = (id)=>{
    const {data, error, isLoading} = useSWR(`/order/delete-order/${id}`, fetcher);
    return{
        data,
        error,
        isLoading,
    }
}


// Cancel Order 
export const CancelOrder = (id)=>{
    const {data, error, isLoading} = useSWR(`/order/cancel-order/${id}`, fetcher);
    return{
        data,
        error,
        isLoading,
    }
}