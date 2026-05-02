import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import './AddProduct.css'
function UpdateProduct(){
    const {id}=useParams();
    const[product, setProduct]=useState({
        name:"",
        price:"",
        description:"",
        image:null,
    });
    const navigate = useNavigate();
    const BASE_URL =
        window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://uptownie.onrender.com";
    useEffect(()=>{
        axios.get(`${BASE_URL}/products/${id}`)
        .then(result => {
            setProduct(result.data);
        })
        .catch((err)=>console.log(err))
    
    },[id]);

    const handleChange=async(e)=>{
        setProduct({...product,[e.target.name]:e.target.value});
    }

    const handleImage=async(e)=>{
        setProduct({...product,image:e.target.files[0]});
    }

    const handleUpdate=async(e)=>{
            e.preventDefault()
            const formData = new FormData()
            formData.append("name", product.name)
            formData.append("price", product.price)
            formData.append("description", product.description)
            formData.append("image", product.image)

            try {
                await axios.put(`${BASE_URL}/admin/updateProduct/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                });

                alert("Product updated successfully");
                navigate("/manageProduct");
            } catch (error) {
                console.log(error);
            }
            }
    return(
        <>
        <div className="page-containerrr">
        <h1>Edit Product</h1> 
        <div className='form-card'>
        <form onSubmit={handleUpdate}>
                <input type="text" 
                name="name" 
                id="name" 
                className='input'
                value={product.name}
                onChange={handleChange}/><br/><br/>

                <input 
                type="text" 
                name="price" 
                id="price" 
                className='input'
                value={product.price}
                onChange={handleChange}/><br/><br/>

                <input 
                type="text" 
                name="description" 
                id="description" 
                className='input'
                value={product.description}
                onChange={handleChange}/><br/>

                <label className="file-label">Upload Product Image</label>
                <input 
                type="file" 
                accept='image/*'
                name="image" 
                id="image"  
                className='input' 
                onChange={handleImage}/><br/><br/>
                
                <input 
                type="submit" 
                value="Edit Product" 
                className='submit-btn'/>
        </form>
        </div>
        </div>
        </>
    )
}
export default UpdateProduct;
