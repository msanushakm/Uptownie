import "./Categories.css"
import shirt from "../images/Home/shirt.jpg";
import dress from "../images/Home/dress.jpg";
import top from "../images/Home/top.jpg";
import skirt from "../images/Home/skirt.jpg";
import winter from "../images/Home/winter.jpg";
import swim from "../images/Home/swim.jpg";
import coords from "../images/Home/co-ords.jpg";
import loved from "../images/Home/loved.jpg";
import { Link } from "react-router-dom";
function Categories(){
    return(
        <>
        <div className="mainImageContainer">
            <div className="subImage">
                <Link to='/shirtCards'><img src={shirt} alt="shirts" /></Link>
                <div className="bottom-center">Shirts</div>
            </div>
            <div className="subImage">
               <Link to='/dressCards'><img src={dress} alt="dresses" /></Link>
               <div className="bottom-center">Dresses</div>
            </div>
            <div className="subImage">
                <Link to='/topCards'><img src={top} alt="tops" /></Link>
                <div className="tops">Tops</div>
            </div>
            <div className="subImage">
                <Link to='/skirtCards'><img src={skirt} alt="skirts" /></Link>
                <div className="skirt">Skirts</div>
            </div>
        </div>
        <div className="mainImageContainer">
            <div className="subImage">
                <Link to='/winterCards'><img src={winter} alt="winter" /></Link>
                <div className="winter-wear">Winter Wear</div>
            </div>
            <div className="subImage">
               <Link to='/swimCards'><img src={swim} alt="swim" /></Link>
               <div className="swim">Swim</div>
            </div>
            <div className="subImage">
                <Link to='/coordCards'><img src={coords} alt="co-ords" /></Link>
                <div className="bottom-center">Co-Ords</div>
            </div>
            <div className="subImage">
                <Link to='/lovedCards'><img src={loved} alt="loved" /></Link>
                <div className="loved">Loved & Worn</div>
            </div>
        </div>
        </>
    )
}
export default Categories;