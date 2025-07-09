import { useEffect } from "react";
import { createOrder, setPaymentDetails } from "../../API/POST-Axios/payment";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import { createOrder as createOrderAPI } from "../../API/POST-Axios/order";

export const MakePayment = () => {
  const {amount} = useParams();
  // const [responseId, setResponseId] = useState("");
  const navigate = useNavigate();

  const {cartProducts, totalAmount, deliveryAddress, paymentMethod} = useOrder();

  // Load the Razorpay SDK
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
      handler: async function (response) {
        // setResponseId(response.razorpay_payment_id);
        console.log(response);

        // Create the order in the database
        const responseOrder = await createOrderAPI(cartProducts, totalAmount, deliveryAddress._id, paymentMethod);
        if(responseOrder.status === 200){
          console.log("Order created successfully");
          const responsePayment = await setPaymentDetails(response.razorpay_payment_id, responseOrder.data.order._id);
          if(responsePayment.status === 200){
            console.log("Payment details set successfully");
            navigate("/");
            window.location.reload();
          }else{
            console.log("Error in setting payment details");
          }
        }else{
          console.log("Error in creating order");
        }
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
    <div className="mainContainer flex justify-center items-center h-[60vh]">
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  );
};
