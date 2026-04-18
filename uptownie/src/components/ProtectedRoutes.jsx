import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ adminOnly = false, userOnly = false }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly) {
    return user.role === "admin"
      ? <Outlet />
      : <Navigate to="/" replace />;
  }

  if (userOnly) {
    return user.role === "admin"
      ? <Navigate to="/admin" replace />
      : <Outlet />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;