import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../resuablecomp/Header";
import Footer from "../resuablecomp/Footer";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCartItems } = useCart();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [ordering, setOrdering] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const selectedItems = location.state?.selectedCartItems || [];

  // ✅ Safe total calculation
  const calculateTotal = () =>
    selectedItems.reduce((sum, item) => {
      const price = Number(item.price || item.plantId?.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);

  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !user?._id) {
      toast.error("🚫 Please log in to place an order.");
      return;
    }
    if (selectedItems.length === 0) {
      toast.error("🛒 No products selected.");
      return;
    }
    if (!paymentMethod) {
      toast.error("💳 Please select a payment method.");
      return;
    }

    setOrdering(true);
    try {
      const payload = {
        userId: user._id,
        products: selectedItems.map((item) => ({
          product:
            typeof item.plantId === "object" ? item.plantId._id : item.plantId,
          quantity: item.quantity || 1,
        })),
        total: calculateTotal(),
        status: "pending",
      };

      const orderRes = await axios.post(
        "https://eb-project-backend-kappa.vercel.app/api/v0/orders/createOrder",
        payload
      );

      console.log("📦 Create Order API Response:", orderRes.data);

      const orderId =
        orderRes.data?.data?.order?._id ||
        orderRes.data?.order?._id ||
        orderRes.data?.orderId ||
        orderRes.data?._id ||
        null;

      if (!orderId) throw new Error("Order ID not returned");

      localStorage.setItem("lastOrderId", orderId);
      toast.success("✅ Order created successfully!");

      // Payment handling
      if (paymentMethod === "cod") {
        await axios.post(
          "https://eb-project-backend-kappa.vercel.app/api/v0/payments/cod",
          { orderId }
        );
        toast.success("📦 Cash on Delivery selected. Order confirmed!");
        navigate("/history");
      } else if (paymentMethod === "stripe") {
        const paymentRes = await axios.post(
          "https://eb-project-backend-kappa.vercel.app/api/v0/payments/stripe/create-intent",
          { orderId, currency: "usd" }
        );
        toast.info("💳 Stripe payment intent created (test mode).");
        console.log("Stripe Client Secret:", paymentRes.data?.clientSecret);
      } else if (paymentMethod === "easypaisa") {
        const paymentRes = await axios.post(
          "https://eb-project-backend-kappa.vercel.app/api/v0/payments/easypaisa/initiate",
          { orderId }
        );
        toast.info("📲 Easypaisa payment initiated.");
        console.log("Easypaisa Response:", paymentRes.data);
      } else if (paymentMethod === "jazzcash") {
        const paymentRes = await axios.post(
          "https://eb-project-backend-kappa.vercel.app/api/v0/payments/jazzcash/initiate",
          { orderId }
        );
        toast.info("📲 JazzCash payment initiated.");
        console.log("JazzCash Response:", paymentRes.data);
      }

      // 🔥 Clear ordered items from cart (state + storage)
      setCartItems((prev) => {
        const updatedCart = prev.filter(
          (cartItem) => !selectedItems.some((sel) => sel._id === cartItem._id)
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });
    } catch (err) {
      toast.error(`🚫 ${err.response?.data?.message || err.message}`);
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div className="bg-[#151d14]">
      <Header />
      <div className="min-h-screen bg-[#151d14] text-white flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold mb-6">Confirm Your Order</h1>

        {/* Items Card */}
        <div className="bg-[#2c352b] p-6 rounded-lg shadow-lg w-96 border border-white/20 mb-4">
          {selectedItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b border-white/10 py-2"
            >
              <span>{item.plantId?.name || item.name}</span>
              <span>Rs. {item.price || item.plantId?.price}</span>
            </div>
          ))}
          <p className="mt-4 text-lg">
            Total Amount:{" "}
            <span className="text-green-300">Rs. {calculateTotal()}/-</span>
          </p>

          {/* Payment Method */}
          <div className="mt-6 space-y-3">
            {["cod", "stripe", "easypaisa", "jazzcash"].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="capitalize">
                  {method === "cod"
                    ? "Cash on Delivery"
                    : method === "stripe"
                    ? "Stripe (Test Mode)"
                    : method === "easypaisa"
                    ? "Easypaisa"
                    : "JazzCash"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={handlePlaceOrder}
          disabled={ordering}
          className={`px-4 py-2 border border-white rounded w-96 transition ${
            ordering
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600 hover:border-green-400"
          }`}
        >
          {ordering ? "Placing Order..." : "Place Order"}
        </button>

        <button
          onClick={() => navigate("/AddToCard")}
          className="mt-4 px-4 py-2 border border-gray-400 rounded w-96 hover:bg-gray-700 transition"
        >
          Back to Cart
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
