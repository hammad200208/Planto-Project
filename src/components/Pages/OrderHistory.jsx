import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OrderHistory = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // ✅ Load Cart Items on Mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const storedCart = localStorage.getItem("plantoCart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // ✅ Remove Item from Cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("plantoCart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // ✅ Place Order
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders", {
        items: cartItems,
      });

      toast.success("Order placed successfully!");
      localStorage.removeItem("plantoCart");
      setCartItems([]);
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order");
    }
  };

  // ✅ Fetch Order History
  const fetchOrderHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrderHistory(res.data || []);
      setShowHistory(true);
    } catch (error) {
      console.error("History fetch error:", error);
      toast.error("Failed to fetch order history");
    } finally {
      setLoadingHistory(false);
    }
  };

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <button
              className="text-red-500"
              onClick={() => removeFromCart(item.id)}
            >
              ❌ Remove
            </button>
          </div>
        ))
      )}

      <div className="mt-4 flex gap-3">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={placeOrder}
        >
          ✅ Place Order
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchOrderHistory}
        >
          📜 View Order History
        </button>
      </div>

      {/* ✅ Order History Section */}
      {showHistory && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">📜 Order History</h2>
          {loadingHistory ? (
            <p>Loading...</p>
          ) : orderHistory.length === 0 ? (
            <p>No past orders found.</p>
          ) : (
            orderHistory.map((order, index) => (
              <div
                key={index}
                className="border p-4 mb-2 rounded bg-white shadow"
              >
                <p className="font-semibold">Order #{index + 1}</p>
                <ul className="list-disc ml-5">
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.name} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
