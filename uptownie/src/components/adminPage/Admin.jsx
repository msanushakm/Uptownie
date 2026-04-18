import { Link, useNavigate } from "react-router-dom";
import './Admin.css'

function Admin(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return(
        <>
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-side">
                <Link to='/addProduct'><button className="buttons">Add Product</button></Link>
                <Link to='/manageProduct'><button className="buttons">Manage Product</button></Link>
                <Link to='/manageOrder'><button className="buttons">Manage Order</button></Link>
            </div>
        </div>
        </>
    )
}

export default Admin;