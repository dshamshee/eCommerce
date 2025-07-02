import useSWR from "swr";
import { userFetcher } from "./fetcher";

// get user 
export const GetUser = ()=>{

    const {data, error, isLoading} = useSWR("/user/get-user", userFetcher);
    return{
        user: data?.user,
        error,
        isLoading,
    }
}

// Delete User 
export const DeleteUser = ()=>{

    const {data, error, isLoading} = useSWR("/user/delete-user", userFetcher);
    if(!isLoading) console.log(data);
    return{
        data,
        error,
        isLoading,
    }
}

// Logout User
export const LogoutUser = ()=>{
    const {data, error, isLoading} = useSWR("/user/logout", userFetcher);
    return{
        logout:data,
        error,
        isLoading,
    }
}


// Get total number of users
export const GetTotalUsers = ()=>{

    const {data, error, isLoading} = useSWR("/user/get-total-users", userFetcher);
    return{
        totalUsers: data?.totalUser,
        error,
        isLoading,
    }
}