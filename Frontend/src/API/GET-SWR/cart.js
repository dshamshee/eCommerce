import useSWR from "swr";
import { cartFetcher, fetcher } from "./fetcher";

const swrConfig = {
    revalidateOnFocus: false,  // Disable revalidation on window focus
    revalidateOnScroll: false, // Disable revalidation on scroll
    dedupingInterval: 1000000,   // Dedupe requests within 1000 seconds
    revalidateIfStale: false, // Disable revalidation if stale
    revalidateOnMount: true, // Revalidate on mount
  }

// Get cart items
export const GetCartItems =()=>{
    const {data, error, isLoading} = useSWR('/cart/get-cart-items', cartFetcher, swrConfig);    
    return{
        cartItems: data?.cart,
        error,
        isLoading,
    }
}


// Remove cart item (send productId)
export const RemoveCartItem = (id)=>{
    const {data, error, isLoading} = useSWR(`/cart/remove-cart-item/${id}`, fetcher, swrConfig);
    return{
        data,
        error,
        isLoading,
    }
}