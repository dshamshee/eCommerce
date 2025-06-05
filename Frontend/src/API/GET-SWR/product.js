import useSWR from "swr";
import { fetcher } from "./fetcher";

// get all products
export const GetProducts = () => {
    const { data, error, isLoading } = useSWR(
      "/product/get-products",
      fetcher,
    );
  
    return {
      allProducts: data?.products,
      error,
      isLoading,
    };
  }

  // get product by id
  export const GetProductById = (id)=>{

    const {data, error, isLoading} = useSWR(`/product/get-product/${id}`, fetcher);
    return{
      product: data?.product,
      error,
      isLoading,
    }
  }

  // get product by type (category or genderType)
export const GetProductByType = (type)=>{

  const {data, error, isLoading} = useSWR(`/product/get-product-by-type/${type}`, fetcher);
  return{
    products: data?.products,
    error,
    isLoading,
  }
}