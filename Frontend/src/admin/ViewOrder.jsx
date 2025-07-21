import { useParams, Link, Navigate } from "react-router-dom";
import { GetOrderById } from "../API/GET-SWR/order";
import { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ViewOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, isLoading, error } = GetOrderById(id);
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);

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

  // Status configuration
  const statusConfig = {
    "Pending": { 
      color: "bg-amber-500", 
      icon: "⏳", 
      description: "Order received, awaiting processing",
      nextActions: ["Confirm Order", "Cancel Order"]
    },
    "Confirmed": { 
      color: "bg-blue-500", 
      icon: "✅", 
      description: "Order confirmed, preparing for shipment",
      nextActions: ["Mark as Shipped", "Cancel Order"]
    },
    "Shipped": { 
      color: "bg-indigo-500", 
      icon: "🚛", 
      description: "Order shipped, in transit",
      nextActions: ["Mark as Delivered", "Track Shipment"]
    },
    "Delevered": { 
      color: "bg-emerald-500", 
      icon: "📦", 
      description: "Order successfully delivered",
      nextActions: ["Archive Order"]
    },
    "Cancelled": { 
      color: "bg-red-500", 
      icon: "❌", 
      description: "Order cancelled",
      nextActions: ["Process Refund"]
    }
  };

  const calculateOrderMetrics = () => {
    if (!order) return {};
    
    const subtotal = order.products?.reduce((sum, item) => 
      sum + ((item.productId?.price - item.productId?.discount) || 0) * item.quantity, 0) || 0;
    const tax = subtotal * 0.18;
    const shipping = 10;
    const total = subtotal + tax + shipping;
    
    return { subtotal, tax, shipping, total };
  };

  const handleStatusUpdate = () => {
    // Here you would make an API call to update the status
    console.log('Updating status to:', selectedStatus);
    setShowStatusModal(false);
    // Add your API call here
  };

  const handleAddNotes = () => {
    // Here you would save admin notes
    console.log('Adding notes:', adminNotes);
    setShowNotesModal(false);
    setAdminNotes('');
    // Add your API call here
  };

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Error Loading Order</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            {error.message || "Failed to load order details. Please try again."}
          </p>
          <Link to="/admin/orders" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Orders
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={`flex flex-col justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center max-w-md">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/admin/orders" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Return to Orders
          </Link>
        </div>
      </div>
    );
  }

  const metrics = calculateOrderMetrics();
  const currentStatus = statusConfig[order.status] || statusConfig["Pending"];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-700'}`}>
      {/* Admin Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-800' : 'bg-gray-100 border-gray-200'} rounded-md shadow-md border-b sticky top-0 z-40 backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate(-1)} className={`p-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold">Order Management</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Order #{order._id.toUpperCase()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus.color} text-white`}>
                <span className="mr-2">{currentStatus.icon}</span>
                {order.status}
              </span>
              {/* <button 
                onClick={() => setShowStatusModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Update Status</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-6 shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Order Value</p>
                <p className="text-2xl font-bold text-green-600">₹{metrics.total?.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
              <FaRupeeSign className="text-green-600 text-lg" />
              </div>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-6 shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Items</p>
                <p className="text-2xl font-bold text-blue-600">{order.products?.length || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-6 shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Order Date</p>
                <p className="text-lg font-semibold">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-6 shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                <p className="text-lg font-semibold">{order.status}</p>
              </div>
              <div className={`p-3 rounded-full ${currentStatus.color} bg-opacity-20`}>
                <span className="text-2xl">{currentStatus.icon}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Order Timeline */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Progress Timeline
                </h2>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{currentStatus.description}</p>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  <div className={`absolute left-6 top-0 h-full w-0.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                  <div className="space-y-8">
                                         {Object.entries(statusConfig).map(([status, config]) => {
                       const statusIndex = Object.keys(statusConfig).indexOf(status);
                       const currentIndex = Object.keys(statusConfig).indexOf(order.status);
                       const isCompleted = currentIndex >= statusIndex;
                       const isCurrent = status === order.status;
                      
                      return (
                        <div key={status} className="flex items-start relative">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 z-10 transition-all duration-300 ${
                            isCompleted 
                              ? `${config.color} border-white shadow-lg` 
                              : isDarkMode 
                                ? 'bg-gray-800 border-gray-600' 
                                : 'bg-gray-100 border-gray-300'
                          }`}>
                            <span className="text-xl">
                              {isCompleted ? config.icon : '⚪'}
                            </span>
                          </div>
                          <div className="ml-6 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-semibold text-lg ${isCurrent ? 'text-blue-600' : ''}`}>
                                {status}
                              </h3>
                              {isCurrent && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
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
            </div>

            {/* Order Items */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Order Items ({order.products?.length || 0})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {order.products?.map((item, index) => (
                      <tr key={index} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`h-16 w-16 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-300'} flex-shrink-0 flex items-center justify-center`}>
                              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-lg">{item.productId?.name || "Unavailable"}</div>
                              <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                Category: {item.productId?.category || ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 badge badge-outline badge-dash ${isDarkMode ? 'badge-error' : 'badge-error'} rounded-full text-sm font-mono`}>
                            {item.productId?._id?.substring(0, 8).toUpperCase() || "Unavailable"}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          ₹{item.productId?.price?.toFixed(2) || "0.00"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                            {item.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-lg">
                          ₹{(((item.productId?.price - item.productId?.discount) || 0) * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Customer Details
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Name</label>
                    <p className="text-lg font-semibold">{order.userId?.name || "Customer Name"}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
                    <p className="break-all">{order.userId?.email || "customer@example.com"}</p>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</label>
                    <p>{order.userId?.phone || "N/A"}</p>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button className={`flex-1 px-3 py-2 cursor-pointer ${isDarkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-100 hover:bg-blue-200'} text-blue-600 rounded-lg transition-colors text-sm`}>
                      Contact
                    </button>
                    {/* <button className={`flex-1 px-3 py-2 cursor-pointer ${isDarkMode ? 'bg-gray-700 hover:bg-gray-900' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors text-sm`}>
                      Profile
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Delivery Address
                </h2>
              </div>
              <div className="p-6">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <p className="font-medium">{order.deliveryAddress?.address || "Unavailable"}</p>
                  <p>{order.deliveryAddress?.city || "City"}, {order.deliveryAddress?.state || "State"}</p>
                  <p>{order.deliveryAddress?.zipCode || "12345"}</p>
                  <p>{order.deliveryAddress?.country || "Country"}</p>
                </div>
                <button data-tip="Comming Soon" className={`w-full tooltip tooltip-top tooltip-secondary mt-3 px-4 py-2 cursor-pointer ${isDarkMode ? 'bg-gray-700 hover:bg-gray-900' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors text-sm flex items-center justify-center`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                  View on Map
                </button>
              </div>
            </div>

            {/* Order Financial Summary */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold flex items-center">
                  <FaRupeeSign className="w-5 h-5 mr-2" />
                  Financial Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{metrics.subtotal?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="font-semibold">₹{metrics.tax?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">₹{metrics.shipping?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className={`flex justify-between pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-lg font-bold`}>
                    <span>Total</span>
                    <span className="text-green-600">₹{metrics.total?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
                
                <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-green-900' : 'bg-green-50'}`}>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-600 font-medium text-sm">Payment Received</span>
                  </div>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                    Paid on {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Quick Actions
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <button 
                  onClick={() => setShowNotesModal(true)}
                  className={`w-full px-4 py-3 cursor-pointer ${isDarkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-50 hover:bg-blue-100'} text-blue-600 rounded-lg transition-colors flex items-center justify-center font-medium`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Add Admin Notes
                </button>
                
                {/* <button className={`w-full px-4 py-3 cursor-pointer ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors flex items-center justify-center font-medium`}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Invoice
                </button> */}
                
                <button data-tip="Comming Soon" className={`w-full tooltip tooltip-top tooltip-secondary px-4 py-3 cursor-pointer ${isDarkMode ? 'bg-purple-900 hover:bg-purple-800' : 'bg-purple-50 hover:bg-purple-100'} text-purple-600 rounded-lg transition-colors flex items-center justify-center font-medium`}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Generate Report
                </button>

                {order.status !== "Cancelled" && order.status !== "Delevered" && (
                  <button className="w-full px-4 cursor-pointer py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-gray-900 opacity-95 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-xl max-w-md w-full`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold">Update Order Status</h3>
              <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Change the status of order #{order._id?.substring(order._id.length - 8).toUpperCase()}
              </p>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {Object.entries(statusConfig).map(([status, config]) => (
                  <label key={status} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{config.icon}</span>
                      <span className="font-medium">{status}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowStatusModal(false)}
                className={`flex-1 px-4 py-2 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-gray-900 opacity-95 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl shadow-xl max-w-lg w-full`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold">Add Admin Notes</h3>
              <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Add internal notes for this order
              </p>
            </div>
            <div className="p-6">
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add your notes here..."
                className={`w-full h-32 p-3 border rounded-lg resize-none ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-100' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            <div className="flex space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowNotesModal(false)}
                className={`flex-1 px-4 py-2 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNotes}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};