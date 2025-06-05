import useSWR from "swr";
import { fetcher } from "./fetcher";

// get user 
export const GetUser = ()=>{

    const {data, error, isLoading} = useSWR("/user/get-user", fetcher);
    return{
        user: data?.user,
        error,
        isLoading,
    }
}

// Delete User 
export const DeleteUser = ()=>{

    const {data, error, isLoading} = useSWR("/user/delete-user", fetcher);
    return{
        data,
        error,
        isLoading,
    }
}

// Logout User
export const LogoutUser = ()=>{
    const {data, error, isLoading} = useSWR("/user/logout", fetcher);
    return{
        data,
        error,
        isLoading,
    }
}