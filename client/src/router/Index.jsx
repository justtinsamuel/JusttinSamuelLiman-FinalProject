import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CourseList from "../pages/Courses";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // 🔑 protected route
      {
        element: <PrivateRoute />,
        children: [
          { path: "courses", element: <CourseList /> },
        ],
      },
      // 🔓 public route
      { path: "login", element: <Login /> },
    ],
  },
]);
