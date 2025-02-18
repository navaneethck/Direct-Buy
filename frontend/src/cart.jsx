
import { useState } from "react";
import { useCart } from "./cartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleAddress = () => {
    if (!address.trim()) {
      setError("Please enter your address");
    } else {
      setError(""); 
      console.log("Proceeding to payment...");
      navigate('/checkout')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="p-6 max-w-2xl w-full bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4 flex">
                <img src={item.url} alt={item.alt} className="w-24 h-24 object-cover mr-4" />
                <div className="ml-20">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Price: ${item.price}</p>

                  <div className="flex mt-2">
                    <label className="block mt-2">Size -</label>
                    <select className="border p-2 rounded">
                      <option value="6">uk-6</option>
                      <option value="7">uk-7</option>
                      <option value="8">uk-8</option>
                      <option value="9">uk-9</option>
                      <option value="10">uk-10</option>
                    </select>
                  </div>

                  <button onClick={() => removeFromCart(item.name)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Address Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <button
          onClick={handleAddress}
          className={`mt-4 px-4 py-2 rounded ${
            address.trim() ? "bg-gray-400 hover:bg-gray-700 text-white cursor-pointer" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!address.trim()} 
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;

