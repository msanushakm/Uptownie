import './Checkout.css'
import { useEffect, useState } from "react";
import axios from "axios";

function Checkout(){
    const [cart, setCart] = useState([]);
    const [payment, setPayment] = useState("");
    
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const BASE_URL =
  window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://uptownie.onrender.com";
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem(`cart_${user?.email}`) || "[]");

        axios.get(`${BASE_URL}/products`)
            .then(res => {
                const updatedCart = cartData.map(item => {
                    const product = res.data.find(p => p._id === item.productId);
                    return {
                        ...product,
                        quantity: item.quantity,
                        size: item.size
                    };
                });
                setCart(updatedCart);
            })
            .catch(err => console.log(err));
    }, []);

    const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity),0);
    
    const placeOrder = async () => {
        const cartData = JSON.parse(localStorage.getItem(`cart_${user?.email}`) || "[]");

        const address = {
            name: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            pincode: document.getElementById("pincode").value
        };

        if (!payment) {
            alert("Select payment method");
            return;
        }

        const order = {
            userId: user.email,
            cart: cartData,
            address: address,
            total: total,
            payment: payment,
            status: payment === "COD" ? "Confirmed" : "Pending",
            date: new Date().toISOString()
        };

        if (payment === "COD") {
            try {
                const response = await axios.post(`${BASE_URL}/orders`, order);
                localStorage.removeItem(`cart_${user.email}`);
                alert("Order placed successfully!");
                window.location.href = "/";
            } catch (err) {
                console.error(err);
                alert("Something went wrong! Please try again.");
            }
        } else {
            localStorage.setItem("pendingOrder", JSON.stringify(order));
            window.location.href = "/payment";
        }
    };

    return(
        <>
        <div className="checkout_container">
            <div className="billing">
                <h2>Billing Details</h2>
                <input type='text' id='fullname' placeholder="Full Name" defaultValue={user.firstName + " " + user.secondName}/>
                <div className="row">
                <input type='email' id='email' placeholder="Email" value={user.email || ""} readOnly/>
                <input type='tel' id='phone' maxLength="10" placeholder="Phone" required/>
                </div>
                <input type='text' id='address' placeholder="Address" required/>
                <div className="row">
                <input type='text' id='city' placeholder="City" required/>
                <input type='text' id='state' placeholder="State" required/>
                </div>
                <input type='text' id='pincode' placeholder="Pincode" required/>
            </div>

            <div className="summary">
                <h3>Order Summary</h3>
                {cart.map((item, index) => (
                    <div key={index} className="summary_item">
                    <p>{item.name || "Product"}</p>
                    <span>Qty: {item.quantity}</span>
                    <span>₹{item.price || 0}</span>
                    </div>
                ))}
                <hr />
                <h4>Total: ₹{total}</h4>
                <hr />
                <div className='payment'>
                <h4>Payment Method</h4>
                <input type="radio" name="payment" id="cod" value="COD" onChange={(e)=>setPayment(e.target.value)}/><label>COD</label>
                <input type="radio" name="payment" id="upi" value="Razorpay" onChange={(e)=>setPayment(e.target.value)}/><label>Razorpay</label>
                </div>
                <button onClick={placeOrder} className="place_order">Place Order</button>
            </div>
        </div>
        </>
    )
}

export default Checkout;
