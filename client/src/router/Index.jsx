import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Checkpoints from "../pages/Checkpoints";
import Courses from "../pages/Courses";
import Enrollments from "../pages/Enrollments";
import Modules from "../pages/Modules";
import Submissions from "../pages/Submissions";
import Users from "../pages/Users";

export default function AppRouter() {
  return (
    <Routes>
      {/* Route public */}
      <Route path="/" element={<Auth />} />

      {/* Route dengan MainLayout (navbar tampil) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkpoints" element={<Checkpoints />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enrollments" element={<Enrollments />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}
