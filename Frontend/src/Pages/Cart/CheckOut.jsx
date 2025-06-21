import { useState } from "react";
import { GetAllAddresses } from "../../API/GET-SWR/deliveryAddress";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CheckOut = () => {
  const navigate = useNavigate();
  const [firstChecked, setFirstChecked] = useState(true);
  const [secondChecked, setSecondChecked] = useState(false);
  const [thirdChecked, setThirdChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { stateCart, isLoading: cartLoading } = useCartContext();
  const { deliveryAddresses, error, isLoading } = GetAllAddresses();
  // if(!isLoading) console.log(deliveryAddresses);
  // if(!cartLoading) console.log(stateCart);

  if (!stateCart || !stateCart.products || stateCart.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button className="btn btn-primary">Continue Shopping</button>
      </div>
    );
  }
  if(error && !cartLoading) toast.error("Error fetching data, please check your internet connection");

  const handleFirstClick = () => {
    console.log("First click");
    setSecondChecked(true);
    setThirdChecked(false);
    setFirstChecked(false);
  };

  const handleSecondClick = () => {
    console.log("Second click");
    setFirstChecked(false);
    setSecondChecked(false);
    setThirdChecked(true);
  };

  const handleBackToAddress = () => {
    setFirstChecked(true);
    setSecondChecked(false);
    setThirdChecked(false);
  };

  const handlePayment = () => {
    if (paymentMethod === "UPI" || paymentMethod === "Debit / Credit Card"){
      navigate(`/payment/${stateCart.totalPrice}`);
    }
    else if (paymentMethod === "Cash on Delivery") {
      console.log("Cash on Delivery");
      toast.success("Order Placed Successfully");
    } else toast.error("Please select a payment method");
  };

  // const handlePaymentMethodClick = (e) => {
  //   setPaymentMethod(e.target.value);
  // };


  const handleAddressChange = (e)=>{
    const address = deliveryAddresses.find(address => address._id === e.target.value);
    if(address) setSelectedAddress(address);
  }

  return (
    <div className="mainContainer flex flex-col md:flex-row gap-8 my-5 p-5">
      {/* Accordion */}
      <div className="join join-vertical dark:bg-gray-800 bg-base-100 w-[70%]">
        <h2 className="text-2xl font-bold my-5 text-center">Checkout</h2>

        {/* Address */}
        <div
          className={`collapse collapse-arrow join-item border-base-300 border`}
        >
          <input
            type="radio"
            name="my-accordion-4"
            checked={firstChecked}
            onChange={() => toast.warning("Click on Proceed to Payment")}
          />
          <div className="collapse-title font-semibold">
            <h2
              className={`text-lg ${
                firstChecked ? "text-success" : "text-gray-500"
              }`}
            >
              Address
            </h2>
          </div>
          <div className="collapse-content text-sm">
            <div className="addresses">
              {!isLoading &&
                deliveryAddresses &&
                deliveryAddresses.map((address) => {
                  return (
                    <div className="address1" key={address._id}>
                      <h3 className="text-lg">{address.name}</h3>
                      <div className="flex gap-3 my-1">
                        <input
                          type="radio"
                          name="radio-7"
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
                  );
                })}
            </div>
            <button
              className="btn btn-sm px-8 btn-warning text-sm ml-[80%]"
              onClick={handleFirstClick}
              disabled={!selectedAddress}
            >
              Order Summary
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div
          className={`collapse collapse-arrow join-item border-base-300 border`}
        >
          <input
            type="radio"
            name="my-accordion-4"
            checked={secondChecked}
            onChange={() => toast.warning("Click on Order Summary")}
          />
          <div className="collapse-title font-semibold">
            <h2
              className={`text-lg ${
                secondChecked ? "text-success" : "text-gray-500"
              }`}
            >
              Order Summary
            </h2>
          </div>

          <div className="collapse-content text-sm">
            <div className="order-summary flex flex-col gap-3">
              {stateCart.products.map((product) => {
                if (!product || !product.productId) return null;
                const item = product.productId;

                return (
                  <div
                    className="order-summary-item w-[90%] border-b border-gray-300 pb-5"
                    key={product._id}
                  >
                    <div className="items flex gap-20 justify-between">
                      <div className="image">
                        <img
                          src={
                            item && item.images && item.images.length > 0
                              ? item.images[0]
                              : "https://placehold.co/200"
                          }
                          alt="product"
                          className="w-20 h-20 rounded-md"
                        />
                      </div>
                      <div className="details flex flex-col gap-2 justify-start flex-1">
                        <h3 className="text-lg">
                          {item && item.name ? item.name : "Product"}
                        </h3>
                        <p className="text-sm">Quantity: {product.quantity}</p>
                        <p className="text-sm">
                          Price: {item && item.price ? item.price : "0"}
                        </p>
                        {/* <p className="text-sm">Discount: {item && item.discount ? item.discount : "0"}</p> */}
                      </div>

                      <div className="prices flex flex-col gap-2">
                        <p className="text-md line-through text-rose-500 ">
                          ₹
                          {item && item.price
                            ? item.price * product.quantity + item.discount
                            : "0"}
                        </p>
                        <p className="text-md text-success">
                          ₹
                          {item && item.price
                            ? item.price * product.quantity - item.discount
                            : "0"}
                        </p>
                        {/* <p className="text-sm">₹{item && item.price ? item.price * product.quantity+item.discount : "0"}</p> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row gap-5 mt-5 ml-[60%]">
              <button
                className="btn btn-sm px-8 btn-ghost btn-outline text-sm"
                onClick={handleBackToAddress}
              >
                Back
              </button>

              <button
                className="btn btn-sm px-8 btn-warning text-sm"
                onClick={handleSecondClick}
              >
                Payment Method
              </button>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div
          className={`collapse collapse-arrow join-item border-base-300 border`}
        >
          <input
            type="radio"
            name="my-accordion-4"
            checked={thirdChecked}
            onChange={() => toast.warning("Click on Payment Method")}
          />
          <div className="collapse-title font-semibold">
            <h2
              className={`text-lg ${
                thirdChecked ? "text-success" : "text-gray-500"
              }`}
            >
              Payment Method
            </h2>
          </div>
          <div className="collapse-content text-sm">
            <div className="payment-method flex flex-col gap-3">
              <div className="payment-method-item flex gap-3 my-1">
                <input
                  type="radio"
                  name="radio-7"
                  className="radio radio-success"
                  onClick={()=>setPaymentMethod("UPI")}
                  value="UPI"
                />
                <h3 className="text-lg">UPI</h3>
              </div>
              <div className="payment-method-item flex gap-3 my-1">
                <input
                  type="radio"
                  name="radio-7"
                  className="radio radio-success"
                  onClick={()=>setPaymentMethod("Debit / Credit Card")}
                  value="Debit / Credit Card"
                />
                <h3 className="text-lg">Debit / Credit Card</h3>
              </div>
              <div className="payment-method-item flex gap-3 my-1">
                <input
                  type="radio"
                  name="radio-7"
                  className="radio radio-success"
                  onClick={()=>setPaymentMethod("Cash on Delivery")}
                  value="Cash on Delivery"
                />
                <h3 className="text-lg">Cash on Delivery</h3>
              </div>
            </div>
            <div className="flex flex-row gap-5 ml-[68%]">
              <button
                className="btn btn-sm px-8 btn-ghost btn-outline text-sm"
                onClick={handleFirstClick}
              >
                Back
              </button>
              <button
                className={`btn btn-sm px-8 text-sm ${
                  paymentMethod === "Cash on Delivery"
                    ? "btn-success"
                    : "btn-warning"
                }`}
                disabled={paymentMethod === ""}
                onClick={handlePayment}
              >
                {paymentMethod === "Cash on Delivery"
                  ? "Place Order"
                  : "Proceed to Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="summaryContainer w-[30%] h-[420px] rounded-md dark:bg-gray-800 bg-base-100 p-5">
        <h2 className="text-2xl font-bold text-center">Order Summary</h2>
        <div className="pricecontent flex flex-col gap-3 text-lg mt-5">
          <div className="summary-item flex justify-between px-8">
            <h3 className="">Subtotal</h3>
            <p className="text-sm">₹{stateCart.totalPrice}</p>
          </div>
          <div className="summary-item flex justify-between px-8">
            <h3 className="">Shipping</h3>
            <p className="text-sm">₹10</p>
          </div>
          <div className="summary-item flex justify-between px-8 mb-5">
            <h3 className="">GST (18%)</h3>
            <p className="text-sm">₹{stateCart.totalPrice * 0.18}</p>
          </div>
          <hr />
        </div>

        <div className="summary-total flex justify-between px-8 mt-5">
          <h3 className="text-lg font-semibold text-success">Total</h3>
          <p className="text-lg font-semibold text-success">
            ₹{stateCart.totalPrice + stateCart.totalPrice * 0.18}
          </p>
        </div>

        <div className="summarybtn w-full px-5 mt-5 flex flex-col gap-5">
          <button className="btn btn-sm py-5 btn-primary text-sm ">
            Place Order{" "}
          </button>
          <button className="btn btn-sm py-5 btn-ghost btn-outline  text-sm ">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
