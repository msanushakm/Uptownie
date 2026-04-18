import "./Option.css"
import three from "../images/option/three@999.jpg";
import img2 from "../images/option/two@999.jpg";
import { Link } from "react-router-dom";
function Option(){
    return(
        <>
        <div className="text-style">
            <h3>YOU ALWAYS NEED OPTIONS</h3>
        </div>
        <div className="MaiN">
            <div className="Sub">
                <Link to='/threeComboCards'><img src={three} alt="three@1999" /></Link>
                <div className="rate">3 AT ₹1999</div>
            </div>
            <div className="Sub">
                <Link to='/twoJeansCards'><img src={img2} alt="two@999" /></Link>
                <div className="rate">2 AT ₹999</div>
            </div>
        </div>
        </>
    )
}
export default Option;