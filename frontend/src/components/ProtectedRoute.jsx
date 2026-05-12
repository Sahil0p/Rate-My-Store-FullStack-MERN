import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "OWNER") return <Navigate to="/owner/dashboard" replace />;
    if (user.role === "USER") return <Navigate to="/user/stores" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
