import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetOrderById } from "../API/GET-SWR/order";
import { UpdateOrderStatus } from "../API/POST-Axios/order";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { FaArrowLeft, FaBox, FaShippingFast, FaUser, FaMapMarkerAlt, FaCreditCard, FaPrint, FaFileDownload } from "react-icons/fa";
import { MdCancel, MdDeliveryDining, MdFileDownloadDone, MdPending } from "react-icons/md";
import { BsCheckCircleFill, BsClock } from "react-icons/bs";

export const ViewOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { order, error, isLoading } = GetOrderById(id);
    const [isUpdating, setIsUpdating] = useState(false);
    const [activeTab, setActiveTab] = useState("details");

    const handleStatusUpdate = async (status) => {
        setIsUpdating(true);
        try {
            const response = await UpdateOrderStatus(id, status);
            if (response.status === 200) {
                toast.success(`Order status updated to ${status}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                mutate(`/order/get-order/${id}`);
            } else {
                toast.error("Failed to update order status");
            }
        } catch (error) {
            toast.error("Error updating order status");
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "Confirmed":
                return "bg-blue-100 text-blue-800 border-blue-300";
            case "Shipped":
                return "bg-indigo-100 text-indigo-800 border-indigo-300";
            case "Delevered":
                return "bg-green-100 text-green-800 border-green-300";
            case "Cancelled":
                return "bg-red-100 text-red-800 border-red-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending":
                return <MdPending className="text-yellow-600" />;
            case "Confirmed":
                return <BsCheckCircleFill className="text-blue-600" />;
            case "Shipped":
                return <FaShippingFast className="text-indigo-600" />;
            case "Delevered":
                return <MdFileDownloadDone className="text-green-600" />;
            case "Cancelled":
                return <MdCancel className="text-red-600" />;
            default:
                return null;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate time elapsed since order creation
    const getTimeElapsed = (dateString) => {
        const orderDate = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - orderDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else {
            const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        }
    };

    if (isLoading) {
        return (
            <div className="mainContainer bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
                <div className="innerContainer p-6 flex items-center justify-center min-h-[80vh]">
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <div className="relative">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                            <span className="absolute inset-0 flex items-center justify-center">
                                <FaBox className="text-primary animate-pulse" />
                            </span>
                        </div>
                        <p className="text-lg font-medium animate-pulse">Loading order details...</p>
                        <div className="text-sm text-gray-500">Please wait while we fetch your order information</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mainContainer bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
                <div className="innerContainer p-6">
                    <div 
                        className="flex flex-col gap-4 items-center justify-center min-h-[60vh]"
                    >
                        <div className="alert alert-error shadow-lg max-w-md">
                            <div>
                                <MdCancel className="text-2xl" />
                                <div>
                                    <h3 className="font-bold">Error</h3>
                                    <div className="text-xs">{error.message}</div>
                                </div>
                            </div>
                        </div>
                        <button 
                            className="btn btn-primary mt-4 shadow-md hover:shadow-lg transition-all"
                            onClick={() => navigate(-1)}
                        >
                            <FaArrowLeft /> Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="mainContainer bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
                <div className="innerContainer p-6">
                    <div 
                        className="flex flex-col gap-4 items-center justify-center min-h-[60vh]"
                    >
                        <div className="alert alert-warning shadow-lg max-w-md">
                            <div>
                                <BsClock className="text-2xl" />
                                <div>
                                    <h3 className="font-bold">Order Not Found</h3>
                                    <div className="text-xs">The requested order could not be found</div>
                                </div>
                            </div>
                        </div>
                        <button 
                            className="btn btn-primary mt-4 shadow-md hover:shadow-lg transition-all"
                            onClick={() => navigate(-1)}
                        >
                            <FaArrowLeft /> Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mainContainer bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
            <div className="innerContainer p-4 md:p-6">
                <div className="w-full">
                    {/* Header with Order ID and Navigation */}
                    <div 
                        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
                    >
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Order Details
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm text-gray-500">Order ID:</p>
                                <div className="badge badge-neutral font-mono">
                                    {order._id}
                                </div>
                            </div>
                        </div>
                        <button 
                            className="btn btn-primary shadow-md hover:shadow-lg transition-all"
                            onClick={() => navigate(-1)}
                        >
                            <FaArrowLeft /> Back to Orders
                        </button>
                    </div>

                    {/* Status Banner */}
                    <div 
                        className={`card mb-6 border-l-4 ${getStatusColor(order.status)} shadow-md`}
                    >
                        <div className="card-body p-4 flex flex-row items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                            </div>
                            <div>
                                <h2 className="card-title">Order Status: {order.status}</h2>
                                <p className="text-sm flex items-center gap-1">
                                    <BsClock /> {getTimeElapsed(order.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div 
                        className="tabs tabs-boxed mb-6 flex justify-center bg-base-200 p-1 rounded-full max-w-md mx-auto"
                    >
                        <a 
                            className={`tab grow ${activeTab === "details" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("details")}
                        >
                            Order Details
                        </a>
                        <a 
                            className={`tab grow ${activeTab === "products" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("products")}
                        >
                            Products
                        </a>
                        <a 
                            className={`tab grow ${activeTab === "status" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("status")}
                        >
                            Status
                        </a>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {/* Order Details Tab */}
                        {activeTab === "details" && (
                            <div 
                                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                                style={{ opacity: 1, transition: 'opacity 0.3s' }}
                            >
                                {/* Order Summary Card */}
                                <div className="col-span-2">
                                    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <div className="card-body">
                                            <div className="flex justify-between items-center">
                                                <h2 className="card-title text-xl flex items-center gap-2">
                                                    <FaBox className="text-primary" /> Order Summary
                                                </h2>
                                                <div className={`badge ${getStatusColor(order.status)} gap-1 px-3 py-3`}>
                                                    {getStatusIcon(order.status)}
                                                    <span>{order.status}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="divider my-2"></div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-base-200 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-500">Order Date</p>
                                                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                                                </div>
                                                <div className="bg-base-200 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-500">Last Updated</p>
                                                    <p className="font-medium">{formatDate(order.updatedAt)}</p>
                                                </div>
                                                <div className="bg-base-200 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-500">Payment Method</p>
                                                    <div className="flex items-center gap-2">
                                                        <FaCreditCard className="text-primary" />
                                                        <p className="font-medium">{order.paymentMethod || "Not specified"}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-primary bg-opacity-10 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-500">Total Amount</p>
                                                    <p className="font-bold text-lg text-primary">₹{order.totalAmount.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Address Card */}
                                    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 mt-6">
                                        <div className="card-body">
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-primary" />
                                                <h2 className="card-title">Delivery Address</h2>
                                            </div>
                                            
                                            <div className="divider my-2"></div>
                                            
                                            {order.deliveryAddress ? (
                                                <div className="bg-base-200 p-4 rounded-lg">
                                                    <p className="font-medium text-lg">{order.deliveryAddress.fullName}</p>
                                                    <p>{order.deliveryAddress.addressLine1}</p>
                                                    {order.deliveryAddress.addressLine2 && <p>{order.deliveryAddress.addressLine2}</p>}
                                                    <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}</p>
                                                    <p>{order.deliveryAddress.country}</p>
                                                    <p className="mt-2 flex items-center gap-2">
                                                        <span className="badge badge-primary">Phone</span> 
                                                        {order.deliveryAddress.phone}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">Address information not available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info Card */}
                                <div className="col-span-1">
                                    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                                        <div className="card-body">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-primary" />
                                                <h2 className="card-title">Customer Information</h2>
                                            </div>
                                            
                                            <div className="divider my-2"></div>
                                            
                                            <div className="flex flex-col gap-4">
                                                <div className="bg-base-200 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-500">Name</p>
                                                    <p className="font-medium">{order.userId?.name || "Not available"}</p>
                                                </div>
                                                <div className="bg-base-200 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-500">Email</p>
                                                    <p className="font-medium break-all">{order.userId?.email || "Not available"}</p>
                                                </div>
                                                <div className="bg-base-200 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="font-medium">{order.userId?.phone || "Not available"}</p>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <h3 className="font-medium mb-2">Quick Actions</h3>
                                                <div className="flex flex-col gap-2">
                                                    <button className="btn btn-outline btn-sm btn-primary w-full justify-start">
                                                        <FaUser /> View Customer Profile
                                                    </button>
                                                    <button className="btn btn-outline btn-sm btn-secondary w-full justify-start">
                                                        <FaBox /> View All Customer Orders
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Products Tab */}
                        {activeTab === "products" && (
                            <div 
                                className="animate-fadeIn"
                                style={{ opacity: 1, transition: 'opacity 0.3s' }}
                            >
                                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="card-body">
                                        <div className="flex items-center gap-2">
                                            <FaBox className="text-primary" />
                                            <h2 className="card-title">Products</h2>
                                        </div>
                                        
                                        <div className="divider my-2"></div>
                                        
                                        <div className="overflow-x-auto">
                                            <table className="table table-zebra w-full">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.products && order.products.map((item, index) => (
                                                        <tr key={index} className="hover:bg-base-200 transition-all">
                                                            <td>
                                                                {item.productId?.images && item.productId.images[0] ? (
                                                                    <div className="avatar">
                                                                        <div className="w-16 h-16 rounded-lg shadow-md overflow-hidden">
                                                                            <img 
                                                                                src={item.productId.images[0]} 
                                                                                alt={item.productId.name}
                                                                                className="object-cover w-full h-full hover:scale-110 transition-transform duration-300" 
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="avatar placeholder">
                                                                        <div className="w-16 h-16 rounded-lg bg-neutral-focus text-neutral-content">
                                                                            <span>N/A</span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="font-medium">{item.productId?.name || "Product unavailable"}</td>
                                                            <td>₹{item.productId?.price?.toLocaleString() || "N/A"}</td>
                                                            <td>
                                                                <div className="badge badge-neutral">{item.quantity}</div>
                                                            </td>
                                                            <td className="font-medium text-primary">
                                                                ₹{item.productId?.price ? (item.productId.price * item.quantity).toLocaleString() : "N/A"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colSpan="4" className="text-right font-bold">Total:</td>
                                                        <td className="font-bold text-lg text-primary">₹{order.totalAmount.toLocaleString()}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Status Management Tab */}
                        {activeTab === "status" && (
                            <div 
                                className="animate-fadeIn"
                                style={{ opacity: 1, transition: 'opacity 0.3s' }}
                            >
                                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="card-body">
                                        <h2 className="card-title flex items-center gap-2">
                                            <FaShippingFast className="text-primary" />
                                            Order Status Management
                                        </h2>
                                        
                                        <div className="divider my-2"></div>
                                        
                                        {/* Status Timeline */}
                                        <div className="py-6">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                                                <div className="text-lg font-bold">Current Status: 
                                                    <span className={`ml-2 badge ${getStatusColor(order.status)} gap-1 px-3 py-3`}>
                                                        {getStatusIcon(order.status)}
                                                        <span>{order.status}</span>
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                                                    Last updated: {formatDate(order.updatedAt)}
                                                </div>
                                            </div>

                                            <div className="w-full py-4">
                                                <ul className="steps steps-vertical md:steps-horizontal w-full">
                                                    <li className={`step ${order.status !== 'Cancelled' ? 'step-primary' : 'step-error'}`}>
                                                        <div className="text-center mt-2">
                                                            <div className="font-bold">Pending</div>
                                                            <div className="text-xs">Order Received</div>
                                                        </div>
                                                    </li>
                                                    <li className={`step ${(order.status === 'Confirmed' || order.status === 'Shipped' || order.status === 'Delevered') ? 'step-primary' : ''}`}>
                                                        <div className="text-center mt-2">
                                                            <div className="font-bold">Confirmed</div>
                                                            <div className="text-xs">Processing</div>
                                                        </div>
                                                    </li>
                                                    <li className={`step ${(order.status === 'Shipped' || order.status === 'Delevered') ? 'step-primary' : ''}`}>
                                                        <div className="text-center mt-2">
                                                            <div className="font-bold">Shipped</div>
                                                            <div className="text-xs">On the way</div>
                                                        </div>
                                                    </li>
                                                    <li className={`step ${order.status === 'Delevered' ? 'step-primary' : ''}`}>
                                                        <div className="text-center mt-2">
                                                            <div className="font-bold">Delivered</div>
                                                            <div className="text-xs">Completed</div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                        {/* Status Update Buttons */}
                                        <div className="bg-base-200 p-4 rounded-lg">
                                            <h3 className="font-bold mb-4">Update Order Status</h3>
                                            <div className="flex flex-wrap gap-3 justify-center">
                                                <button 
                                                    className="btn btn-info shadow-md hover:shadow-lg transition-all"
                                                    disabled={order.status === 'Confirmed' || isUpdating || order.status === 'Cancelled'}
                                                    onClick={() => handleStatusUpdate('Confirmed')}
                                                >
                                                    <BsCheckCircleFill /> Confirm Order
                                                </button>
                                                <button 
                                                    className="btn btn-primary shadow-md hover:shadow-lg transition-all"
                                                    disabled={order.status === 'Shipped' || order.status === 'Cancelled' || order.status === 'Pending' || isUpdating}
                                                    onClick={() => handleStatusUpdate('Shipped')}
                                                >
                                                    <FaShippingFast /> Mark as Shipped
                                                </button>
                                                <button 
                                                    className="btn btn-success shadow-md hover:shadow-lg transition-all"
                                                    disabled={order.status === 'Delevered' || order.status === 'Cancelled' || order.status === 'Pending' || isUpdating}
                                                    onClick={() => handleStatusUpdate('Delevered')}
                                                >
                                                    <MdDeliveryDining /> Mark as Delivered
                                                </button>
                                                <button 
                                                    className="btn btn-error shadow-md hover:shadow-lg transition-all"
                                                    disabled={order.status === 'Cancelled' || order.status === 'Delevered' || isUpdating}
                                                    onClick={() => handleStatusUpdate('Cancelled')}
                                                >
                                                    <MdCancel /> Cancel Order
                                                </button>
                                            </div>

                                            {isUpdating && (
                                                <div className="flex justify-center mt-4">
                                                    <span className="loading loading-spinner loading-md"></span>
                                                    <span className="ml-2">Updating status...</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Print/Download Buttons */}
                    <div 
                        className="flex flex-wrap justify-end gap-3 mt-6"
                    >
                        <button className="btn btn-outline btn-secondary shadow-md hover:shadow-lg transition-all">
                            <FaFileDownload /> Download Invoice
                        </button>
                        <button className="btn btn-outline btn-primary shadow-md hover:shadow-lg transition-all">
                            <FaPrint /> Print Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};