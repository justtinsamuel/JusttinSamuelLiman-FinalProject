import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [availableModules, setAvailableModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");

  // Fetch course detail
  const fetchCourseDetail = async () => {
    try {
      const res = await axiosInstance.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      console.error("Failed to fetch course detail:", err);
    }
  };

  // Fetch all modules
  const fetchModules = async () => {
    try {
      const res = await axiosInstance.get("/modules");
      setAvailableModules(res.data);
    } catch (err) {
      console.error("Failed to fetch modules:", err);
    }
  };

  useEffect(() => {
    fetchCourseDetail();
    fetchModules();
  }, [id]);

  // Handle add module
  const handleAddModule = async () => {
    if (!selectedModuleId) return alert("Pilih module dulu!");
    try {
      await axiosInstance.post("/course-modules", {
        CourseId: course.id,
        ModuleId: selectedModuleId,
      });
      setSelectedModuleId("");
      fetchCourseDetail();
    } catch (err) {
      console.error("Error adding module:", err);
    }
  };

  // Handle delete module
  const handleDeleteModule = async (courseModuleId) => {
    if (!window.confirm("Yakin mau hapus module ini dari course?")) return;
    try {
      await axiosInstance.delete(`/course-modules/${courseModuleId}`);
      fetchCourseDetail();
    } catch (err) {
      console.error("Error deleting module:", err);
    }
  };

  if (!course)
    return <p className="text-gray-600 text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white">
      {/* Judul */}
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>

      {/* Instructor */}
      {course.Employer && (
        <p className="mb-6">
          <span className="font-semibold">Instructor:</span>{" "}
          {course.Employer.name}
        </p>
      )}

      {/* Modules */}
      <h2 className="text-xl font-semibold mb-3">Modules</h2>
      {course.CourseModules?.length === 0 ? (
        <p className="text-gray-500 italic mb-4">Belum ada module.</p>
      ) : (
        <ul className="space-y-3 mb-6">
          {course.CourseModules?.map((cm) => (
            <li
              key={cm.id}
              className="flex justify-between items-start bg-gray-50 px-3 py-2 rounded-lg border"
            >
              <div>
                <p className="font-medium text-blue-600">{cm.Module.title}</p>
                <ul className="ml-6 list-disc text-gray-700">
                  {cm.Module.Checkpoints?.map((cp) => (
                    <li key={cp.id}>{cp.title}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleDeleteModule(cm.id)}
                className="ml-4 px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add Module */}
      <div className="mb-8 flex items-center">
        <select
          value={selectedModuleId}
          onChange={(e) => setSelectedModuleId(e.target.value)}
          className="border px-2 py-1 rounded mr-2 flex-1"
        >
          <option value="">-- Select Module --</option>
          {availableModules.map((mod) => (
            <option key={mod.id} value={mod.id}>
              {mod.title}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddModule}
          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Module
        </button>
      </div>

      {/* Enrolled Students */}
      <h2 className="text-xl font-semibold mb-2">Enrolled Students</h2>
      {course.Enrollments?.length === 0 ? (
        <p className="text-gray-500 italic mb-6">Belum ada mahasiswa.</p>
      ) : (
        <ul className="list-disc list-inside mb-6">
          {course.Enrollments?.map((enr) => (
            <li key={enr.id}>
              {enr.User.name}{" "}
              <span className="text-gray-500">({enr.User.email})</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tombol Back */}
      <button
        onClick={() => navigate("/courses")}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-medium"
      >
        ← Back to Courses
      </button>
    </div>
  );
}
