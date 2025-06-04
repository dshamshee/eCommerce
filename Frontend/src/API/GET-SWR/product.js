import useSWR from "swr";
import { fetcher } from "./fetcher";

export const useGetProducts = () => {
    const { data, error, isLoading } = useSWR(
      "/product/getProducts",
      fetcher,
    );
  
    return {
      allProducts: data?.products,
      error,
      isLoading,
    };
  }