import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Kalau belum login → redirect ke /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kalau sudah login → render children
  return <Outlet />;
}
