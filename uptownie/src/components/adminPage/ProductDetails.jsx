import './ProductDetails.css'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
function ProductDetails(){
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const[myProduct,setMyProduct]=useState([])
    const [selectedSize, setSelectedSize] = useState("M")
    const [selectqnty,setSelectedQnty]=useState(1)
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get('http://localhost:3001/products/'+id)
        .then(result => {
            setProduct(result.data);
        })
        .catch((err)=>console.log(err))
    }, [id])
    
    useEffect(()=>{
        const existingProducts = JSON.parse(localStorage.getItem(`cart_${user?.email}`) || '[]')
        setMyProduct(existingProducts)
    },[])

    const handleAddToCart = (product) => {
        const newProducts = {
            productId: product._id,
            size: selectedSize,
            quantity:selectqnty
        };
        setMyProduct((preProducts) => {
            const updatedProducts = [...preProducts, newProducts];
            localStorage.setItem(`cart_${user?.email}`, JSON.stringify(updatedProducts));
            return updatedProducts;
        });
        alert('product is added to cart.');
    };    
    return(
        <>
        <div className="detailsContainer">
        <img src={`http://localhost:3001/upload/${product?.image}`} />
        <div className="subbcontainer">
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
        <h3>₹{product?.price}</h3>

        <div className="sizeContainer">
        <label>Size: </label>
        <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
        </select>
        </div>
        <div className="sizeContainer">
            <label>Quantity: </label>
            <input type="number" 
            name="qnty" 
            id="qnty" 
            min={1} 
            max={50} 
            value={selectqnty} 
            onChange={(e)=>setSelectedQnty(e.target.value)}/>
        </div>
        <button onClick={()=>handleAddToCart(product)}>
            Add to Cart
        </button>
        </div>
        </div>
        </>
    )
}
export default ProductDetails;