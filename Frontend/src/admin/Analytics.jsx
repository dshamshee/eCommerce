import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from "recharts";
import { GetGraphData } from "../API/GET-SWR/user";
import { GetAllOrdersAdmin } from "../API/GET-SWR/order";
import { GetProducts } from "../API/GET-SWR/product";
import { GetAllPayments } from "../API/GET-SWR/Payment";

export const Analytics = () => {
  const { dailyUserCounts, dailyOrderCounts, dailyRevenue, isLoading, error } =
    GetGraphData();
  const { orders, isLoading: ordersLoading } = GetAllOrdersAdmin();
  const {allProducts, isLoading: productsLoading} = GetProducts();
  const {payments, isLoading: paymentsLoading} = GetAllPayments();
  const [chartData, setChartData] = useState([]);
  const [orderPieData, setOrderPieData] = useState([]);
  const [productPieData, setProductPieData] = useState([]);
  const [paymentPieData, setPaymentPieData] = useState([]);


  useEffect(() => {
    // for Area Chart
    if (!isLoading && dailyUserCounts && dailyOrderCounts && dailyRevenue) {
      // Format data for the chart - combine the three arrays into one array of objects
      const formattedData = dailyUserCounts.map((userItem, index) => {
        const orderItem = dailyOrderCounts[index] || { count: 0 };
        const revenueItem = dailyRevenue[index] || { revenue: 0 };

        return {
          date: userItem.date.split("-").reverse().join("-"),
          users: userItem.count,
          orders: orderItem.count,
          revenue: revenueItem.revenue,
        };
      });
      setChartData(formattedData);
    }
    // for Pie Chart for Order Status
    if (!ordersLoading && orders) {
      const delivered = orders.filter(
        (order) => order.status === "Delevered"
      ).length;
      const cancelled = orders.filter(
        (order) => order.status === "Cancelled"
      ).length;
      const confirmed = orders.filter(
        (order) => order.status === "Confirmed"
      ).length;
      const shipped = orders.filter(
        (order) => order.status === "Shipped"
      ).length;
      // const returned = orders.filter((order) => order.status === 'Returned').length;
      setOrderPieData([
        { name: "Delivered", value: delivered },
        { name: "Cancelled", value: cancelled },
        { name: "Confirmed", value: confirmed },
        { name: "Shipped", value: shipped },
        // { name: 'Returned', value: returned },
      ]);
    }

    // for Pie Chart for Product Category
    if (!productsLoading && allProducts) {
      const productCategories = allProducts.map((product) => product.category);
      const productCategoryCounts = productCategories.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
      setProductPieData(Object.entries(productCategoryCounts).map(([category, count]) => ({
        name: category,
        value: count,
      })));
    }

    // for Pie Chart for Payment Method
    if (!paymentsLoading && payments) {
      const paymentMethods = payments.map((payment) => payment.method);
      const paymentMethodCounts = paymentMethods.reduce((acc, method) => {
        acc[method] = (acc[method] || 0) + 1;
        return acc;
      }, {});
      const cashOnDelivery = orders?.filter((order)=> order.paymentMethod === "Cash on Delivery").length || 0;
      paymentMethodCounts["Cash on Delivery"] = cashOnDelivery;
      setPaymentPieData(Object.entries(paymentMethodCounts).map(([method, count]) => ({
        name: method,
        value: count,
      })));
    }
  }, [
    dailyUserCounts,
    dailyOrderCounts,
    dailyRevenue,
    isLoading,
    orders,
    ordersLoading,
    allProducts,
    productsLoading,
    payments,
    paymentsLoading,
  ]);


  const COLORS = ["#00C49F", "#FF8042", "#0088FE", "#FFBB28"];

  return (
    <div className="w-full">
      {/* <h2 className="text-2xl font-bold mb-4 text-center">Last 30 Days Analytics</h2> */}

<div className="pieChart flex items-center">
      {/* Pie Chart for Order Status */}
      <div className="PieChartContainer w-[400px] h-[350px] p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={600} height={600}>
            <Pie
              data={orderPieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {orderPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <h1 className="text-lg opacity-50 font-bold mb-4 text-center dark:text-gray-300 text-gray-600">Order Status</h1>
      </div>

      {/* Pie Chart for Product Category */}
      <div className="PieChartContainer w-[400px] h-[350px] p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={600} height={600}>
            <Pie
              data={productPieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {productPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <h1 className="text-lg opacity-50 font-bold mb-4 text-center dark:text-gray-300 text-gray-600">Product Category</h1>
      </div>

      {/* Pie Chart for Payment Method */}
      <div className="PieChartContainer w-[400px] h-[350px] p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={600} height={600}>
            <Pie
              data={paymentPieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {paymentPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <h1 className="text-lg opacity-50 font-bold mb-4 text-center dark:text-gray-300 text-gray-600">Payment Method</h1>
      </div>

      </div>
      {/* Area Chart */}
      <div className="AreaChartContainer w-full h-[450px] p-4 mt-16 rounded-lg">
      <h1 className="text-lg opacity-50 font-bold text-center dark:text-gray-300 text-gray-600">Last 30 Day users, orders and revenue Data</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            Loading analytics data...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full text-red-500">
            Error loading data
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width="100%"
              height="100%"
              data={chartData}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 50,
              }}
            >
              <CartesianGrid strokeDasharray="0.5 0.5" stroke="gray" />
              <XAxis dataKey="date" stroke="gray" />
              <YAxis stroke="gray" tickCount={10} domain={[0, 40]} />
              <Tooltip
                wrapperStyle={{
                  width: 150,
                  backgroundColor: "#ccc",
                  color: "#000",
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
              {/* <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.3}
              /> */}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
