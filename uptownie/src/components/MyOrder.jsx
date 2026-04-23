import "./MyOrder.css";
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link,useNavigate} from "react-router-dom";
function MyOrders(){
    const [orders,setOrders]=useState([])
    const navigate = useNavigate();
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.get(`https://uptownie.onrender.com/orders/${user.email}`)
        .then(result => {
            setOrders(result.data);
        })
        .catch(err => console.log("API error:", err));

    }, []);
    return(
        <>
        <div className="h1">
            <h1>My Orders</h1>
        </div>
        <div className="myorder-box"> 
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>  
        <table border={2}>
                <thead>
                    <tr>
                    <th>Order #</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Address</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((orders)=>{
                            return <tr key={orders._id}>
                            <td>{orders._id}</td>
                            <td>
                                {orders.cart.map((item, i) => (
                                    <div key={i} className="product-item">
                                    <div>
                                        Product ID: {item.productId} <br />
                                        Size: {item.size} | Qty: {item.quantity} <br />
                                        <Link to={`/ViewProduct/${item.productId}`}>
                                        <button className="view-btn">View Product</button>
                                        </Link>
                                        <hr />
                                    </div>
                                    </div>
                                ))}
                                </td>
                            <td>{orders.total}</td>
                            <td>{orders.address.name}  <br />
                             {orders.address.address},{orders.address.city},{orders.address.state}-{orders.address.pincode} <br />
                             Phone No: {orders.address.phone}
                            </td>
                            <td>{orders.status}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
        </>
    )
}
export default MyOrders;
