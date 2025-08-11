import React, { useContext, useEffect, useState } from "react";
import Header from "../resuablecomp/Header";
import Footer from "../resuablecomp/Footer";
import { GiPlantSeed } from "react-icons/gi";
import { useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddToCard = () => {
  const { cartItems, setCartItems } = useCart();
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const [ordering, setOrdering] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const navigate = useNavigate();

  // Fetch cart from backend on mount or user change
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?._id) return;


      setLoadingCart(true);
      try {
        const res = await axios.get(
          `https://eb-project-backend-kappa.vercel.app/api/v0/plants/getCart/${user._id}`
        );
        // Expecting res.data.cartItems to be an array of items with consistent keys
        // console.log("Cart fetched from backend:", res.data.data);
        setCartItems(res.data.data || []);
        // console.log("Set cart items to:", res.data.cartItems)
      } catch (err) {
        console.error("Failed to fetch cart from API", err);
        toast.error("Failed to load cart from server.");
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, [user?._id, setCartItems]);
  console.log("Cart Items in AddToCard:", cartItems);

  // Delete cart item by plantId
  const handleDeleteItem = async (plantId, userId) => {
    // if (!user?._id || !plantId) return;
    console.log(userId) 
    console.log(plantId)
    try {
     const response = await axios.delete(
        `https://eb-project-backend-kappa.vercel.app/api/v0/plants/removeFromCart/${userId}/${plantId}`
      );
      console.log(response)
      setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== plantId));
      toast.success("Item removed from cart.");
    } catch (err) {
      console.error("Delete failed", err); 
      toast.error("Failed to remove item from cart.");
    }
  };

  // Increment quantity locally
  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCartItems(updatedCart);
  };

  // Decrement quantity locally (minimum 1)
  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  // Calculate total amount
  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (parseInt(item.price, 10) || 0) * (item.quantity || 1),
      0
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Place order handler
  const handleOrderNow = async () => {
    if (!isAuthenticated || !user?._id) {
      toast.error("🚫 Please log in to place an order.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("🛒 Your cart is empty.");
      return;
    }

    setOrdering(true);
    try {
      // Build payload with product info including quantity and price
      const products = cartItems.map(item => ({
        productId: item._id || item.id || item.plantId,
        quantity: item.quantity || 1,
        price: item.price,
      }));

      const payload = {
        userId: user._id,
        products,
        totalAmount: calculateTotal(),
        status: "pending",
      };

      console.log("Order Payload:", payload);

      const res = await fetch(
        "https://eb-project-backend-kappa.vercel.app/api/v0/orders/createOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      toast.success("✅ Order placed successfully!");
      handleClearCart();
      navigate("/history");
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("🚫 Something went wrong while placing the order.");
    } finally {
      setOrdering(false);
    }
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

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/history")}
            className="px-4 py-2 border border-white text-white rounded hover:bg-[#2c352b] transition"
          >
            🕘 History
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {cartItems?.map((project, index) => ( 
                <div
                  key={project._id || project.id || index}
                  className="bg-[#2c352b] rounded-xl p-4 border border-white/20 flex items-center gap-4"
                >
                  <img
                    src={project.image || "/plant-placeholder.png"}
                    alt={project.plantname || project.name || "Plant image"}
                    className="w-20 h-20 object-cover rounded-lg border border-white/10"
                  />

                  <div className="flex-1 space-y-1">
                    <h2 className="text-lg font-semibold text-white">
                      {project.plantname || project.name}
                    </h2>
                    <p className="text-sm text-white/60">
                      Type: {project.type || "N/A"}
                    </p>
                    <p className="font-medium text-green-300">
                      Rs.{" "}
                      {(parseInt(project.price, 10) || 0) * (project.quantity || 1)}
                      /-
                      <span className="text-sm text-white/50">
                        {" "}
                        ({parseInt(project.price, 10) || 0} × {project.quantity || 1})
                      </span>
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="bg-white text-black px-2 rounded hover:bg-gray-300"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="w-6 text-center">{project.quantity || 1}</span>
                      <button
                        onClick={() => handleIncrement(index)}
                        className="bg-white text-black px-2 rounded hover:bg-gray-300"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteItem(project.plantId._id, project.userId)}
                    className="text-red-400 hover:text-red-600 text-xl"
                    title="Remove item"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))}
            </div>

            <div className="text-xl font-bold text-green-300 mb-6">
              Total: Rs. {calculateTotal()}/-
            </div>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 border border-white rounded hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handleOrderNow}
                disabled={ordering}
                className={`px-4 py-2 border border-white rounded transition ${
                  ordering ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                }`}
              >
                {ordering ? "Ordering..." : "Order Now"}
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
