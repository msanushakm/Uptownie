import { useNavigate,Link } from "react-router-dom";
import "./MyProfile.css";

function MyProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className="h1">
        <h1>My Profile</h1>
      </div>

      <div className="profile-box">
        <p><strong>Full Name:</strong> {user?.firstName} {user?.secondName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <div className="profile-btn">
        <button onClick={handleLogout}>Logout</button>
        <Link to='/myOrders'><button>Go to MyOrders</button></Link>
      </div>
    </>
  );
}

export default MyProfile;