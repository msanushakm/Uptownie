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
    const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://uptownie.onrender.com";
    const handleSubmit=(e)=>{
    e.preventDefault()

    const formData = new FormData()

    formData.append("name",name)
    formData.append("price",price)
    formData.append("description",description)
    formData.append("category", category)
    formData.append("image",image)

    axios.post(`${BASE_URL}/addProduct`,formData)
    .then(res=>{
    console.log(res)
    alert("Product Added Successfully")
    navigate("/admin")
    })
    }
    return (
    <>
        <div className="page-containerrr">

        <h1>Add Product</h1>

        <div className="form-card">
            <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Enter product name"
                required
                className="input"
                onChange={(e)=>setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter product price"
                required
                className="input"
                onChange={(e)=>setPrice(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter product description"
                required
                className="input"
                onChange={(e)=>setDescription(e.target.value)}
            />

            <select
                className="input"
                required
                onChange={(e)=>setCategory(e.target.value)}
            >
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
            </select>

            <label className="file-label">Upload Product Image</label>

            <input
                type="file"
                accept="image/*"
                required
                className="input"
                onChange={(e)=>setImage(e.target.files[0])}
            />

            <button type="submit" className="submit-btn">
                Add Product
            </button>

            </form>
        </div>

        </div>
    </>
    );
}
export default AddProduct;
