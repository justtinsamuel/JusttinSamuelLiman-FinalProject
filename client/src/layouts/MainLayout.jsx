import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // setelah logout langsung ke login
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {isAuthenticated && (
            <Link to="/courses" className="hover:underline">Courses</Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">Hi, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
