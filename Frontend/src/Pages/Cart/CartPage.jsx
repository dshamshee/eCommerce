
export const CartPage = ()=>{

    return(
        <div className="mainContainer p-4 md:px-42 mt-10 flex md:flex-row flex-col gap-4">


            {/* Cart Items Section */}
            <div className="left md:w-[70%] w-full flex flex-col gap-4">
                
                <div className="card card-side bg-base-100 shadow-xl">
                        <figure className="md:w-32 md:h-32">
                            <img src="https://placehold.co/200" alt="Product" className="w-full h-full object-cover" />
                        </figure>
                        <div className="card-body p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="md:card-title text-sm text-wrap text-ellipsis overflow-hidden">Product Name</h2>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Size: M | Color: Black</p>
                                </div>
                                <button className="btn btn-ghost btn-sm text-error hidden md:block">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex justify-between md:items-center mt-2 md:flex-row flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <button className="btn btn-sm btn-outline">-</button>
                                    <span className="w-8 text-center">1</span>
                                    <button className="btn btn-sm btn-outline">+</button>
                                </div>
                                <p className="text-lg font-semibold">$99.99</p>
                            </div>
                        </div>
                    </div>

            </div>


            {/* Summary Section */}
            <div className="right md:w-[30%] w-full">
                {/* Order Summary Section */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>$99.99</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>$10.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$5.00</span>
                                </div>
                                <div className="divider my-2"></div>
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>$114.99</span>
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
    )
}