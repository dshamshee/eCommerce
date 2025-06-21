import { useEffect, useState } from "react";
import { createOrder } from "../../API/POST-Axios/payment";
import { useParams, useNavigate } from "react-router-dom";

export const MakePayment = () => {
  const {amount} = useParams();
  const [responseId, setResponseId] = useState("");
  const navigate = useNavigate();
  const loadScript = async (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorPayOrder = async (amount) => {
    try {
      const data = {
        amount: amount,
        currency: "INR",
      };

      const response = await createOrder(data); // send a request to backend
      if (response.data && response.data.order) {
        handleRazorPayScreen(
          response.data.order.id,
          response.data.order.amount
        );
      } else {
        alert("Error in creating order, please check the server response");
      }
    } catch (error) {
      console.log("Error in creating order", error);
    }
  };

  const handleRazorPayScreen = async (orderId, amount) => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      alert("Razorpay SDK failed to load, please check the console for errors");
      return;
    }

    const options = {
      //   key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      key: "rzp_test_B3a8U66geHkk0M",
      amount: amount,
      currency: "INR",
      name: "Wolvenstitch a clothing brand",
      description: "Payment for order",
      order_id: orderId,
      handler: function (response) {
        alert("Payment Successful click ok to continue shopping");
        setResponseId(response.razorpay_payment_id);
          navigate("/cart");
          window.location.reload();
      },
      prefill: {
        name: localStorage.getItem("userName") || "Customer Name",
        email: localStorage.getItem("userEmail") || "customer@gmail.com",
        contact: localStorage.getItem("userPhone") || "9976543210",
      },
      theme: {
        color: "#ffffff",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    createRazorPayOrder(amount);
  }, [amount]);

  return (
    <div className="mainContainer">
      <h1>Payment{responseId}</h1>
    </div>
  );
};
