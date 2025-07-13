import { useEffect, useState } from "react";
import { GetAllAddresses } from "../../API/GET-SWR/deliveryAddress";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import { createOrder } from "../../API/POST-Axios/order";
import { mutate } from "swr";
import { useParams } from "react-router-dom";
import api from "../../API/POST-Axios/apiConfig";
// Address Component
const AddressSection = ({
  deliveryAddresses,
  selectedAddress,
  setSelectedAddress,
  onNext,
}) => {
  const handleAddressChange = (e) => {
    const address = deliveryAddresses.find(
      (address) => address._id === e.target.value
    );
    if (address) setSelectedAddress(address);
  };

  return (
    <div className="border p-5 rounded-md">
      <h2 className="text-lg font-semibold text-success mb-4">Address</h2>
      <div className="addresses">
        {deliveryAddresses &&
          deliveryAddresses.map((address) => (
            <div className="address1" key={address._id}>
              <h3 className="text-lg">{address.name}</h3>
              <div className="flex gap-3 my-1">
                <input
                  type="radio"
                  name="address-radio"
                  className="radio radio-success"
                  value={address._id}
                  onChange={handleAddressChange}
                />
                <div>
                  <p className="text-sm">{address.address}</p>
                  <p className="text-sm">
                    {address.city}, {address.state}, {address.zipCode}
                  </p>
                  <p className="text-sm">{address.phone}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        className="btn btn-sm px-8 btn-warning text-sm ml-auto block mt-4"
        onClick={onNext}
        disabled={selectedAddress === null}
      >
        Order Summary
      </button>
    </div>
  );
};

// Order Summary Component
const OrderSummarySection = ({ stateCart, onBack, onNext }) => {
  return (
    <div className="border p-5 rounded-md">
      <h2 className="text-lg font-semibold text-success mb-4">Order Summary</h2>
      <div className="order-summary flex flex-col gap-3">
        {stateCart.products.map((product) => {
          if (!product || !product.productId) return null;
          const item = product.productId;

          return (
            <div
              className="order-summary-item md:w-[90%] w-full border-b border-gray-300 pb-5"
              key={product._id}
            >
              <div className="items flex md:gap-20 gap-5 justify-between">
                <div className="image">
                  <img
                    src={
                      item && item.images && item.images.length > 0
                        ? item.images[0]
                        : "https://placehold.co/200"
                    }
                    alt="product"
                    className="md:w-20 md:h-20 rounded-md"
                  />
                </div>
                <div className="details flex flex-col gap-2 justify-start flex-1">
                  <h3 className="md:text-lg text-sm font-semibold">
                    {item && item.name ? item.name : "Product"}
                  </h3>
                  <p className="text-sm">Quantity: {product.quantity}</p>
                  <p className="text-sm">
                    Price: {item && item.price ? item.price : "0"}
                  </p>
                </div>

                <div className="prices flex flex-col gap-2">
                  <p className="text-md line-through text-rose-500 ">
                    ₹
                    {item && item.price
                      ? item.price * product.quantity
                      : "0"}
                  </p>
                  <p className="text-md text-success">
                    ₹
                    {item && item.price
                      ? item.price * product.quantity - item.discount
                      : "0"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row gap-5 mt-5 justify-end">
        <button
          className="btn btn-sm px-8 btn-ghost btn-outline text-sm"
          onClick={onBack}
        >
          Back
        </button>

        <button
          className="btn btn-sm md:px-8 px-3 btn-warning text-sm"
          onClick={onNext}
        >
          Payment Method
        </button>
      </div>
    </div>
  );
};

// Payment Method Component
const PaymentMethodSection = ({
  paymentMethod,
  setPaymentMethod,
  onBack,
  onPayment,
}) => {
  return (
    <div className="border p-5 rounded-md">
      <h2 className="text-lg font-semibold text-success mb-4">
        Payment Method
      </h2>
      <div className="payment-method flex flex-col gap-3">
        <div className="payment-method-item flex gap-3 my-1">
          <input
            type="radio"
            name="payment-radio"
            className="radio radio-success"
            onClick={() => setPaymentMethod("UPI")}
            value="UPI"
          />
          <h3 className="text-lg">UPI</h3>
        </div>
        <div className="payment-method-item flex gap-3 my-1">
          <input
            type="radio"
            name="payment-radio"
            className="radio radio-success"
            onClick={() => setPaymentMethod("Debit / Credit Card")}
            value="Debit / Credit Card"
          />
          <h3 className="text-lg">Debit / Credit Card</h3>
        </div>
        <div className="payment-method-item flex gap-3 my-1">
          <input
            type="radio"
            name="payment-radio"
            className="radio radio-success"
            onClick={() => setPaymentMethod("Cash on Delivery")}
            value="Cash on Delivery"
          />
          <h3 className="text-lg">Cash on Delivery</h3>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="btn btn-sm px-8 btn-ghost btn-outline text-sm"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className={`btn btn-sm md:px-8 px-3 text-sm ${
            paymentMethod === "Cash on Delivery" ? "btn-success" : "btn-warning"
          }`}
          disabled={paymentMethod === null}
          onClick={onPayment}
        >
          {paymentMethod === "Cash on Delivery"
            ? "Place Order"
            : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

// Checkout Page (Main Component)
export const CheckOut = () => {
  const { source } = useParams();
  const navigate = useNavigate();

  const [checkoutProducts, setCheckoutProducts] = useState({});

  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { stateCart, isLoading: cartLoading } = useCartContext();
  const { deliveryAddresses, error } = GetAllAddresses();
  const {
    setCartProducts,
    setTotalAmount,
    setDeliveryAddress,
    setPaymentMethod: setPaymentMethodContext,

  } = useOrder();

  useEffect(() => {
    if (!cartLoading && stateCart) {
      if (source && source !== "cart") {
        // Make sure stateCart.products exists and is an array before using find
        if (stateCart.products && Array.isArray(stateCart.products)) {
          const product = stateCart.products.find((product) => 
            // Add null checks to prevent errors when accessing nested properties
            product && product.productId && product.productId._id === source
          );
          
          if (product && product.productId) {
            setCheckoutProducts({
              products: [product],
              totalPrice: (product.productId.price * product.quantity) - (product.productId.discount * product.quantity),
              userId: stateCart.userId,
            });
          } else {
            // If product not found, use entire cart as fallback
            setCheckoutProducts(stateCart);
            console.log("Product not found for source:", source);
          }
        } else {
          setCheckoutProducts(stateCart);
        }
      } else {
        setCheckoutProducts(stateCart);
      }
    }
  }, [source, stateCart, cartLoading]);
  // console.log("checkoutProducts", checkoutProducts);

  // If cart is loading, show a loading indicator
  if (cartLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4">Loading cart data...</p>
      </div>
    );
  }

  // If cart is empty, show a message
  if (!stateCart || !stateCart.products || stateCart.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  // If there is an error, show a message
  if (error && !cartLoading)
    toast.error("Error fetching data, please check your internet connection");

  // Handle payment
  const handlePlaceOrder = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select a delivery address");
        setCurrentStep(1);
        return;
      }

      if (!paymentMethod) {
        toast.error("Please select a payment method");
        return;
      }

      const totalAmount = checkoutProducts.totalPrice + checkoutProducts.totalPrice * 0.18 + 10;

      const products = checkoutProducts.products.map((product) => {
        if (!product || !product.productId) {
          console.error("Invalid product in cart:", product);
          throw new Error("Invalid product in cart");
        }
        
        return {
          productId: product.productId._id,
          quantity: product.quantity,
        };
      });

      // Set the order data in the context state
      setCartProducts(products);
      setTotalAmount(totalAmount);
      setDeliveryAddress(selectedAddress);
      setPaymentMethodContext(paymentMethod);

      // Navigate to payment page
      if (paymentMethod === "UPI" || paymentMethod === "Debit / Credit Card") {
        navigate(`/payment/${totalAmount}`);
      } else if (paymentMethod === "Cash on Delivery") {
        console.log("Payment Method", paymentMethod);
        const responseOrder = await createOrder(products, totalAmount, selectedAddress._id, paymentMethod);
        if (responseOrder && responseOrder.status === 200) {
          toast.success("Order Placed Successfully");
          if(checkoutProducts.products.length === 1){
            await api.get(`/cart/remove-cart-item/${checkoutProducts.products[0].productId._id}`);
          }
            mutate("/cart/get-cart-items");
            navigate("/");
        } else {
          toast.error("Error in placing order");
        }
      } else {
        toast.error("Please select a valid payment method");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing your order. Please try again.");
    }
  };

  // Render the checkout page
  return (
    <div className="mainContainer flex flex-col md:flex-row gap-8 my-5 p-5">
      {/* Step by step sections */}
      <div className="dark:bg-gray-800 bg-base-100 md:w-[70%] w-full">
        <h2 className="text-2xl font-bold my-5 text-center">Checkout</h2>

        {/* Progress indicator */}
        <div className="flex justify-between mb-6 md:px-10 px-5">
          <div
            className={`step-item ${
              currentStep >= 1
                ? "text-success text-xs md:text-lg font-bold"
                : "text-gray-500"
            }`}
          >
            1. Address
          </div>
          <div
            className={`step-item ${
              currentStep >= 2
                ? "text-success text-xs md:text-lg font-bold"
                : "text-gray-500"
            }`}
          >
            2. Order Summary
          </div>
          <div
            className={`step-item ${
              currentStep >= 3
                ? "text-success text-xs md:text-lg font-bold"
                : "text-gray-500"
            }`}
          >
            3. Payment
          </div>
        </div>

        {/* Render current step */}
        {currentStep === 1 && (
          <AddressSection
            deliveryAddresses={deliveryAddresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <OrderSummarySection
            stateCart={checkoutProducts}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <PaymentMethodSection
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onBack={() => setCurrentStep(2)}
            onPayment={handlePlaceOrder}
          />
        )}
      </div>

      {/* Summary */}
      <div className="summaryContainer md:w-[30%] w-full h-[420px] rounded-md dark:bg-gray-800 bg-base-100 p-5">
        <h2 className="text-2xl font-bold text-center">Order Summary</h2>
        <div className="pricecontent flex flex-col gap-3 text-lg mt-5">
          <div className="summary-item flex justify-between px-8">
            <h3 className="">Subtotal</h3>
            <p className="text-sm">₹{checkoutProducts.totalPrice}</p>
          </div>
          <div className="summary-item flex justify-between px-8">
            <h3 className="">Shipping</h3>
            <p className="text-sm">₹10</p>
          </div>
          <div className="summary-item flex justify-between px-8 mb-5">
            <h3 className="">GST (18%)</h3>
            <p className="text-sm">₹{(checkoutProducts.totalPrice * 0.18).toFixed(2)}</p>
          </div>
          <hr />
        </div>

        <div className="summary-total flex justify-between px-8 mt-5">
          <h3 className="text-lg font-semibold text-success">Total</h3>
          <p className="text-lg font-semibold text-success">
            ₹{(checkoutProducts.totalPrice + checkoutProducts.totalPrice * 0.18 + 10).toFixed(2)}
          </p>
        </div>

        <div className="summarybtn w-full px-5 mt-5 flex flex-col gap-5">
          {currentStep === 3 && (
            <button
              className={`btn btn-sm px-8 text-sm ${
                paymentMethod === "Cash on Delivery"
                  ? "btn-success"
                  : "btn-warning"
              }`}
              disabled={paymentMethod === null}
              onClick={handlePlaceOrder}
            >
              {paymentMethod === "Cash on Delivery"
                ? "Place Order"
                : "Proceed to Payment"}
            </button>
          )}
          <button
            className="btn btn-sm py-5 btn-ghost btn-outline text-sm"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
