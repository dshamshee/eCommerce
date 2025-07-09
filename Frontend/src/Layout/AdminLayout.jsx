import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaBox,
  FaMoneyBill,
  FaTruck,
  FaPercentage,
  FaBullhorn,
  FaChartLine,
  FaSignOutAlt,
  FaPlus,
  FaQuestionCircle,
  FaMoneyBillWave,
  FaMoneyCheck,
  FaFirstOrder,
} from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (currentPath === "/admin") return "dashboard";
    if (currentPath === "/admin/products-list") return "products";
    if (currentPath === "/admin/add-product") return "add-product";
    if (currentPath === "/admin/orders/1") return 'orders';
    if (currentPath === "/admin/analytics") return 'analytics';
    // Add more path mappings as needed
    return "";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  // Handle tab change and navigation
  const handleTabChange = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="mainContainer w-[100%] h-[100vh] fixed flex flex-row dark:bg-gray-900 bg-gray-50">
      {/* Menu */}
      <div className="Menu w-[20%] p-4 dark:bg-gray-800 bg-gray-100 shadow-md  flex flex-col gap-2">
        {/* Dashboard */}
        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-300">
          General
        </h1>
        <hr className="border-gray-300 dark:border-gray-600" />
        <nav className="space-y-2">
          <button
            onClick={() => handleTabChange("dashboard", "/admin")}
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
            onClick={() => handleTabChange("products", "/admin/products-list/1")}
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
            onClick={() => handleTabChange("add-product", "/admin/add-product")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "add-product"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaPlus className="mr-3" />
            Add Product
          </button>
          <button
            onClick={() => handleTabChange("customers", "/admin/orders/1")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "customers"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaFirstOrder className="mr-3" />
            Orders
          </button>
          <button
            onClick={() => handleTabChange("analytics", "/admin/analytics")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "analytics"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaChartLine className="mr-3" />
            Analitics
          </button>
          {/* <button
            onClick={() => handleTabChange("marketing", "#")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "marketing"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaBullhorn className="mr-3" />
            Marketing
          </button> */}
          <button
            onClick={() => handleTabChange("reviews", "#")}
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
            onClick={() => handleTabChange("payments", "#")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "payments"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaMoneyCheck className="mr-3" />
            Payments
          </button>
          {/* <button
            onClick={() => handleTabChange("shippings", "#")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "shippings"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaTruck className="mr-3" />
            Shippings
          </button> */}
          <button
            onClick={() => handleTabChange("taxes", "#")}
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
            onClick={() => handleTabChange("refunds", "#")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "refunds"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaMoneyBillWave className="mr-3" />
            Refunds
          </button>
          <button
            onClick={() => handleTabChange("helpCenter", "#")}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "helpCenter"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaQuestionCircle className="mr-3" />
            Help Center
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              handleTabChange("logout", "/login");
            }}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === "logout"
                ? "bg-rose-500 dark:bg-indigo-900/40 text-white dark:text-indigo-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="Content w-[80%] p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};