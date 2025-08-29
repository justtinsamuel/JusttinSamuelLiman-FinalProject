import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [availableModules, setAvailableModules] = useState([]); // semua module yang bisa ditambahkan
  const [selectedModuleId, setSelectedModuleId] = useState(""); // module yang dipilih

  // fetch course detail
  const fetchCourseDetail = async () => {
    const res = await axiosInstance.get(`/courses/${id}`);
    setCourse(res.data);
  };

  // fetch semua module
  const fetchModules = async () => {
    const res = await axiosInstance.get("/modules");
    setAvailableModules(res.data);
  };

  useEffect(() => {
    fetchCourseDetail();
    fetchModules();
  }, [id]);

  // handle add module
  const handleAddModule = async () => {
    if (!selectedModuleId) return alert("Pilih module dulu!");
    try {
      await axiosInstance.post("/course-modules", {
        course_id: course.id,
        module_id: selectedModuleId,
      });
      setSelectedModuleId(""); // reset dropdown
      fetchCourseDetail(); // refresh course detail agar module baru muncul
    } catch (err) {
      console.error(err);
    }
  };

  if (!course)
    return <p className="text-gray-600 text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      {/* Judul */}
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-4">{course.description}</p>

      {/* Instructor */}
      {course.Employer && (
        <p className="mb-4">
          <span className="font-semibold">Instructor:</span>{" "}
          {course.Employer.name}
        </p>
      )}

      {/* Modules */}
      <h2 className="text-xl font-semibold mb-2">Modules</h2>
      <ul className="list-disc list-inside mb-4">
        {course.CourseModules?.map((cm) => (
          <li key={cm.id} className="mb-1">
            <span className="font-medium text-blue-600">{cm.Module.title}</span>
            <ul className="ml-6 list-circle text-gray-700">
              {cm.Module.Checkpoints?.map((cp) => (
                <li key={cp.id}>{cp.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Add Module */}
      <div className="mb-4">
        <select
          value={selectedModuleId}
          onChange={(e) => setSelectedModuleId(e.target.value)}
          className="border px-2 py-1 rounded mr-2"
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
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Module
        </button>
      </div>

      {/* Enrolled Students */}
      <h2 className="text-xl font-semibold mb-2">Enrolled Students</h2>
      <ul className="list-disc list-inside mb-4">
        {course.Enrollments?.map((enr) => (
          <li key={enr.id}>
            {enr.User.name}{" "}
            <span className="text-gray-500">({enr.User.email})</span>
          </li>
        ))}
      </ul>

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
