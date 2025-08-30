// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../store/slices/coursesSlice";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.courses);

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" | "table"

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateCourse({ id: editingId, data: { title } }));
      setEditingId(null);
    } else {
      dispatch(addCourse({ title }));
    }
    setTitle("");
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setTitle(course.title);
  };

  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  const handleView = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-2">Loading...</p>}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white font-medium ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Toggle View */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setViewMode("list")}
          className={`px-3 py-1 rounded ${
            viewMode === "list"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setViewMode("table")}
          className={`px-3 py-1 rounded ${
            viewMode === "table"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Table View
        </button>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <ul className="space-y-2">
          {items.map((course) => (
            <li
              key={course.id}
              className="flex justify-between items-center border p-2 rounded shadow-sm"
            >
              {/* Klik judul course untuk lihat detail */}
              <span
                onClick={() => handleView(course.id)}
                className="cursor-pointer text-blue-600 hover:underline"
              >
                {course.title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleView(course.id)}
                  className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((course) => (
                <tr key={course.id} className="text-center">
                  <td
                    onClick={() => handleView(course.id)}
                    className="px-4 py-2 border cursor-pointer text-blue-600 hover:underline"
                  >
                    {course.title}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleView(course.id)}
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
