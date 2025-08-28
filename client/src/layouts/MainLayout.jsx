// src/layouts/MainLayout.jsx
import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/courses" className="hover:underline">Courses</Link>
          <Link to="/modules" className="hover:underline">Modules</Link>
          <Link to="/checkpoints" className="hover:underline">Checkpoints</Link>
          <Link to="/enrollments" className="hover:underline">Enrollments</Link>
          <Link to="/submissions" className="hover:underline">Submissions</Link>
          <Link to="/users" className="hover:underline">Users</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
