import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {FaSearch} from "react-icons/fa";
import axios from "axios"
import './ShirtCards.css'

function LovedCards(){
    const [products, setProducts] = useState([])
    const [searchKey,setSearchKey]=useState("")
    const navigate=useNavigate()
    const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://uptownie.onrender.com";
    useEffect(()=>{
    axios.get(`${BASE_URL}/products/category/most_loved`)
    .then(res=>{
    setProducts(res.data)
    })

    },[])

    const handleSearch=async(e)=>{
        const value=e.target.value;
        setSearchKey(value)
        if (value===""){
            axios.get(`${BASE_URL}/products/category/most_loved`)
            .then(res => setProducts(res.data))
        }else{
            try {
                const res=await axios.get(`${BASE_URL}/products/search/most_loved/${value}`)
                setProducts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <>
        <div id="searchdiv" style={{cursor:'pointer'}} >
                        <input className="search-bar" 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder="Search Products..."
                        value={searchKey}
                        onChange={handleSearch}/>
                        <FaSearch className="search-icon"/>
                    </div>
        <div className="productContainer">
        {products.map((product)=>(        
        <div className="cardd" onClick={() => {navigate(`/productDetails/${product._id}`)}} style={{cursor:"pointer"}}>
            <img src={`${BASE_URL}/upload/${product.image}`}/>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>₹{product.price}</h4>
        </div>
        ))}

        </div>
        </>
    )
}
export default LovedCards;
