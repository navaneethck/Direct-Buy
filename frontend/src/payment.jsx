
import { useCart } from "./cartContext";

const PaymentPage = () => {
  const { cart } = useCart();
  const TotalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const payNow = async () => {
    try {
      // Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
  
      script.onload = async () => {
        if (!window.Razorpay) {
          alert("Razorpay SDK failed to load. Check your internet connection.");
          return;
        }
  
        // Create order on backend
        const response = await fetch( `${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: TotalPrice, currency: "INR", receipt: "receipt#1", notes: {} }),
        });
  
        const order = await response.json();
  
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay key
          amount: order.amount,
          currency: order.currency,
          name: "Direct Buy",
          description: "Test Transaction",
          order_id: order.id, // Order ID from backend
          prefill: {
            name: "Your Name",
            email: "your.email@example.com",
            contact: "9999999999",
          },
          theme: { color: "#F37254" },
          handler: function (response) {
            fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "ok") {
                  window.location.href = `${
                    import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"
                  }/success`;
                  
                } else {
                  alert("Payment verification failed!");
                }
              })
              .catch((error) => {
                console.error("Error verifying payment:", error);
                alert("Error verifying payment!");
              });
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
  
      document.body.appendChild(script);
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Payment failed!");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="p-6 max-w-2xl w-full bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <p className="text-gray-600">Total Amount: <span className="font-bold">INR {TotalPrice}</span></p>
        </div>

        <button
          className="w-full mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          onClick={payNow}
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
