import { GetCartItems } from "../API/GET-SWR/cart";
import { GetAllAddresses } from "../API/GET-SWR/deliveryAddress";
import { GetAllOrders } from "../API/GET-SWR/order";
import { GetUser } from "../API/GET-SWR/user";
import { GetProducts } from "../API/GET-SWR/product";


export const GetReqTesting = ()=>{
    const {allProducts, error, isLoading} = GetProducts();

    const handleGetCartItems = ()=>{
        console.log(allProducts);
        console.log(error);
        console.log(isLoading);
    }
    
    

    return(
        <div className="flex flex-col gap-4">
            <h1>Get Request Testing</h1>
            <button
            className="bg-blue-500 text-white p-2 rounded-md"
             onClick={
                handleGetCartItems
            }>Get Cart Items</button>

            {/* <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={
                handleGetAllAddresses
            }>Get All Addresses</button>

            <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={
                handleGetAllOrders
            }>Get All Orders</button>

            <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={
                handleGetUser
            }>Get User</button>

            <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={
                handleGetProducts
            }>Get All Products</button>
             */}
        </div>
        
        
    )
}