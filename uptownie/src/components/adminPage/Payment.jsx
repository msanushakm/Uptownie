import './Payment.css';
import axios from "axios";

function Payment() {
    const user = JSON.parse(localStorage.getItem("user"));

    const handlePayment = async () => {
        const order = JSON.parse(localStorage.getItem("pendingOrder"));

        if (!order) {
            alert("No order found");
            return;
        }

        const res = await axios.post("http://localhost:3001/create-order", {
            amount: order.total
        });

        const options = {
            key: "rzp_test_SYtv6pmcprXecm",
            amount: res.data.amount,
            currency: "INR",
            name: "Uptownie",
            order_id: res.data.id,

            handler: async function (response) {
                const verifyRes = await axios.post("http://localhost:3001/verify-payment", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                });

                if (verifyRes.data.status === "success") {
                    order.status = "Confirmed";
                    order.payment = "Online";

                    await axios.post("http://localhost:3001/orders", order);

                    localStorage.removeItem("pendingOrder");
                    localStorage.removeItem(`cart_${user.email}`);

                    alert("Payment Successful");
                    window.location.href = "/";
                } else {
                    alert("Payment verification failed");
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="payment_container">
            <h2>Online Payment</h2>
            
            <button onClick={handlePayment} className="pay_btn">
                Pay Now
            </button>
        </div>
    );
}

export default Payment;