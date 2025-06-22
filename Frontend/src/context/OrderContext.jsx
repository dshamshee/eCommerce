import { createContext, useContext } from "react";
import { useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  
    // Hold the order data in the context state
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  return (
    <OrderContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        totalAmount,
        setTotalAmount,
        deliveryAddress,
        setDeliveryAddress,
        paymentMethod,
        setPaymentMethod,
        orderId,
        setOrderId,
        paymentId,
        setPaymentId,
        paymentStatus,
        setPaymentStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  return useContext(OrderContext);
};
