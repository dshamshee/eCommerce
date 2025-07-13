import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import api from "../../API/POST-Axios/apiConfig";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { mutate } from "swr";
import { toast } from "react-toastify";

export const CartPage = () => {
  const { stateCart, isLoading } = useCartContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  // Remove item from cart
  const handleRemoveItem = async (productId) => {
    try {
      setIsUpdating(true);
      const Response = await api.get(`/cart/remove-cart-item/${productId}`);
      if (Response.status === 200) {
        toast.success("Item removed from cart");
        mutate("/cart/get-cart-items"); // Check if this is correct
      } else {
        toast.error("Failed to remove item from cart");
      }

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
      await api.post("/cart/update-cart-item", {
        productId,
        quantity: newQuantity,
      });
      mutate("/cart/get-cart-items"); // Check if this is correct
      // The cart will be updated automatically through SWR
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If cart is empty
  if (!stateCart || !stateCart.products || stateCart.products.length === 0) {
    return (
      <div className="min-h-screen dark:bg-gray-900 py-10 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 border-t-4 border-blue-500">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 dark:text-white">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all duration-200 font-medium flex items-center justify-center mx-auto"
              onClick={() => navigate("/")}
            >
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals
  const subtotal = stateCart.totalPrice || 0;
  const shipping = 10;
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  return (
    <div className="min-h-screen dark:bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-5 sm:mb-8 bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" />
            Shopping Cart
          </h1>
          <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">
            Review and manage your items
          </p>
        </div>

        {isUpdating && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
              <span className="font-medium text-sm sm:text-base">
                Updating your cart...
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8">
          {/* Cart Items Section */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500">
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <h2 className="text-lg sm:text-xl font-semibold dark:text-gray-300 text-gray-900 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-1.5 sm:p-2 rounded-full mr-2">
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  Cart Items ({stateCart.products.length})
                </h2>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {stateCart.products.map((product) => {
                  // Check if productId exists and is properly populated
                  if (!product || !product.productId) {
                    return null; // Skip this item if productId is missing
                  }

                  const item = product.productId;
                  return (
                    <div
                      className="flex flex-col sm:flex-row p-4 sm:p-5 gap-4 sm:gap-5 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      key={product._id}
                    >
                      <div
                        className="w-full sm:w-24 h-40 sm:h-24 md:w-32 md:h-32 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white mx-auto sm:mx-0"
                        style={{ maxWidth: "180px" }}
                      >
                        <img
                          src={
                            item && item.images && item.images.length > 0
                              ? item.images[0]
                              : "https://placehold.co/200"
                          }
                          alt={item && item.name ? item.name : "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-medium text-base sm:text-lg dark:text-white text-center sm:text-left">
                              {item && item.name ? item.name : "Product"}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                              {product.size && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                  Size: {product.size}
                                </span>
                              )}
                              {product.color && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                  Color: {product.color}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-center sm:text-right mt-3 sm:mt-0">
                            <p className="font-semibold text-lg dark:text-white">
                              ₹
                              {(
                                (item && item.price
                                  ? item.price - item.discount
                                  : 0) * (product.quantity || 1)
                              ).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ₹
                              {(item && item.price ? item.price : 0).toFixed(2)}{" "}
                              each
                            </p>
                            <p className="text-sm text-gray-500 dark:text-success">
                              {item && item.discount
                                ? `- ${(
                                    (item.discount / item.price) *
                                    100
                                  ).toFixed(2)}%`
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-3 sm:gap-0">
                          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                            <button
                              className="p-2 rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              onClick={() =>
                                item &&
                                item._id &&
                                handleQuantityChange(
                                  item._id,
                                  product.quantity - 1
                                )
                              }
                              disabled={
                                !item || !item._id || product.quantity <= 1
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-12 text-center font-medium dark:text-white">
                              {product.quantity || 0}
                            </span>
                            <button
                              className="p-2 rounded-r-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              onClick={() =>
                                item &&
                                item._id &&
                                handleQuantityChange(
                                  item._id,
                                  product.quantity + 1
                                )
                              }
                              disabled={!item || !item._id}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                            onClick={() => handleRemoveItem(item && item._id)}
                            disabled={!item || !item._id}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2 mb-5 lg:mb-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-purple-500">
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <h2 className="text-lg sm:text-xl font-semibold dark:text-gray-300 text-gray-900 flex items-center">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 p-1.5 sm:p-2 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </span>
                  Order Summary
                </h2>
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span className="font-medium dark:text-white">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="font-medium dark:text-white">
                    ₹{shipping.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    GST (18%)
                  </span>
                  <span className="font-medium dark:text-white">
                    ₹{gst.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4 mt-3 sm:mt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-base sm:text-lg dark:text-white">
                      Total
                    </span>
                    <span className="font-bold text-base sm:text-lg dark:text-white">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 space-y-3">
                  <button
                    className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all duration-200 font-medium flex items-center justify-center"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  <button
                    className="w-full py-2 sm:py-2.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Secure checkout with 100% purchase protection
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
