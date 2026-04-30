import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>UPTOWNIE</h2>

        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/addProduct">Add Product</Link>
        <Link to="/admin/manageProduct">Manage Product</Link>
        <Link to="/admin/manageOrder">Manage Orders</Link>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="mmain">
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;