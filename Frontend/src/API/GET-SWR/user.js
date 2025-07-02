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
export const GetAllUsers = ()=>{

    const {data, error, isLoading} = useSWR("/user/get-all-users", userFetcher);
    return{
        allUsers: data?.users,
        allOrders: data?.orders,
        error,
        isLoading,
    }
}


// Get Graph data for admin dashboard
export const GetGraphData = ()=>{
    const {data, error, isLoading} = useSWR("/user/get-graph-data", userFetcher);
    return{
        dailyUserCounts: data?.dailyUserCounts,
        dailyOrderCounts: data?.dailyOrderCounts,
        dailyRevenue: data?.dailyRevenue,
        error,
        isLoading,
    }
}