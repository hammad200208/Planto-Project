import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../resuablecomp/Header";
import Footer from "../resuablecomp/Footer";
import { toast } from "react-toastify";

// React Icons
import { FaBoxOpen } from "react-icons/fa";
import { FaUserAlt, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";

const OrderHistory = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = localStorage.getItem("lastOrderId");
        if (!orderId) {
          toast.error("⚠️ No recent order found.");
          setLoading(false);
          return;
        }

        console.log("📦 Fetching order with ID:", orderId);

        const res = await axios.get(
          `https://eb-project-backend-kappa.vercel.app/api/v0/orders/getOrder/${orderId}`
        );

        console.log("✅ Order API Response:", res.data);

        setOrder(res.data?.data?.order || null);
      } catch (error) {
        console.error("❌ Failed to fetch order history:", error);
        toast.error(error.response?.data?.message || "Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  if (loading) return <p className="text-center text-white">⏳ Loading order...</p>;

  if (!order) return <p className="text-center text-white">⚠️ No order history found.</p>;

  return (
    <div className="bg-[#151d14] min-h-screen text-white">
      <Header />
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FaBoxOpen className="text-green-400" /> Order History
        </h2>

        {/* Order Details */}
        <div className="bg-[#2c352b] p-6 rounded-lg shadow-md border border-white/20 space-y-3 mb-8">
          <p className="flex items-center gap-2">
            <AiOutlineNumber className="text-green-400" /> <strong>Order ID:</strong> {order._id}
          </p>
          <p className="flex items-center gap-2">
            <FaUserAlt className="text-green-400" /> <strong>Customer:</strong> {order.customer?.name || order.customer}
          </p>
          <p className="flex items-center gap-2">
            <FaUserAlt className="text-green-400" /> <strong>Email:</strong> {order.customer?.email || "N/A"}
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineAttachMoney className="text-green-400" /> <strong>Total:</strong> Rs. {order.total}
          </p>
          <p className="flex items-center gap-2">
            <BiPurchaseTagAlt className="text-green-400" /> <strong>Status:</strong> {order.status}
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-400" /> <strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Products List Styled Like Cart */}
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <BiPurchaseTagAlt className="text-green-400" /> Ordered Products
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {order.products?.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#2c352b] p-4 rounded-xl shadow-md border border-white/20 flex flex-col items-center"
            >
              {/* Product Image */}
              {p.product?.image && (
                <img
                  src={p.product.image}
                  alt={p.product.plantname}
                  className="w-32 h-32 object-cover rounded-lg mb-3"
                />
              )}

              {/* Product Info */}
              <h4 className="text-lg font-semibold">{p.product?.plantname}</h4>
              <p className="text-sm text-gray-300">{p.product?.type}</p>
              <p className="mt-2 font-medium">Rs. {p.product?.price}</p>

              {/* Quantity */}
              <div className="mt-3 bg-[#3a4639] px-4 py-1 rounded-lg flex items-center gap-2">
                <AiOutlineNumber /> Quantity: {p.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
