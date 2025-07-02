import { useEffect, useState } from "react";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaShoppingCart,
  FaTruck,
  FaMoneyBill,
  FaPercentage,
  FaArrowUp,
  FaCalendar,
  FaArrowDown,
  FaBox,
} from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { FaBullhorn } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { GetProducts } from "../API/GET-SWR/product";
import { GetAllOrders } from "../API/GET-SWR/order";
import { GetAllUsers, GetGraphData } from "../API/GET-SWR/user";
import { LineChart } from "@mui/x-charts/LineChart";

export const AdminDashboard = () => {
  const { allProducts, isLoading } = GetProducts();
  const { orders, isLoading: ordersLoading } = GetAllOrders();
  const { allUsers, allOrders, isLoading: usersLoading } = GetAllUsers();
  const { dailyUserCounts, dailyOrderCounts, dailyRevenue, isLoading: graphLoading } = GetGraphData();
  // console.log(allOrders);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  
  useEffect(() => {
    if (!isLoading && allProducts)
      setTotalRevenue(
        allProducts.reduce((acc, product) => acc + product.price, 0)
      );
    if (!ordersLoading && orders) setTotalOrders(orders.length);
    if (!usersLoading && allUsers) setTotalCustomers(allUsers.length);
  }, [
    allProducts,
    totalRevenue,
    totalOrders,
    isLoading,
    ordersLoading,
    orders,
    allUsers,
    usersLoading,
  ]);

  const [activeTab, setActiveTab] = useState("dashboard");
  // const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // setMobileSidebarOpen(false); // Close sidebar when tab is changed
  };

  return (
    <div className="mainContainer w-[100%] flex flex-row gap-4 p-4 dark:bg-gray-900 bg-gray-50">
      {/* Menu */}
      <div className="Menu w-[20%] p-4 dark:bg-gray-800 bg-gray-100 rounded-md shadow-md  flex flex-col gap-2">
        {/* Dashboard */}
        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300">
          General
        </h1>
        <hr className="border-gray-300 dark:border-gray-600" />
        <nav className="space-y-2">
          <button
            onClick={() => handleTabChange("dashboard")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "dashboard"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaHome className="mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => handleTabChange("products")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "products"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaBox className="mr-3" />
            Products
          </button>
          <button
            onClick={() => handleTabChange("customers")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "customers"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaUser className="mr-3" />
            Customers
          </button>
          <button
            onClick={() => handleTabChange("analytics")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "analytics"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaChartLine className="mr-3" />
            Analitics
          </button>
          <button
            onClick={() => handleTabChange("marketing")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "marketing"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaBullhorn className="mr-3" />
            Marketing
          </button>
          <button
            onClick={() => handleTabChange("reviews")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "reviews"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaComment className="mr-3" />
            Reviews
          </button>
        </nav>

        {/* Finance */}
        <hr className="border-gray-300 dark:border-gray-600" />
        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300">
          Finance
        </h1>
        <hr className="border-gray-300 dark:border-gray-600" />
        <nav className="space-y-2">
          <button
            onClick={() => handleTabChange("payments")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "payments"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaMoneyBill className="mr-3" />
            Payments
          </button>
          <button
            onClick={() => handleTabChange("shippings")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "shippings"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTruck className="mr-3" />
            Shippings
          </button>
          <button
            onClick={() => handleTabChange("taxes")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "taxes"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaPercentage className="mr-3" />
            Taxes
          </button>
          <button
            onClick={() => handleTabChange("refunds")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "refunds"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaChartLine className="mr-3" />
            Refunds
          </button>
          <button
            onClick={() => handleTabChange("helpCenter")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "helpCenter"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaBullhorn className="mr-3" />
            Help Center
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="Content w-[80%]">
        {/* Cards */}
        <div className="cards flex flex-row gap-4">
          <Cards
            title="Total Revenue"
            value={`₹ ${totalRevenue}`}
            percentage={10}
          />
          <Cards title="Total Orders" value={totalOrders} percentage={3} />
          <Cards
            title="Total Customers"
            value={totalCustomers}
            percentage={1}
          />
        </div>

        {/* Chart */}
        <div className=" p-4 mt-5 dark:bg-gray-800 bg-gray-100 rounded-md shadow-md">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], scaleType: 'point' }]}
            // yAxis={[{ data: [0, 10, 15, 20, 25, 30], label: 'Revenue' }]}
            series={[
              {
                data: !graphLoading ? dailyUserCounts : [],
                label: 'Users',
                color: 'yellow',
                labelMarkType: 'circle',
                // area: true,
                // color: '#99a1af',
              },
              {
                data: !graphLoading ? dailyOrderCounts : [],
                label: 'Orders',
                color: 'blue',
                labelMarkType: 'circle',
                
                // area: true,
                // color: '#99a1af',
              },
              // {
              //   data: dailyRevenue,
              //   // area: true,
              //   // color: '#99a1af',
              // },
            ]}
            height={300}
            sx={{
              '.MuiChartsAxis-tickLabel': {
                fill: '#99a1af !important',
              },
              '.MuiChartsAxis-line': {
                stroke: '#99a1af !important',
              },
              '.MuiChartsAxis-tick': {
                stroke: '#99a1af !important',
              },
            }}
          />
        </div>


        {/* Orders Table */}
        <div className="OrdersTable mt-5 dark:bg-gray-800 bg-gray-100 rounded-md shadow-md p-3">
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          {/* <label>
            <input type="checkbox" className="checkbox" />
          </label> */}
        </th>
        <th>Customer</th>
        <th>Contact</th>
        <th>Orders</th>
        <th>Revenue</th>
      </tr>
    </thead>
    <tbody>
      {
        !usersLoading && allUsers.map((user)=>{
          return(
            <tr key={user._id}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.avatar}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.name}</div>
              <div className="text-sm opacity-50">Since {new Date(user.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </td>
        <td className="">
          <span className="">{user.email}</span>
          <br />
          <span className="badge dark:badge-primary badge-secondary badge-sm">{user.phone}</span>
        </td>
        <td>{
          allOrders.filter((order)=> order.userId.toString() === user._id.toString()).length
          }</td>
        <th>
          <p className="text-sm text-gray-700 dark:text-gray-300">{
            allOrders.filter((order)=> order.userId.toString() === user._id.toString()).reduce((acc, order)=>acc + order.totalAmount, 0)
            }</p>
        </th>
      </tr>
          )
        })
      }

    </tbody>

    {/* foot */}
    {/* <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot> */}

  </table>
</div>
        </div>
      </div>
    </div>
  );
};

const Cards = ({ title, value, percentage }) => {
  const percentageColor =
    percentage > 0
      ? "text-green-500 dark:text-green-500"
      : "text-red-500 dark:text-red-500";
  const percentageIcon =
    percentage > 0 ? (
      <FaArrowUp className={percentageColor} size={16} />
    ) : (
      <FaArrowDown className={percentageColor} size={16} />
    );
  const percentageText = percentage > 0 ? "+" : "";
  return (
    <div className="cardContainer flex flex-col  gap-2 rounded-b-md w-[320px] h-[130px] bg-white dark:bg-gray-800 rounded-md shadow-md">
      <div className="head flex flex-row justify-between items-center px-3 py-1">
        <h1 className=" font-semibold text-gray-700 dark:text-gray-300">
          {title}
        </h1>
        <FaChartLine className="text-gray-700 dark:text-gray-300" size={16} />
      </div>
      <div className="middle flex flex-row justify-between items-center px-3">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300">
          {value}
        </h1>
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {percentageText}
            {percentage}
          </h1>
          {percentageIcon}
        </div>
      </div>
      <div className="foot flex flex-row justify-between items-center mt-6 rounded-b-md px-2 py-1 bg-gray-100 shadow-md dark:bg-gray-700">
        <div className="dates flex flex-row items-center gap-2">
          <h1 className="text-sm text-gray-700 dark:text-gray-300">
            Last 30 days
          </h1>
          <FaCalendar className="text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </div>
  );
};
