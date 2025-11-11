import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRole }) {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // 🚫 If no user or no token → send back to login
  if (!storedUser || !token) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(storedUser);

  // 🚫 If allowedRole exists and does NOT match → block access
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PrivateRoute;
