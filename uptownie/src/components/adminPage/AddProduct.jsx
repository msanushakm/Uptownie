import './AddProduct.css'
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct(){
    const[name, setName]=useState("");
    const[price,setPrice]=useState("");
    const[description,setDescription]=useState("");
    const [category, setCategory] = useState("");
    const[image,setImage]=useState(null);
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
    e.preventDefault()

    const formData = new FormData()

    formData.append("name",name)
    formData.append("price",price)
    formData.append("description",description)
    formData.append("category", category)
    formData.append("image",image)

    axios.post("http://localhost:3001/addProduct",formData)
    .then(res=>{
    console.log(res)
    alert("Product Added Successfully")
    navigate("/admin")
    })
    }
    return(
        <>
        <h1>Enter Product Details</h1>
        <div className='alignment'>
        <form onSubmit={handleSubmit}>
                <input type="text" 
                name="name" 
                id="name" 
                placeholder="Enter product name" 
                required 
                className='btninput'
                onChange={(e)=>setName(e.target.value)}/><br/><br/>

                <input 
                type="text" 
                name="price" 
                id="price" 
                placeholder="Enter product price" 
                required 
                className='btninput'
                onChange={(e)=>setPrice(e.target.value)}/><br/><br/>

                <input 
                type="text" 
                name="description" 
                id="description" 
                placeholder='Enter product description' 
                required 
                className='btninput'
                onChange={(e)=>setDescription(e.target.value)}/><br/><br />

                <select 
                    name="category"
                    className='btninput'
                    required
                    onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Shirt">Shirt</option>
                    <option value="dress">dress</option>
                    <option value="top">top</option>
                    <option value="skirt">skirt</option>
                    <option value="winter_wear">winter_wear</option>
                    <option value="swim">swim</option>
                    <option value="co_ords">co_ords</option>
                    <option value="most_loved">most_loved</option>
                    <option value="new_in">new_in</option>
                    <option value="three_combo">three_combo</option>
                    <option value="two@999">two@999</option>
                </select><br/><br/>

                <p>'Below upload the product image'</p>
                <input 
                type="file" 
                accept='image/*'
                name="image" 
                id="image"  
                required 
                className='btninput' 
                onChange={(e)=>setImage(e.target.files[0])}/><br/><br/>
                
                <input 
                type="submit" 
                value="Add Product" 
                className='btnsubmit'/>
        </form>
        </div>
        </>
    )
}
export default AddProduct;