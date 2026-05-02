import { useEffect, useState } from 'react';
import './ManageProduct.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
function ManageProduct(){
    const [products,setProducts]=useState([])
    const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://uptownie.onrender.com";
    useEffect(()=>{
        axios.get(`${BASE_URL}/products`)
        .then(result => setProducts(result.data))
        .catch(err=>console.log(err))
    
    },[])
    
    const deleteProduct=(id)=>{
        axios.delete(`${BASE_URL}/deleteProduct/${id}`)
        .then(res=>{console.log(res)
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }
    return(
        <>
        <div className="manage-product">
        <h1>Manage Products</h1>

        <div className="table-container">
            <table className="product-table">
            <thead>
                <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product) => (
                <tr key={product._id}>
                    <td>
                    <img src={product.image} alt="product" className="product-img" />
                    </td>

                    <td>{product.name}</td>

                    <td>₹{product.price}</td>

                    <td>
                    <span className="category-tag">{product.category}</span>
                    </td>

                    <td className="desc">
                    {product.description.slice(0, 40)}...
                    </td>

                    <td>
                    <div className="actions">
                        <Link to={`/admin/updateProduct/${product._id}`}>
                        <button className="btn edit">Edit</button>
                        </Link>

                        <button
                        className="btn delete"
                        onClick={() => deleteProduct(product._id)}
                        >
                        Delete
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
export default ManageProduct;
