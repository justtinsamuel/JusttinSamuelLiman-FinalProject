// src/pages/Modules.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModules, addModule, updateModule, deleteModule } from "../store/slices/modulesSlice";
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Modules</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-2">Loading...</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Module title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-2">
        {modules.map((module) => (
          <li key={module.id} className="flex justify-between items-center border p-2 rounded">
            <span>{`${module.title} (Course ID: ${module.CourseId})`}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(module)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(module.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
