import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
        <div id="first">
            <a href="#">Get 15% OFF YOUR ORDER ABOVE ₹1499 WITH CODE LOVE15!</a>
        </div>
        <div id="div2nd">
            <div><h1>UPTOWNIE</h1></div>
            <div id="icondiv"> 
                <div id="userdiv">
                    {user ? (
                        <>
                            <FaUser />
                            <span>{user.firstName} {user.secondName}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login">
                            <FaUser />
                        </Link>
                    )}
                </div>
                <div id="myprofile"><Link to="/myProfile">
                <span id="my-profile">My Profile</span>
                </Link></div> 
                <div id="cartdiv" style={{cursor:'pointer'}}><Link to="/addtocart"><FaCartPlus/></Link></div> 
            </div> 
        </div>
        <div id="div3">
            <ul>
            <li className="dropdown">
                <Link to="/">Home</Link>
            </li>
            <li className="dropdown">
                <Link to="/newinCards">New In</Link>
            </li>
            <li>
                <Link to="/lovedCards">Most Loved</Link>
            </li>
            <li className="dropdown">
                <Link to="/shirtCards">Shirts</Link>
            </li>
            <li className="dropdown">
                <Link to="/topCards">Tops</Link>
            </li>
            <li className="dropdown">
                <Link to="/dressCards">Dresses</Link>
            </li>
            <li className="dropdown">
                <Link to="/coordCards">Co-ords</Link>
            </li>
            <li><Link to="/swimCards">Swim</Link></li>
            </ul>
        </div>
        </>
    );
}

export default Navbar;