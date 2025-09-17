import { useParams, useNavigate, Link } from "react-router-dom";
import { GetOrderById } from "../../API/GET-SWR/order";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaBox, FaShippingFast, FaCheckCircle, FaTruck, FaClock, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone, FaRupeeSign, FaCreditCard, FaCalendarAlt, FaHashtag, FaExclamationTriangle, FaUndo, FaMoneyBillWave, FaCogs } from "react-icons/fa";
import { toast } from "react-toastify";
import { returnOrder } from "../../API/POST-Axios/returnOrder";
import { GetetReturnedOrder } from "../../API/GET-SWR/returnOrder";
import { mutate } from "swr";

export const TrackOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, isLoading, error } = GetOrderById(id);
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
  })
  const [reason, setReason] = useState("");
  const [isOrderReturned, setIsOrderReturned] = useState(false);
  const { returnedOrder, isLoading: isReturnedOrderLoading, error: isReturnedOrderError } = GetetReturnedOrder(id);


  // check the order is already returned or not
  useEffect(() => {
    if (returnedOrder) {
      setIsOrderReturned(true);
    } else if (!isReturnedOrderLoading && !returnedOrder) {
      // If loading is complete and no returned order found, set to false
      setIsOrderReturned(false);
    }
  }, [returnedOrder, isReturnedOrderLoading]);

  // Helper function to check if the error is a 404 (expected for non-returned orders)
  const isReturnOrderNotFound = isReturnedOrderError && 
    (isReturnedOrderError.response?.status === 404 || 
     isReturnedOrderError.message?.includes('404') ||
     isReturnedOrderError.message?.includes('not found'));

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Status configuration with enhanced styling
  const statusConfig = {
    "Pending": { 
      color: "bg-amber-500", 
      icon: <FaClock className="w-6 h-6" />, 
      description: "Order received and waiting for confirmation",
      step: 1,
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      textColor: "text-amber-700 dark:text-amber-300"
    },
    "Confirmed": { 
      color: "bg-blue-500", 
      icon: <FaCheckCircle className="w-6 h-6" />, 
      description: "Order confirmed and being prepared",
      step: 2,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300"
    },
    "Shipped": { 
      color: "bg-indigo-500", 
      icon: <FaTruck className="w-6 h-6" />, 
      description: "Package is on the way to you",
      step: 3,
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      textColor: "text-indigo-700 dark:text-indigo-300"
    },
    "Delevered": { 
      color: "bg-emerald-500", 
      icon: <FaBox className="w-6 h-6" />, 
      description: "Order successfully delivered",
      step: 4,
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-700 dark:text-emerald-300"
    },
    "Cancelled": { 
      color: "bg-red-500", 
      icon: <FaExclamationTriangle className="w-6 h-6" />, 
      description: "Order was cancelled",
      step: 0,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-700 dark:text-red-300"
    }
  };

  // Return status configuration
  const returnStatusConfig = {
    "Initiate": { 
      color: "bg-yellow-500", 
      icon: <FaUndo className="w-6 h-6" />, 
      description: "Return request submitted and being reviewed",
      step: 1,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      textColor: "text-yellow-700 dark:text-yellow-300"
    },
    "Processing": { 
      color: "bg-blue-500", 
      icon: <FaCogs className="w-6 h-6" />, 
      description: "Return is being processed by our team",
      step: 2,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-700 dark:text-blue-300"
    },
    "Completed": { 
      color: "bg-green-500", 
      icon: <FaMoneyBillWave className="w-6 h-6" />, 
      description: "Refund has been processed to your account",
      step: 3,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-300"
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate order metrics / Need change in this section
  const calculateOrderMetrics = () => {
    if (!order) return {};
    
    const subtotal = order.products?.reduce((sum, item) => 
      sum + ((item.productId?.price - (item.productId?.discount || 0)) * item.quantity), 0) || 0;
    const tax = subtotal * 0.18;
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + tax + shipping;
    
    return { subtotal, tax, shipping, total };
  };


  // Handle return order
  const handleReturnOrder = async ()=>{
    // Validate form data
    if (!bankDetails.accountHolderName.trim()) {
      toast.error("Please enter account holder name");
      return;
    }
    if (bankDetails.accountNumber.length < 10) {
      toast.error("Account number must be at least 10 digits");
      return;
    }
    if (bankDetails.ifsc.length !== 11) {
      toast.error("IFSC code must be exactly 11 characters");
      return;
    }
    if (!reason.trim()) {
      toast.error("Please provide a reason for return");
      return;
    }

    try {
        const response = await returnOrder(id, bankDetails, reason);
        if(response.status === 200){
            toast.success("Return order initiated successfully!");
            setBankDetails({
                accountHolderName: "",
                accountNumber: "",
                ifsc: "",
            });
            setReason("");
            document.getElementById('my_modal_1').close();
            setIsOrderReturned(true);
            mutate(`/return/get-return-order/${id}`);
        } else {
            toast.error(response.data?.message || "Failed to initiate return");
        }
    } catch (error) {
        console.error("Return order error:", error);
        const errorMessage = error.response?.data?.message || error.message || "Error initiating return order";
        toast.error(errorMessage);
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
            Loading Order Details
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Please wait while we fetch your order information...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md">
          <div className="mb-6">
            <FaExclamationTriangle className={`w-16 h-16 mx-auto ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Unable to Load Order
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {error.message || "We couldn't find your order or there was an error loading the details. Please check your order ID and try again."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <Link 
              to="/profile" 
              className="btn btn-primary"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // No order found
  if (!order) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md">
          <div className="mb-6">
            <FaBox className={`w-16 h-16 mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Order Not Found
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The order you're looking for doesn't exist or may have been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
            <Link 
              to="/profile" 
              className="btn btn-primary"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const metrics = calculateOrderMetrics();
  const currentStatus = statusConfig[order.status] || statusConfig["Pending"];
  const allStatuses = ["Pending", "Confirmed", "Shipped", "Delevered"];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10 backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">Track Your Order</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Order #{order._id?.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isOrderReturned && returnedOrder && (
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white flex items-center space-x-2">
                  <FaUndo className="w-4 h-4" />
                  <span>Return {returnedOrder.status === 'Initiate' ? 'Initiated' : returnedOrder.status}</span>
                </div>
              )}
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentStatus.color} text-white flex items-center space-x-2`}>
                {currentStatus.icon}
                <span>{order.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {/* <div className={`${currentStatus.bgColor} rounded-2xl p-8 mb-8 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${currentStatus.color} text-white mb-4`}>
              {currentStatus.icon}
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${currentStatus.textColor}`}>
              {order.status === "Delevered" ? "Order Delivered!" : 
               order.status === "Cancelled" ? "Order Cancelled" :
               order.status === "Shipped" ? "On the Way!" : 
               order.status === "Confirmed" ? "Order Confirmed" : "Order Received"}
            </h2>
            <p className={`${currentStatus.textColor} opacity-80`}>
              {currentStatus.description}
            </p>
            {order.status !== "Cancelled" && (
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Last updated: {formatDate(order.updatedAt)}
              </p>
            )}
          </div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Timeline - Show when order is not cancelled and not returned */}
            {order.status !== "Cancelled" && !isOrderReturned && !isReturnedOrderLoading && (isReturnOrderNotFound || !isReturnedOrderError) && (
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <FaShippingFast className="w-6 h-6 mr-3 text-blue-500" />
                  Order Progress
                </h3>
                
                <div className="relative">
                  <div className={`absolute left-6 top-0 h-full w-0.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                  <div className="space-y-8">
                    {allStatuses.map((status, index) => {
                      const config = statusConfig[status];
                      const currentIndex = allStatuses.indexOf(order.status);
                      const isCompleted = currentIndex >= index;
                      const isCurrent = status === order.status;
                      
                      return (
                        <div key={status} className="flex items-start relative">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 z-10 transition-all duration-300 ${
                            isCompleted 
                              ? `${config.color} border-white shadow-lg` 
                              : isDarkMode 
                                ? 'bg-gray-800 border-gray-600' 
                                : 'bg-white border-gray-300'
                          }`}>
                            <div className={`${isCompleted ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {config.icon}
                            </div>
                          </div>
                          <div className="ml-6 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-semibold text-lg ${isCurrent ? 'text-blue-500' : ''}`}>
                                {status}
                              </h4>
                              {isCurrent && (
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {config.description}
                            </p>
                            {isCompleted && (
                              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isCurrent ? `Updated: ${formatDate(order.updatedAt)}` : 'Completed'}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Return Timeline - Show when order is returned */}
            {isOrderReturned && !isReturnedOrderLoading && returnedOrder && (
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <FaUndo className="w-6 h-6 mr-3 text-red-500" />
                  Return Progress
                </h3>
                
                {/* Return Hero Section */}
                <div className={`${returnStatusConfig[returnedOrder.status]?.bgColor || 'bg-yellow-50 dark:bg-yellow-900/20'} rounded-lg p-4 mb-6`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full ${returnStatusConfig[returnedOrder.status]?.color || 'bg-yellow-500'} flex items-center justify-center text-white`}>
                      {returnStatusConfig[returnedOrder.status]?.icon || <FaUndo className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg ${returnStatusConfig[returnedOrder.status]?.textColor || 'text-yellow-700 dark:text-yellow-300'}`}>
                        Return {returnedOrder.status === 'Initiate' ? 'Initiated' : returnedOrder.status}
                      </h4>
                      <p className={`${returnStatusConfig[returnedOrder.status]?.textColor || 'text-yellow-700 dark:text-yellow-300'} opacity-80`}>
                        {returnStatusConfig[returnedOrder.status]?.description || 'Return request has been submitted'}
                      </p>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Return requested on: {formatDate(returnedOrder.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className={`absolute left-6 top-0 h-full w-0.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                  <div className="space-y-8">
                    {Object.entries(returnStatusConfig).map(([status, config]) => {
                      const currentStatusStep = returnStatusConfig[returnedOrder.status]?.step || 1;
                      const isCompleted = currentStatusStep >= config.step;
                      const isCurrent = status === returnedOrder.status;
                      
                      return (
                        <div key={status} className="flex items-start relative">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 z-10 transition-all duration-300 ${
                            isCompleted 
                              ? `${config.color} border-white shadow-lg` 
                              : isDarkMode 
                                ? 'bg-gray-800 border-gray-600' 
                                : 'bg-white border-gray-300'
                          }`}>
                            <div className={`${isCompleted ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {config.icon}
                            </div>
                          </div>
                          <div className="ml-6 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-semibold text-lg ${isCurrent ? 'text-yellow-500' : ''}`}>
                                {status === 'Initiate' ? 'Return Initiated' : status}
                              </h4>
                              {isCurrent && (
                                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full font-medium">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {config.description}
                            </p>
                            {isCompleted && (
                              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {isCurrent ? `Updated: ${formatDate(returnedOrder.createdAt)}` : 'Completed'}
                              </p>
                            )}
                            {isCurrent && returnedOrder.reason && (
                              <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  Return Reason:
                                </p>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {returnedOrder.reason}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Return Details */}
                {returnedOrder.bankDetails && (
                  <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h5 className={`font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Refund Account Details:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Account Holder:</span>
                        <p className="font-medium">{returnedOrder.bankDetails.AccountHolderName}</p>
                      </div>
                      <div>
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Account Number:</span>
                        <p className="font-medium">****{returnedOrder.bankDetails.AccountNumber?.slice(-4)}</p>
                      </div>
                      <div>
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>IFSC Code:</span>
                        <p className="font-medium">{returnedOrder.bankDetails.IFSC}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Order Items */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold flex items-center">
                  <FaBox className="w-6 h-6 mr-3 text-green-500" />
                  Order Items ({order.products?.length || 0})
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {order.products?.map((item, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className={`w-16 h-16 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0`}>
                        {item.productId?.images?.[0] ? (
                          <img 
                            src={item.productId.images[0]} 
                            alt={item.productId.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <FaBox className="w-8 h-8 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{item.productId?.name || "Product"}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.productId?.category} • {item.productId?.genderType}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{((item.productId?.price - (item.productId?.discount || 0)) * item.quantity).toFixed(2)}</p>
                        {item.productId?.discount > 0 && (
                          <p className={`text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            ₹{(item.productId.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaHashtag className="w-5 h-5 mr-2 text-purple-500" />
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Order ID</span>
                  <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {order._id?.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Order Date</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Payment Method</span>
                  <span className="flex items-center">
                    <FaCreditCard className="w-4 h-4 mr-1" />
                    {order.paymentMethod || "Online"}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaMapMarkerAlt className="w-5 h-5 mr-2 text-red-500" />
                Delivery Address
              </h3>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="font-medium">{order.deliveryAddress?.name}</p>
                <p className="mt-1">{order.deliveryAddress?.address}</p>
                <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
                <p>{order.deliveryAddress?.zipCode}, {order.deliveryAddress?.country}</p>
                {order.deliveryAddress?.phone && (
                  <p className="mt-2 flex items-center text-sm">
                    <FaPhone className="w-3 h-3 mr-2" />
                    {order.deliveryAddress.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaRupeeSign className="w-5 h-5 mr-2 text-green-500" />
                Price Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{metrics.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{metrics.tax?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={metrics.shipping === 0 ? 'text-green-500' : ''}>
                    {metrics.shipping === 0 ? 'FREE' : `₹${metrics.shipping?.toFixed(2)}`}
                  </span>
                </div>
                <div className={`flex justify-between pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-lg font-bold`}>
                  <span>Total Amount</span>
                  <span className="text-green-500">₹{metrics.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaUser className="w-5 h-5 mr-2 text-blue-500" />
                Need Help?
              </h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Have questions about your order? We're here to help!
              </p>
              <div className="space-y-3">
                <button className="w-full btn btn-outline">
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  Contact Support
                </button>
                
                {/* Show Return Order button only if order is delivered and not already returned */}
                {order.status === "Delevered" && !isOrderReturned && !isReturnedOrderLoading && (isReturnOrderNotFound || !isReturnedOrderError) && (
                  <button 
                    className="w-full btn btn-error" 
                    onClick={()=>document.getElementById('my_modal_1').showModal()}
                  >
                    <FaUndo className="w-4 h-4 mr-2" />
                    Return Order
                  </button>
                )}
                
                {/* Show Cancel Order button only if order is not delivered, not cancelled, and not returned */}
                {order.status !== "Delevered" && order.status !== "Cancelled" && !isOrderReturned && !isReturnedOrderLoading && (isReturnOrderNotFound || !isReturnedOrderError) && (
                  <Link 
                    to="#" 
                    className="w-full btn btn-error"
                  >
                    Cancel Order
                  </Link>
                )}
                
                {/* Show return status info if order is returned */}
                {isOrderReturned && returnedOrder && (
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} border`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <FaUndo className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-red-700 dark:text-red-300">Order Return Status</span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                      Your return request is currently: <strong>{returnedOrder.status === 'Initiate' ? 'Being Processed' : returnedOrder.status}</strong>
                    </p>
                    {returnedOrder.status === 'Completed' && (
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ✓ Refund has been processed to your account
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



      <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Return Order</h3>
    <p className="py-4">Please fill the form to return the order</p>
    <form className="flex flex-col gap-3 justify-center">
        <div className="form-control flex flex-col">
            <label className="label">
                <span className="label-text">Account Holder Name</span>
            </label>
            <input type="text" placeholder="Account Holder Name" className="input input-bordered w-full" maxLength={100} required value={bankDetails.accountHolderName} onChange={(e)=>setBankDetails({...bankDetails, accountHolderName: e.target.value})} />
        </div>

        <div className="form-control flex flex-col">
            <label className="label">
                <span className="label-text">Account Number</span>
            </label>
            <input type="text" placeholder="Account Number" className="input input-bordered w-full" maxLength={18} pattern="[0-9]{10,18}" required value={bankDetails.accountNumber} onChange={(e)=>setBankDetails({...bankDetails, accountNumber: e.target.value.replace(/[^0-9]/g, '')})} />
            <p className="text-sm text-gray-500">Enter 10-18 digit account number (numbers only)</p>
        </div>

        <div className="form-control flex flex-col">
            <label className="label">
                <span className="label-text">IFSC</span>
            </label>
            <input type="text" placeholder="IFSC (e.g., SBIN0001234)" className="input input-bordered w-full" maxLength={11} pattern="[A-Z]{4}0[A-Z0-9]{6}" required value={bankDetails.ifsc} onChange={(e)=>setBankDetails({...bankDetails, ifsc: e.target.value.toUpperCase()})} />
            <p className="text-sm text-gray-500">11-character bank IFSC code (e.g., SBIN0001234)</p>
        </div>

        <div className="form-control flex flex-col">
            <label className="label">
                <span className="label-text">Reason</span>
            </label>
            <textarea placeholder="Describe your issue" className="input input-bordered w-full" maxLength={100} required value={reason} onChange={(e)=>setReason(e.target.value)}/>
            <p className="text-sm text-gray-500">Max length: 100 characters</p>
        </div>

        {/* <button type="submit" className="btn btn-primary">Return Order</button> */}

    </form>

       <div className="modal-action">
      <form method="dialog" className="flex justify-between w-full">
        {/* if there is a button in form, it will close the modal */}
        <button onClickCapture={()=>document.getElementById('my_modal_1').close()} className="btn btn-ghost">Cancel</button>
        <button onClickCapture={handleReturnOrder} className="btn btn-primary" disabled={bankDetails.accountHolderName.trim() === "" || bankDetails.accountNumber.length < 10 || bankDetails.ifsc.length !== 11 || reason.trim() === ""}>Return Order</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  );
};
 