import { useCart } from "./cartContext";

const PaymentPage = () => {
    const {cart} = useCart()

    const TotalPrice = cart.reduce((sum,item)=> sum + Number(item.price ),0)

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-700">
        <div className="p-6 max-w-2xl w-full bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>
  
          {/* Order Summary */}
          <div className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <p className="text-grey-600">Total Amount: <span className="font-bold">${TotalPrice}</span></p>
          </div>
  
          {/* Payment Methods */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="payment" className="form-radio" />
                <span>UPI Payment</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="payment" className="form-radio" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
  
          {/* Proceed Button */}
          <button className="w-full mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer">
            Proceed to Pay
          </button>
        </div>
      </div>
    );
  };
  
  export default PaymentPage;

