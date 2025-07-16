import { AiFillProduct } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { BsEye, BsStack } from "react-icons/bs";
import { FaEye, FaFilter, FaShippingFast } from "react-icons/fa";
import { MdCancel, MdFileDownloadDone } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

import { MdCloudDone } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GetLimitedOrdersAdmin } from "../API/GET-SWR/order";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateOrderStatus } from "../API/POST-Axios/order";
import { toast } from "react-toastify";
import { mutate } from "swr";
import {ProductSkeleton} from '../Pages/products-section/ProductSceleton'


// Format number function to handle large numbers with appropriate suffixes
const formatNumber = (num, decimals = 2) => {
  if (num == null) return "Invalid input";

  // Convert input to a number, removing non-numeric characters if it's a string
  let numValue =
    typeof num === "string"
      ? parseFloat(num.replace(/[^0-9.-]/g, ""))
      : Number(num);

  if (isNaN(numValue)) return "Invalid input";

  // Determine if the number is negative and get its absolute value
  const isNegative = numValue < 0;
  const absValue = Math.abs(numValue);

  // If the absolute value is below 1000, return it as is
  if (absValue < 1000) return isNegative ? `-${absValue}` : absValue;

  // Define suffixes for large numbers
  const suffixes = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ];

  // Find the largest suffix that fits the number
  const suffix = suffixes.find(({ value }) => absValue >= value);
  if (!suffix) return numValue.toString();

  // Format the number by dividing by the suffix value and fixing decimals
  let formattedValue = (absValue / suffix.value).toFixed(decimals);

  // Remove trailing zeros and unnecessary decimal points
  formattedValue = formattedValue.replace(/\.?0+$/, "");

  // Add back the negative sign if needed and append the suffix
  return (isNegative ? "-" : "") + formattedValue + suffix.symbol;
};

export const Orders = () => {
  const navigate = useNavigate();
  const { limit } = useParams();
  const { orders, error, isLoading } = GetLimitedOrdersAdmin(limit);
  const [ordersData, setOrdersData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (!isLoading && orders) {
      // console.log(orders[0].userId.name)
      setOrdersData(orders);
      setStartDate(new Date(orders[0].createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      setEndDate(new Date(orders[orders.length - 1].createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  }, [orders, isLoading]);

  console.log(ordersData)

  if(isLoading){
    return(
      <div className="mainContainer flex gap-4 w-full h-full justify-center items-center">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mainContainer px-4">
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Error: {error.message}</h1>
        </div>
      </div>
    );
  }

  const handleShipping = async (id) => {
    const response = await UpdateOrderStatus(id, "Shipped");
    if (response.status === 200) {
      toast.info("Order Shipped Successfully");
      mutate(`/order/admin/get-all-orders/${limit}`); 
    } else {
      toast.error("Failed to update order status");
    }
  };

  const handleDelevered = async (id) => {
    const response = await UpdateOrderStatus(id, "Delevered");
    if (response.status === 200) {
      toast.success("Order Delevered Successfully");
      mutate(`/order/admin/get-all-orders/${limit}`); 
    } else {
      toast.error("Failed to update order status");
    }
  };

  const handleCancel = async (id) => {
    const response = await UpdateOrderStatus(id, "Cancelled");
    if (response.status === 200) {
      toast.warning("Order Cancelled Successfully");
      mutate(`/order/admin/get-all-orders/${limit}`); 
    } else {
      toast.error("Failed to update order status");
    }
  };

  const handleStatusFilter = (status)=>{

    if(status === 'All'){
      return setOrdersData(orders)
    }else if(status === 'Pending'){
      return setOrdersData(orders.filter(order => order.status === 'Pending'))
    }else if(status === 'Confirmed'){
      return setOrdersData(orders.filter(order => order.status === 'Confirmed'))
    }else if(status === 'Shipped'){
      return setOrdersData(orders.filter(order => order.status === 'Shipped'))
    }else if(status === 'Delevered'){
      return setOrdersData(orders.filter(order => order.status === 'Delevered'))
    }else if(status === 'Cancelled'){
      return setOrdersData(orders.filter(order => order.status === 'Cancelled'))
    }
  }

  const handleView = (id)=>{
    navigate(`/admin/view-order/${id}`);
  }

  return (
    <div className="mainContainer px-4">
      {/* Cards */}
      <div className="Cards flex gap-8">
        <OrderCard
          value={ordersData.length}
          title={"Total Orders"}
          footer={`${startDate} To ${endDate}`}
          icon={"order"}
        />
        <OrderCard
          value={ordersData.filter(order => order.status !== 'Delevered').length}
          title={"Orders on Process"}
          footer={`${startDate} To ${endDate}`}
          icon={"Confirmed"}
        />
        <OrderCard
          value={ordersData.filter(order => order.status === 'Delevered').length}
          title={"Orders Done"}
          footer={`${startDate} To ${endDate}`}
          icon={"done"}
        />
        <OrderCard
          value={formatNumber(ordersData.reduce((acc, order) => acc + order.totalAmount, 0))}
          title={"Total Revenue"}
          footer={`${startDate} To ${endDate}`}
          icon={"revenue"}
        />
      </div>

      {/* Table container */}
      <div className="tableContainer mt-10 dark:bg-gray-800 bg-gray-100 p-5 rounded-lg border-t-5 border-t-secondary shadow-md">
        {/* Heading Text */}
        <div className="headText flex justify-between items-center">
          <div className="txt">
            <h1 className="text-2xl font-bold">Order List</h1>
            <p className="text-sm text-gray-500">
              view and manage all orders with details on status, payment, and
              more
            </p>
          </div>
          <button
            className="btn btn-sm btn-primary font-semibold text-lg px-5"
            popoverTarget="popover-1"
            style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
          >
            <FaFilter />
            Filter
          </button>

          <ul
            className="dropdown menu w-36 rounded-box dark:bg-gray-700 bg-gray-100 shadow-sm"
            popover="auto"
            id="popover-1"
            style={
              { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
            }
          >
            <li onClick={()=> handleStatusFilter('All')}>
              <p className="text-sm font-semibold">All</p>
            </li>
            <li onClick={()=> handleStatusFilter('Pending')}>
              <p className="text-sm font-semibold">Pending</p>
            </li>
            <li onClick={()=> handleStatusFilter('Confirmed')}>
              <p className="text-sm font-semibold">Confirmed</p>
            </li>
            <li onClick={()=> handleStatusFilter('Shipped')}>
              <p className="text-sm font-semibold">Shipped</p>
            </li>
            <li onClick={()=> handleStatusFilter('Delevered')}>
              <p className="text-sm font-semibold">Delevered</p>
            </li>
            <li onClick={()=> handleStatusFilter('Cancelled')}>
              <p className="text-sm font-semibold">Cancelled</p>
            </li>
          </ul>
        </div>

        {/* Table */}
        <div className="tableContainer mt-5">
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th className="w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ordersData &&
                  ordersData.map((order, index) => {
                    return (
                      <tr key={order._id}>
                        <th>{index + 1}</th>
                        <td>{order._id}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        <td>{order.userId.name}</td>
                        <td
                          className={`${
                            order.status === "Delevered"
                              ? "text-success"
                              : order.status === "Pending"
                              ? "text-warning"
                              : order.status === "Confirmed"
                              ? "text-primary"
                              : order.status === "Shipped"
                              ? "text-info"
                              : "text-error"
                          } font-semibold`}
                        >
                          {order.status}
                        </td>
                        <td>{order.totalAmount.toFixed(2)}</td>
                        <td className="flex gap-2 items-center text-lg">
                          {order.status === "Confirmed" ? (
                            <>
                              <FaShippingFast
                                className="text-info cursor-pointer"
                                onClick={() => handleShipping(order._id)}
                              />
                              <MdFileDownloadDone
                                className="text-success cursor-pointer"
                                onClick={() => handleDelevered(order._id)}
                              />
                              <MdCancel
                                className="text-warning cursor-pointer"
                                onClick={() => handleCancel(order._id)}
                              />
                              <FaEye onClick={()=> handleView(order._id)} className="text-success text-sm cursor-pointer" />
                            </>
                          ) : order.status === "Shipped" ? (
                            <>
                              <FaShippingFast className="text-info opacity-20" />{" "}
                              {/* Hidden button */}
                              <MdFileDownloadDone
                                className="text-success cursor-pointer"
                                onClick={() => handleDelevered(order._id)}
                              />
                              <MdCancel
                                className="text-warning cursor-pointer"
                                onClick={() => handleCancel(order._id)}
                              />
                              <FaEye onClick={()=> handleView(order._id)} className="text-success text-sm cursor-pointer" />
                            </>
                          ) : order.status === "Delevered" ? (
                            <>
                              <FaShippingFast className="text-info opacity-20" />{" "}
                              {/* Hidden button */}
                              <MdFileDownloadDone className="text-success opacity-30" />{" "}
                              {/* Hidden button */}
                              <MdCancel className="text-warning cursor-pointer opacity-20" />
                              <FaEye onClick={()=> handleView(order._id)} className="text-success text-sm cursor-pointer" />
                            </>
                          ) : (
                            <TiCancel className="text-error" />
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="join mt-8 flex justify-center gap-4">
          <button
            disabled={parseInt(limit) === 1}
            className="join-item btn btn-outline btn-sm hover:btn-warning"
            onClick={() => {
              navigate(`/admin/orders/${parseInt(limit) - 1}`);
            }}
          >
            «
          </button>
          <button className="join-item btn btn-sm btn-primary">{limit}</button>
          <button
            disabled={ordersData.length === 0}
            className="join-item btn btn-outline btn-sm hover:btn-success"
            onClick={() => {
              navigate(`/admin/orders/${parseInt(limit) + 1}`);
            }}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ value, title, icon, footer }) => {
  return (
    <div
      className={`CardContainer shadow-lg rounded-lg p-5 dark:bg-gray-800 bg-gray-100 mt-5 w-[310px] border-t-5 ${
        icon === "order"
          ? "border-t-primary"
          : icon === "Confirmed"
          ? "border-t-warning"
          : icon === "done"
          ? "border-t-success"
          : "border-t-error"
      }`}
    >
      <div className="flex gap-2 items-center">
        <div className="icon text-6xl dark:text-gray-300 text-gray-700">
          {icon === "order" ? (
            <AiFillProduct />
          ) : icon === "Confirmed" ? (
            <BsStack />
          ) : icon === "done" ? (
            <MdCloudDone />
          ) : (
            <RiMoneyRupeeCircleFill />
          )}
        </div>
        <div className="headValue">
          <h1 className="text-xl dark:text-gray-300 text-gray-700 font-bold">
            {value}
          </h1>
          <p className="text-xs dark:text-gray-300 text-gray-500 font-semibold">
            {title}
          </p>
        </div>
      </div>

      <hr className="mt-5 dark:text-gray-600 text-gray-400" />
      <div className="foot flex justify-between items-center mt-3 px-2">
        <h1 className="text-xs dark:text-gray-500 text-gray-500">
          {footer} 
        </h1>
        {/* <div className="graph badge dark:badge-info badge-secondary badge-outline badge-xs py-2 pr-3 flex items-center justify-start gap-1">
          <GoGraph />
          <span className="text-xs">{percentage}%</span>
        </div> */}
      </div>
    </div>
  );
};
