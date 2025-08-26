import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect ke login page
  };

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="font-bold">
        <Link to="/">LMS</Link>
      </h1>
      {isAuthenticated ? (
        <div className="flex gap-4 items-center">
          <span>Hi, {user?.name || user?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
