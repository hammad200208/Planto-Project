import React, { useContext } from "react";
import Header from "../resuablecomp/Header";
import Footer from "../resuablecomp/Footer";
import { GiPlantSeed } from "react-icons/gi";
import { useCart } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from "react-icons/ai";

const AddToCard = () => {
  const { cartItems, setCartItems } = useCart();
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#151d14] text-white">
        Checking login status...
      </div>
    );
  }

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDeleteItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCartItems(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  const handleOrderNow = async () => {
    if (!isAuthenticated || !user || !user?._id) {
      alert("🚫 Please log in to place an order.");
      return;
    }

    try {
      const userId = user?._id;
      const requests = cartItems?.map((item) => {
        const payload = {
          plantId: item._id || item.plantId || item.id,
          quantity: item.quantity || 1,
          userId,
          price: parseInt(item.price) || 0,
        };

        return fetch("https://eb-project-backend-kappa.vercel.app/api/v0/plants/addToCart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      });

      const responses = await Promise.all(requests);
      const hasError = responses.some((res) => !res.ok);

      if (!hasError) {
        alert("🛒 Order placed successfully!");
        handleClearCart();
      } else {
        alert("⚠️ Some items failed to order.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("🚫 Something went wrong while placing the order.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (parseInt(item.price) || 0) * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="bg-[#151d14]">
      <Header />
      <div className="min-h-screen bg-[url('/plantobg.jpg')] bg-cover bg-center px-6 py-12 text-white">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <GiPlantSeed className="text-4xl text-green-400" />
          Added to Cart
        </h1>

        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {cartItems.map((project, index) => (
                <div
                  key={index}
                  className="bg-[#2c352b] rounded-xl p-4 border border-white/20 flex items-center gap-4"
                >
                  {/* Image */}
                  <img
                    src={project.image || "/plant-placeholder.png"}
                    alt={project.plantname}
                    className="w-20 h-20 object-cover rounded-lg border border-white/10"
                  />

                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <h2 className="text-lg font-semibold text-white">
                      {project.plantname}
                    </h2>
                    <p className="text-sm text-white/60">
                      Type: {project.type || "N/A"}
                    </p>
                    <p className="font-medium text-green-300">
                      Rs. {(parseInt(project.price) || 0) * (project.quantity || 1)}/-
                      <span className="text-sm text-white/50">
                        {" "}({parseInt(project.price) || 0} × {project.quantity || 1})
                      </span>
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="bg-white text-black px-2 rounded hover:bg-gray-300"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="w-6 text-center">{project.quantity}</span>
                      <button
                        onClick={() => handleIncrement(index)}
                        className="bg-white text-black px-2 rounded hover:bg-gray-300"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="text-red-400 hover:text-red-600 text-xl"
                    title="Remove item"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              ))}
            </div>

            {/* Total & Buttons */}
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
                className="px-4 py-2 border border-white rounded hover:bg-green-600 transition"
              >
                Order Now
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
