import { AiFillProduct } from "react-icons/ai";
import { GoGraph } from "react-icons/go";
import { BsStack } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { MdCancel, MdFileDownloadDone } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

import { MdCloudDone } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GetLimitedOrdersAdmin } from "../API/GET-SWR/order";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {UpdateOrderStatus} from '../API/POST-Axios/order'
import { toast } from "react-toastify";
import { mutate } from "swr";

export const Orders = () => {
  const navigate = useNavigate();
  const { limit } = useParams();
  const { orders, error, isLoading } = GetLimitedOrdersAdmin(limit);
  const [ordersData, setOrdersData] = useState([]);
  useEffect(() => {
    if (!isLoading && orders) {
      // console.log(orders[0].userId.name)
      setOrdersData(orders);
    }
  }, [orders, isLoading]);

  if (error) {
    return (
      <div className="mainContainer px-4">
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Error: {error.message}</h1>
        </div>
      </div>
    );
  }


  const handleShipping = async(id)=>{
    const response = await UpdateOrderStatus(id, "Shipped")
    if(response.status === 200){
      toast.info("Order Shipped Successfully")
      mutate(`/admin/orders/${limit}`) // it is not working properly (Todo: fix it)
    }else{
      toast.error("Failed to update order status")
    }
  }

  const handleDelevered = async(id)=>{
    const response = await UpdateOrderStatus(id, "Delevered")
    if(response.status === 200){
      toast.success("Order Delevered Successfully")
      mutate(`/admin/orders/${limit}`) // it is not working properly (Todo: fix it)
    }else{
      toast.error("Failed to update order status")
    }
  }

  const handleCancel = async(id)=>{
    const response = await UpdateOrderStatus(id, "Cancelled")
    if(response.status === 200){
      toast.warning("Order Cancelled Successfully")
      mutate(`/admin/orders/${limit}`) // it is not working properly (Todo: fix it)
    }else{
      toast.error("Failed to update order status")
    }
  }


  return (
    <div className="mainContainer px-4">
      {/* Cards */}
      <div className="Cards flex gap-8">
        <OrderCard
          value={148}
          title={"Total Orders"}
          percentage={14}
          icon={"order"}
        />
        <OrderCard
          value={20}
          title={"Orders on Process"}
          percentage={8}
          icon={"pending"}
        />
        <OrderCard
          value={60}
          title={"Orders Done"}
          percentage={15}
          icon={"done"}
        />
        <OrderCard
          value={20000}
          title={"Total Revenue"}
          percentage={18}
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
          <button className="btn btn-primary">Filter</button>
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
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ordersData &&
                  ordersData.map((order, index) => {
                    return (
                      <tr key={order._id}>
                        <th>{index + 1}</th>
                        <td>{order._id}</td>
                        <td>{order.createdAt.split("T")[0]}</td>
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
                        <td>{order.totalAmount}</td>
                        <td className="flex gap-2 items-center text-lg">
                          {order.status === "Confirmed" ? (
                            <>
                              <FaShippingFast className="text-info cursor-pointer" onClick={()=>handleShipping(order._id)}/>
                              <MdFileDownloadDone className="text-success cursor-pointer" onClick={()=>handleDelevered(order._id)}/>
                              <MdCancel className="text-warning cursor-pointer" onClick={()=>handleCancel(order._id)}/>
                            </>
                          ) : order.status === "Shipped" ? (
                            <>
                              <FaShippingFast className="text-info opacity-20" />  {/* Hidden button */}
                              <MdFileDownloadDone className="text-success cursor-pointer" onClick={()=>handleDelevered(order._id)}/>
                              <MdCancel className="text-warning cursor-pointer" onClick={()=>handleCancel(order._id)}/>
                            </>
                          ) : order.status === "Delevered" ? (
                            <>
                            <FaShippingFast className="text-info opacity-20" /> {/* Hidden button */}
                              <MdFileDownloadDone className="text-success opacity-30" /> {/* Hidden button */}
                              <MdCancel className="text-warning cursor-pointer opacity-20"/>
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

const OrderCard = ({ value, title, percentage, icon }) => {
  return (
    <div
      className={`CardContainer shadow-lg rounded-lg p-5 dark:bg-gray-800 bg-gray-100 mt-5 w-[310px] border-t-5 ${
        icon === "order"
          ? "border-t-primary"
          : icon === "pending"
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
          ) : icon === "pending" ? (
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
        <h1 className="text-sm dark:text-gray-300 text-gray-500">
          Compare to yesterday
        </h1>
        <div className="graph badge dark:badge-info badge-secondary badge-outline badge-xs py-2 pr-3 flex items-center justify-start gap-1">
          <GoGraph />
          <span className="text-xs">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};
