import { useParams, useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewProduct.css";

function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/viewProduct/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <h2>No Products Here</h2>;

  return (
    <div className="view-container">
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      <h1>{product.name}</h1>
      <img
        src={`http://localhost:3001/upload/${product.image}`}
        alt={product.name} className="view-img"/>
      <h2>₹{product.price}</h2>
      <p>{product.description}</p>  
    </div>
  );
}

export default ViewProduct;