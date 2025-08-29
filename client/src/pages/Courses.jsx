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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-2">Loading...</p>}

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
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
    </div>
  );
}
