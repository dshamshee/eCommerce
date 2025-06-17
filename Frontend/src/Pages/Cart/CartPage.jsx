import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import { RemoveCartItem } from "../../API/GET-SWR/cart";
import api from "../../API/POST-Axios/apiConfig";

export const CartPage = () => {
    const { stateCart, isLoading } = useCartContext();
    const [isUpdating, setIsUpdating] = useState(false);

    // Remove item from cart
    const handleRemoveItem = async (productId) => {
        try {
            setIsUpdating(true);
            await RemoveCartItem(productId);
            // The cart will be updated automatically through SWR
        } catch (error) {
            console.error("Error removing item from cart:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Update quantity of product in cart
    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            setIsUpdating(true);
            await api.post('/cart/update-cart-item', {
                productId,
                quantity: newQuantity
            });
            // The cart will be updated automatically through SWR
        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (!stateCart || !stateCart.products || stateCart.products.length === 0) {
        return <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <button className="btn btn-primary">Continue Shopping</button>
        </div>;
    }

    return (
        <div className="mainContainer py-10 px-4 md:px-42 flex md:flex-row flex-col gap-4 dark:bg-gray-900 bg-gray-200">
            {/* Cart Items Section */}
            <div className="left md:w-[70%] w-full grid md:grid-cols-2 gap-4">
                {isUpdating && (
                    <div className="absolute inset-0 bg-base-100 bg-opacity-50 flex justify-center items-center z-10">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
                
                {stateCart.products.map((product) => {
                    // Check if productId exists and is properly populated
                    if (!product || !product.productId) {
                        return null; // Skip this item if productId is missing
                    }
                    
                    const item = product.productId;
                    return (
                        <div className="card card-side dark:bg-gray-800 bg-gray-100 shadow-xl h-[150px] md:h-auto" key={product._id}>
                            <figure className="md:w-32 md:h-32 w-[100px] h-auto">
                                <img 
                                    src={item && item.images && item.images.length > 0 ? item.images[0] : "https://placehold.co/200"} 
                                    alt={item && item.name ? item.name : "Product"} 
                                    className="w-full h-full object-cover" 
                                />
                            </figure>
                            <div className="card-body p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="md:card-title text-sm text-wrap text-ellipsis overflow-hidden">
                                            {item && item.name ? item.name : "Product"}
                                        </h2>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Size: {product.size || 'N/A'} | Color: {product.color || 'N/A'}
                                        </p>
                                    </div>
                                    <button 
                                        className="btn btn-ghost btn-sm text-error hidden md:block"
                                        onClick={() => handleRemoveItem(item && item._id)}
                                        disabled={!item || !item._id}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex justify-between md:items-center mt-2 md:flex-row flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <button 
                                            className="btn btn-sm btn-outline"
                                            onClick={() => item && item._id && handleQuantityChange(item._id, product.quantity - 1)}
                                            disabled={!item || !item._id || product.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center">{product.quantity || 0}</span>
                                        <button 
                                            className="btn btn-sm btn-outline"
                                            onClick={() => item && item._id && handleQuantityChange(item._id, product.quantity + 1)}
                                            disabled={!item || !item._id}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-lg font-semibold">
                                        ${((item && item.price ? item.price : 0) * (product.quantity || 1)).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Section */}
            <div className="right md:w-[30%] w-full">
                <div className="card dark:bg-gray-800 bg-gray-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{stateCart.totalPrice?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>₹10.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (18%)</span>
                                <span>₹{((stateCart.totalPrice || 0) * 0.18).toFixed(2)}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>₹{((stateCart.totalPrice || 0) + 10 + ((stateCart.totalPrice || 0) * 0.05)).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="card-actions mt-4">
                            <button className="btn btn-primary w-full">Proceed to Checkout</button>
                            <button className="btn btn-outline w-full">Continue Shopping</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}