import React, { useContext, useEffect, useState } from "react";
import Header from "../resuablecomp/Header";
import Footer from "../resuablecomp/Footer";
import { GiPlantSeed } from "react-icons/gi";
import { useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { MdClearAll } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddToCard = () => {
  const { cartItems, setCartItems } = useCart();
  const { user, loading } = useContext(AuthContext);
  const [loadingCart, setLoadingCart] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?._id) return;
      setLoadingCart(true);
      try {
        const res = await axios.get(
          `https://eb-project-backend-kappa.vercel.app/api/v0/plants/getCart/${user?._id}`
        );
        setCartItems(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart from server.");
      } finally {
        setLoadingCart(false);
      }
    };
    fetchCart();
  }, [user?._id, setCartItems]);

  const handleDeleteItem = async (plantId, userId) => {
    try {
      await axios.delete(
        `https://eb-project-backend-kappa.vercel.app/api/v0/plants/removeFromCart/${userId}/${plantId}`
      );
      setCartItems((prev) =>
        prev.filter(
          (item) => (item.plantId?._id || item.plantId) !== plantId
        )
      );
      setSelectedItems((prev) => prev.filter((id) => id !== plantId));
      toast.success("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    }
  };

  const handleIncrement = (i) => {
    const updated = [...cartItems];
    updated[i].quantity = (updated[i]?.quantity || 1) + 1;
    setCartItems(updated);
  };

  const handleDecrement = (i) => {
    const updated = [...cartItems];
    if ((updated[i]?.quantity || 1) > 1) {
      updated[i].quantity -= 1;
      setCartItems(updated);
    }
  };

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const calculateTotal = () =>
    cartItems
      .filter((item) =>
        selectedItems.includes(item.plantId?._id || item.plantId)
      )
      .reduce(
        (sum, item) =>
          sum + (parseInt(item?.price || 0, 10) * (item?.quantity || 1)),
        0
      );

  const handleClearCart = () => {
    setCartItems([]);
    setSelectedItems([]);
  };

  const handleProceedToOrder = () => {
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.plantId?._id || item.plantId)
    );

    if (selectedCartItems.length === 0) {
      toast.error("Please select at least one item to order.");
      return;
    }

    navigate("/order", { state: { selectedCartItems } });
  };

  if (loading || loadingCart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#151d14] text-white">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="bg-[#151d14]">
      <Header />
      <div className="min-h-screen bg-[url('/plantobg.jpg')] bg-cover bg-center px-6 py-12 text-white">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <GiPlantSeed className="text-4xl text-green-400" />
          Added to Cart
        </h1>

        {/* History Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 px-4 py-2 border border-white text-white rounded hover:bg-[#2c352b] transition"
          >
            <FaHistory className="text-lg" />
            History
          </button>
        </div>

        {cartItems?.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {cartItems?.map((project, index) => {
                const plantData =
                  typeof project?.plantId === "object" ? project?.plantId : {};
                const plantId = plantData?._id || project?.plantId;

                return (
                  <div
                    key={plantId || project?._id || index}
                    className="bg-[#2c352b] rounded-xl p-4 border border-white/20 flex items-center gap-4"
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(plantId)}
                      onChange={() => toggleSelect(plantId)}
                      className="w-5 h-5 accent-green-500"
                    />

                    <img
                      src={project?.image || plantData?.image || "/plant-placeholder.png"}
                      alt={
                        project?.plantname ||
                        plantData?.plantname ||
                        project?.name ||
                        "Plant"
                      }
                      className="w-20 h-20 object-cover rounded-lg border border-white/10"
                    />

                    <div className="flex-1 space-y-1">
                      <h2 className="text-lg font-semibold text-white">
                        {project?.plantname || plantData?.plantname || project?.name}
                      </h2>
                      <p className="text-sm text-white/60">
                        Type: {project?.type || plantData?.type || "N/A"}
                      </p>
                      <p className="font-medium text-green-300">
                        Rs.{" "}
                        {(parseInt(project?.price || plantData?.price, 10) || 0) *
                          (project?.quantity || 1)}
                        /-
                        <span className="text-sm text-white/50">
                          {" "}
                          ({parseInt(project?.price || plantData?.price, 10) || 0} ×{" "}
                          {project?.quantity || 1})
                        </span>
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => handleDecrement(index)}
                          className="bg-white text-black px-2 rounded hover:bg-gray-300"
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="w-6 text-center">
                          {project?.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleIncrement(index)}
                          className="bg-white text-black px-2 rounded hover:bg-gray-300"
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteItem(plantId, project?.userId)}
                      className="text-red-400 hover:text-red-600 text-xl"
                      title="Remove item"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="text-xl font-bold text-green-300 mb-6">
              Total: Rs. {calculateTotal()}/-
            </div>
            <div className="flex gap-4 flex-wrap">
              {/* Clear Cart */}
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 px-4 py-2 border border-white rounded hover:bg-red-600 transition"
              >
                <MdClearAll className="text-lg" />
                Clear Cart
              </button>

              {/* Proceed to Order */}
              <button
                onClick={handleProceedToOrder}
                className="flex items-center gap-2 px-4 py-2 border border-white rounded hover:bg-green-600 transition"
              >
                <BsCartCheck className="text-lg" />
                Proceed to Order
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddToCard;
