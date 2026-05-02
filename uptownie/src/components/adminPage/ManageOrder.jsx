import './ManageOrder.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
function ManageOrder(){
    const [orders,setOrders]=useState([])
    const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://uptownie.onrender.com";
    useEffect(()=>{
        axios.get(`${BASE_URL}/orders`)
        .then(result => setOrders(result.data))
        .catch(err=>console.log(err))
    
    },[])

    const handleActionRemove=(id)=>{
        axios.delete(`${BASE_URL}/deleteOrders/${id}`)
        .then(res=>{console.log(res)
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const res = await axios.put(`${BASE_URL}/orders/${orderId}`, { status: newStatus });
            setOrders(prev =>
                prev.map(order => order._id === orderId ? { ...order, status: res.data.status } : order)
            );
            
        } catch (err) {
            console.error("Failed to update order status", err);
            alert("Failed to update status");
        }
    };
    
    return(
        <>
        <div className="manage-orders">
        <h1>Manage Orders</h1>

        <div className="table-container">
            <table className="order-table">
            <thead>
                <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Products</th>
                <th>Total</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {orders.map((order) => (
                <tr key={order._id}>
                    <td>{order._id.slice(-6)}</td>

                    <td>{order.userId}</td>

                    <td>
                    {order.cart.map((item, i) => (
                        <div key={i} className="product-item">
                        <b>ID:</b> {item.productId} <br />
                        Size: {item.size} | Qty: {item.quantity}
                        </div>
                    ))}
                    </td>

                    <td>₹{order.total}</td>

                    <td>
                    {order.address.name} <br />
                    {order.address.address}, {order.address.city} <br />
                    {order.address.state} - {order.address.pincode} <br />
                    {order.address.phone}
                    </td>

                    <td>
                    <span className={`status ${order.status?.toLowerCase()}`}>
                        {order.status}
                    </span>
                    </td>

                    <td>
                    <div className="actions">
                        <button onClick={() => handleStatusUpdate(order._id, "Shipped")} className="btn shipped">
                        Shipped
                        </button>

                        <button onClick={() => handleStatusUpdate(order._id, "Delivered")} className="btn delivered">
                        Delivered
                        </button>

                        <button onClick={() => handleActionRemove(order._id)} className="btn remove">
                        Remove
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
        </>
    )
}
export default ManageOrder;
