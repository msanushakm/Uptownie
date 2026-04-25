import { useEffect, useState } from "react";
import './AddToCart.css'
import axios from "axios";
import { Link } from "react-router-dom";

function AddToCart({cartData}){
    const [cart,setCart]=useState([])
    const user = JSON.parse(localStorage.getItem("user"));
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

    const delItem = (index) => {
        const cartData = JSON.parse(localStorage.getItem(`cart_${user?.email}`) || "[]");
        cartData.splice(index, 1);
        localStorage.setItem(`cart_${user?.email}`, JSON.stringify(cartData));
        setCart(prev => prev.filter((_, i) => i !== index));
    };

    const calculatedTotal=()=>{
        return cart.reduce((total,item)=>total+Number(item.price)*Number(item.quantity),0)
    }

    const clearAll = () => {
        localStorage.removeItem(`cart_${user?.email}`);
        setCart([]);                      
        };

    return(
        <>
        <div className="cart_section">
            <h1>Your List</h1>
            <div className="cart_list">
                {cart.map((item,index)=>(
                    <div key={index} className="cart_card">
                    <img 
                        src={item.image} 
                        className="cart_img"/>
                    <div className="cart_details">
                        <h3>{item.name}</h3>
                        <p>
                        Size: {item.size} | Qty: {item.quantity} | ₹{item.price}
                        </p>
                        <button onClick={()=>delItem(index)} className="remove_btn">
                        Remove
                        </button>
                    </div>
                    </div>
                ))}
            </div>
            <div className="cart_summary">
            <h3>Total: ₹{calculatedTotal()}</h3>
            </div>
            <div className="cart-btns">
                <div className="clear-all">
                    <button onClick={()=>clearAll()}>Clear All</button>
                </div>
                <div className="checkout">
                    <Link to='/checkout'><button>Checkout</button></Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default AddToCart;
