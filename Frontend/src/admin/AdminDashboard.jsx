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
import { GetAllOrders, GetAllOrdersAdmin } from "../API/GET-SWR/order";
import { GetAllUsers, GetGraphData } from "../API/GET-SWR/user";
import { LineChart } from "@mui/x-charts/LineChart";

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

export const AdminDashboard = () => {
  const { allProducts, isLoading } = GetProducts();
  const { orders, isLoading: ordersLoading } = GetAllOrders();
  const { orders: adminOrders, isLoading: adminOrdersLoading } =
    GetAllOrdersAdmin();
  const { allUsers, allOrders, isLoading: usersLoading } = GetAllUsers();
  const {
    dailyUserCounts,
    dailyOrderCounts,
    isLoading: graphLoading,
  } = GetGraphData();
  // console.log(allOrders);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAdminOrders, setTotalAdminOrders] = useState(0);
  const [todayOrdersCount, setTodayOrdersCount] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [todayCustomersCount, setTodayCustomersCount] = useState(0);

  // Function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    const orderDate = new Date(date);
    
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    if (!usersLoading && allOrders) {
      // Calculate total revenue from all orders
      const totalRevenueValue = allOrders.reduce(
        (acc, order) => acc + order.totalAmount,
        0
      );
      
      // Calculate today's revenue
      const todayOrdersRevenue = allOrders
        .filter(order => isToday(order.createdAt))
        .reduce((acc, order) => acc + order.totalAmount, 0);
      
      // Format the revenue using the formatNumber function
      setTotalRevenue(formatNumber(totalRevenueValue));
      setTodayRevenue(todayOrdersRevenue);
    }
    
    if (!ordersLoading && orders) setTotalOrders(formatNumber(orders.length));
    
    if (!adminOrdersLoading && adminOrders) {
      setTotalAdminOrders(adminOrders);
      
      // Calculate orders created today
      const todayOrders = adminOrders.filter((order) =>
        isToday(order.createdAt)
      );
      setTodayOrdersCount(todayOrders.length);
    }
    
    if (!usersLoading && allUsers) {
      setTotalCustomers(formatNumber(allUsers.length));
      
      // Calculate customers created today
      const todayUsers = allUsers.filter(user => isToday(user.createdAt));
      setTodayCustomersCount(todayUsers.length);
    }
  }, [
    allProducts,
    totalRevenue,
    totalOrders,
    isLoading,
    ordersLoading,
    orders,
    allUsers,
    usersLoading,
    allOrders,
    adminOrders,
    adminOrdersLoading,
  ]);

  // Dashboard state variables removed as they're now handled in AdminLayout

  return (
    <>
      {/* Cards */}
      <div className="cards flex flex-row gap-4">
        <Cards
          title="Total Revenue"
          value={`₹ ${totalRevenue}`}
          percentage={formatNumber(todayRevenue)}
        />
        <Cards
          title="Total Orders"
          value={totalAdminOrders.length}
          percentage={todayOrdersCount}
        />
        <Cards 
          title="Total Customers" 
          value={totalCustomers} 
          percentage={todayCustomersCount} 
        />
      </div>

      {/* Chart */}
      <div className=" p-4 mt-5 dark:bg-gray-800 bg-gray-100 rounded-md shadow-md">
        <LineChart
          xAxis={[
            {
              data: !graphLoading
                ? dailyUserCounts.map((item) => {
                    const [_, month, day] = item.date.split("-");
                    return `${day}/${month}`;
                  })
                : [],
              scaleType: "point",
            },
          ]}
          series={[
            {
              data: !graphLoading
                ? dailyUserCounts.map((item) => item.count)
                : [],
              label: <div className="dark:text-white text-black">Users</div>,
              color: "blue",
              labelMarkType: "circle",
            },
            {
              data: !graphLoading
                ? dailyOrderCounts.map((item) => item.count)
                : [],
              label: <div className="dark:text-white text-black">Orders</div>,
              color: "yellow",
              labelMarkType: "circle",
            },
          ]}
          height={300}
          width={1100}
          sx={{
            ".MuiChartsAxis-tickLabel": {
              fill: "#99a1af !important",
            },
            ".MuiChartsAxis-line": {
              stroke: "#99a1af !important",
            },
            ".MuiChartsAxis-tick": {
              stroke: "#99a1af !important",
            },
            ".MuiChartsAxis-label": {
              fill: "#99a1af !important",
            },
            ".MuiChartsAxis-labelText": {
              fill: "#99a1af !important",
            },
          }}
        />
      </div>

      {/* Users Records Table */}
      <div className="UsersRecordsTable mt-5 dark:bg-gray-800 bg-gray-100 rounded-md shadow-md p-3">
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
              {!usersLoading &&
                allUsers.map((user) => {
                  return (
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
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm opacity-50">
                              Since{" "}
                              {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="">
                        <span className="">{user.email}</span>
                        <br />
                        <span className="badge dark:badge-primary badge-secondary badge-sm">
                          {user.phone}
                        </span>
                      </td>
                      <td>
                        {
                          allOrders.filter(
                            (order) =>
                              order.userId.toString() === user._id.toString()
                          ).length
                        }
                      </td>
                      <th>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          ₹{" "}
                          {formatNumber(
                            allOrders
                              .filter(
                                (order) =>
                                  order.userId.toString() ===
                                  user._id.toString()
                              )
                              .reduce(
                                (acc, order) => acc + order.totalAmount,
                                0
                              )
                          )}
                        </p>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const Cards = ({ title, value, percentage }) => {
  // Convert percentage to number if it's a string with suffixes like K, M, B
  const getNumericValue = (value) => {
    if (typeof value === 'number') return value;
    
    if (typeof value === 'string') {
      // Remove any non-numeric characters except decimal point and negative sign
      const numStr = value.replace(/[^0-9.-]/g, '');
      return parseFloat(numStr);
    }
    
    return 0;
  };
  
  const numericPercentage = getNumericValue(percentage);
  
  const percentageColor =
    numericPercentage > 0
      ? "text-green-500 dark:text-green-500"
      : "text-red-500 dark:text-red-500";
  const percentageIcon =
    numericPercentage > 0 ? (
      <FaArrowUp className={percentageColor} size={16} />
    ) : (
      <FaArrowDown className={percentageColor} size={16} />
    );
  
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
          <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            +{percentage}
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
