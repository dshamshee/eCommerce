import { useEffect, useState } from "react";
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaCog, FaSignOutAlt, FaHome, FaShoppingCart, FaTruck, FaMoneyBill, FaPercentage, FaArrowUp, FaCalendar, FaArrowDown } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { FaBullhorn } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { GetProducts } from "../API/GET-SWR/product";
import { GetAllOrders } from "../API/GET-SWR/order";
import { GetTotalUsers } from "../API/GET-SWR/user";

export const AdminDashboard = ()=>{

    const {allProducts, isLoading} = GetProducts()
    const {orders , isLoading: ordersLoading} = GetAllOrders()
    const {totalUsers, isLoading: usersLoading} = GetTotalUsers()
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const [totalCustomers, setTotalCustomers] = useState(0)
    useEffect(()=>{
        if(!isLoading && allProducts) setTotalRevenue(allProducts.reduce((acc, product)=> acc + product.price, 0))
        if(!ordersLoading && orders) setTotalOrders(orders.length)
        if(!usersLoading && totalUsers) setTotalCustomers(totalUsers)
    },[allProducts, totalRevenue, totalOrders, isLoading, ordersLoading, orders, totalUsers, usersLoading])

    const [activeTab, setActiveTab] = useState('dashboard');
    // const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
      // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // setMobileSidebarOpen(false); // Close sidebar when tab is changed
  };

    return(
        <div className="mainContainer w-[100%] flex flex-row gap-4 p-4 dark:bg-gray-900 bg-gray-50">
            {/* Menu */}
            <div className="Menu w-[20%] p-4 dark:bg-gray-800 bg-gray-100 rounded-md shadow-md h-screen flex flex-col gap-2">

                {/* Dashboard */}
                <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300">General</h1>
                <hr className="border-gray-300 dark:border-gray-600" />
            <nav className="space-y-2">
                <button
                  onClick={() => handleTabChange('dashboard')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaHome className="mr-3" />
                  Dashboard
                </button>
                <button
                  onClick={() => handleTabChange('orders')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'orders' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaShoppingCart className="mr-3" />
                  Orders
                </button>
                <button
                  onClick={() => handleTabChange('customers')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'customers' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaUser className="mr-3" />
                  Customers
                </button>
                <button
                  onClick={() => handleTabChange('analytics')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'analytics' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaChartLine className="mr-3" />
                  Analitics
                </button>
                <button
                  onClick={() => handleTabChange('marketing')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'marketing' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaBullhorn className="mr-3" />
                  Marketing
                </button>
                <button 
                  onClick={() => handleTabChange('reviews')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'reviews' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaComment className="mr-3" />
                  Reviews
                </button>
              </nav>

              {/* Finance */}
              <hr className="border-gray-300 dark:border-gray-600" />
              <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300">Finance</h1>
              <hr className="border-gray-300 dark:border-gray-600" />
              <nav className="space-y-2">
                <button
                  onClick={() => handleTabChange('payments')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'payments' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaMoneyBill className="mr-3" />
                  Payments
                </button>
                <button
                  onClick={() => handleTabChange('shippings')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'shippings' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaTruck className="mr-3" />
                  Shippings
                </button>
                <button
                  onClick={() => handleTabChange('taxes')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'taxes' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaPercentage className="mr-3" />
                  Taxes
                </button>
                <button
                  onClick={() => handleTabChange('refunds')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'refunds' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaChartLine className="mr-3" />
                  Refunds
                </button>
                <button
                  onClick={() => handleTabChange('helpCenter')}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === 'helpCenter' ? 'bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaBullhorn className="mr-3" />
                  Help Center
                </button>
              </nav>

            </div>

            {/* Content */}
            <div className="Content w-[80%] p-4 rounded-md shadow-md">
                <div className="cards flex flex-row gap-4">
                <Cards title="Total Revenue" value={`₹ ${totalRevenue}`} percentage={10} />
                <Cards title="Total Orders" value={totalOrders} percentage={3} />
                <Cards title="Total Customers" value={totalCustomers} percentage={1} />
                </div>
            </div>
        </div>
    )
}



const Cards = ({title, value, percentage})=>{



    const percentageColor = percentage > 0 ? "text-green-500 dark:text-green-500" : "text-red-500 dark:text-red-500";
    const percentageIcon = percentage > 0 ? <FaArrowUp className={percentageColor} size={16} /> : <FaArrowDown className={percentageColor} size={16} />;
    const percentageText = percentage > 0 ? "+" : "";
    return(
        <div className="cardContainer flex flex-col  gap-2 rounded-b-md w-[320px] h-[130px] bg-white dark:bg-gray-800 rounded-md shadow-md">
            <div className="head flex flex-row justify-between items-center px-3 py-1">
                <h1 className=" font-semibold text-gray-700 dark:text-gray-300">{title}</h1>
                <FaChartLine className="text-gray-700 dark:text-gray-300" size={16} />
            </div>
            <div className="middle flex flex-row justify-between items-center px-3">
                <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300">{value}</h1>
                <div className="flex flex-row items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{percentageText}{percentage}</h1>
                {percentageIcon}
                </div>
            </div>
            <div className="foot flex flex-row justify-between items-center mt-6 rounded-b-md px-2 py-1 bg-gray-100 shadow-md dark:bg-gray-700">
                <div className="dates flex flex-row items-center gap-2">
                    <h1 className="text-sm text-gray-700 dark:text-gray-300">Last 30 days</h1>
                    <FaCalendar className="text-gray-700 dark:text-gray-300" />
                </div>
            </div>
        </div>
    )
}