// src/pages/Modules.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchModules,
  addModule,
  updateModule,
  deleteModule,
} from "../store/slices/modulesSlice";
import { fetchCourses } from "../store/slices/coursesSlice";

export default function Modules() {
  const dispatch = useDispatch();
  const { items: modules, loading, error } = useSelector((state) => state.modules);
  const { items: courses } = useSelector((state) => state.courses);

  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchModules());
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, CourseId: courseId };
    if (editingId) {
      dispatch(updateModule({ id: editingId, data }));
      setEditingId(null);
    } else {
      dispatch(addModule(data));
    }
    setTitle("");
    setCourseId("");
  };

  const handleEdit = (module) => {
    setEditingId(module.id);
    setTitle(module.title);
    setCourseId(module.CourseId);
  };

  const handleDelete = (id) => {
    dispatch(deleteModule(id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Modules</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-2">Loading...</p>}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Module title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {editingId ? "Update Module" : "Add Module"}
        </button>
      </form>

      {/* List */}
      <div className="grid gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
          >
            <div>
              <h2 className="font-semibold text-lg">{module.title}</h2>
              <p className="text-sm text-gray-500">
                Course:{" "}
                {courses.find((c) => c.id === module.CourseId)?.title ||
                  `ID ${module.CourseId}`}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(module)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(module.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
