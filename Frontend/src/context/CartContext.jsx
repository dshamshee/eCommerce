import { createContext, useContext, useState, useEffect } from 'react';
import { GetCartItems} from '../API/GET-SWR/cart';

const CartContext = createContext();

export const useCartContext = ()=>{
    const context = useContext(CartContext);
    if(!context){
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
}

export const CartProvider = ({children})=>{
    const {cartItems, error, isLoading} = GetCartItems();
    const [stateCart, setStateCart] = useState([]);

    useEffect(()=>{
        if(!isLoading){
            setStateCart(cartItems);
        }
    },[cartItems, isLoading]);

    const value = {
        stateCart,
        error,
        isLoading,
    }
    

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}