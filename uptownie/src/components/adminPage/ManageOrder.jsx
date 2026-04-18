import './ManageOrder.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
function ManageOrder(){
    const [orders,setOrders]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/orders')
        .then(result => setOrders(result.data))
        .catch(err=>console.log(err))
    
    },[])

    const handleActionRemove=(id)=>{
        axios.delete('http://localhost:3001/deleteOrders/'+id)
        .then(res=>{console.log(res)
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const res = await axios.put(`http://localhost:3001/orders/${orderId}`, { status: newStatus });
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
            <table border={2}>
                <thead>
                    <tr>
                    <th>Order #</th>
                    <th>User ID</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((orders)=>{
                            return <tr key={orders._id}>
                            <td>{orders._id}</td>
                            <td>{orders.userId}</td>
                            <td>{orders.cart.map((item, i) => (
                                        <div key={i}>
                                            Product ID: {item.productId} <br /> Size: {item.size} | Qty: {item.quantity}
                                        </div>
                                    ))}
                            </td>
                            <td>{orders.total}</td>
                            <td>{orders.address.name}  <br />
                             {orders.address.address},{orders.address.city},{orders.address.state}-{orders.address.pincode} <br />
                             Phone No: {orders.address.phone}
                            </td>
                            <td>{orders.status}</td>
                            <td>
                                <div>
                                    <button className='action-btn' onClick={()=>handleStatusUpdate(orders._id,"Shipped")} id='shippedbtn'>Shipped</button> <br />
                                    <button className='action-btn' onClick={()=>handleStatusUpdate(orders._id,"Delivered")} id='deliveredbtn'>Delivered</button> <br />
                                    <button className='action-btn-remove' onClick={(e)=>handleActionRemove(orders._id)} id='remobebtn'>Remove</button>
                                </div>
                            </td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}
export default ManageOrder;