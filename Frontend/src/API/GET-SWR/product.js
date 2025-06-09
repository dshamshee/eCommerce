import useSWR from "swr";
import { fetcher } from "./fetcher";
import { preload } from "swr";

// Preload all products
preload('/product/get-products', fetcher)

// SWR Global configuration
const swrConfig = {
  revalidateOnFocus: false,  // Disable revalidation on window focus
  revalidateOnScroll: false, // Disable revalidation on scroll
  dedupingInterval: 10000,   // Dedupe requests within 10 seconds
  revalidateIfStale: false, // Disable revalidation if stale
  revalidateOnMount: true, // Revalidate on mount
}

// get all products
export const GetProducts = () => {
    const { data, error, isLoading } = useSWR(
      "/product/get-products",
      fetcher,
      swrConfig
    );
  
    return {
      allProducts: data?.products,
      error,
      isLoading,
    };
  }

  // get product by id
  export const GetProductById = (id)=>{
    const {data, error, isLoading} = useSWR(
      `/product/get-product/${id}`, 
      fetcher,
      swrConfig
    );
    return{
      product: data?.product,
      error,
      isLoading,
    }
  }

  // get product by type (category or genderType)
export const GetProductByType = (type)=>{
  const {data, error, isLoading} = useSWR(
    `/product/get-product-by-type/${type}`, 
    fetcher,
    swrConfig
  );
  return{
    products: data?.allProducts,
    // unisexProducts: data?.unisexProducts,
    error,
    isLoading,
  }
}