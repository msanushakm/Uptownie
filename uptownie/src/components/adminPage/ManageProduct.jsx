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
        <h1>Manage Product</h1>
        <div className='tb-div'>
            <table className="table-border" border={'1'}>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th colSpan={'2'}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    products.map((products) => {
                       return <tr key={products._id}>
                        <td className='items-center'>{products.name}</td>
                        <td className='items-center'>{products.price}</td>
                        <td className='items-center'>{products.description}</td>
                        <td className='items-center'>{products.category}</td>
                        <td className='items-center'><img className='tb-img' src={`${BASE_URL}/upload/${products.image}`}/></td>
                        <td className='items-center'><Link to={`/updateProduct/${products._id}`}><button className="buttonss">Edit</button></Link></td>
                        <td className='items-center'><button className="buttonss" onClick={(e)=>deleteProduct(products._id)}>Delete</button></td>
                    </tr>
                    })
                }
                </tbody>
            
        </table>
        </div>
        </>
    )
}
export default ManageProduct;
