import useSWR from "swr";
import { fetcher } from "./fetcher";


// Get cart items
export const GetCartItems =()=>{
    const {data, error, isLoading} = useSWR("/cart/get-cart-items", fetcher);
    return{
        cartItems: data?.cart,
        error,
        isLoading,
    }
}


// Remove cart item (send productId)
export const RemoveCartItem = (id)=>{
    const {data, error, isLoading} = useSWR(`/cart/remove-cart-item/${id}`, fetcher);
    return{
        data,
        error,
        isLoading,
    }
}