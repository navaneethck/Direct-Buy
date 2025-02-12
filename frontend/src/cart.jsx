

const CartPage = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="p-6 max-w-2xl w-full bg-white rounded-lg shadow-lg ">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        
        {/* Cart Items */}
        <div>
          <div className="border p-4 rounded-lg mb-4 flex">
            {/* Product Image */}
            <img 
              src="image"
              alt="image"
              className="w-24 h-24 object-cover mr-4" 
            />
            
            <div className="ml-20">
              <h3 className="font-semibold">name</h3>
              <p>Price: $XX.XX</p>
              
              {/* Size Selection */}
              <div className="flex mt-2">
              <label className="block mt-2">Size-</label>
              <select className="border p-2 rounded">
                <option value="6">uk-6</option>
                <option value="7">uk-7</option>
                <option value="8">uk-8</option>
                <option value="9">uk-9</option>
                <option value="10">uk-10</option>
              </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Address Section */}
        <div className="mt-6 ">
          <h3 className="text-lg font-semibold mb-2  ">Delivery Address</h3>
          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="Enter your delivery address"
          ></textarea>
        </div>
        
        <button
          className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
        >
          Proceed to Payment
        </button>
      </div>
      </div>
    );
  };
  
  export default CartPage;
  