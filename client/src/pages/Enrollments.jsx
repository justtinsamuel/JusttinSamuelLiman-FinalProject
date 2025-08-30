// src/pages/Enrollment.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnrollments,
  addEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../store/slices/enrollmentsSlice";
import { fetchCourses } from "../store/slices/coursesSlice";
import { fetchUsers } from "../store/slices/usersSlice";

export default function Enrollment() {
  const dispatch = useDispatch();
  const {
    items: enrollments,
    loading,
    error,
  } = useSelector((state) => state.enrollments);
  const { items: courses } = useSelector((state) => state.courses);
  const { items: users } = useSelector((state) => state.users);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" | "table"
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchEnrollments());
    dispatch(fetchCourses());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { UserId: selectedUser, CourseId: selectedCourse };
    if (editingId) {
      dispatch(updateEnrollment({ id: editingId, data }));
      setEditingId(null);
    } else {
      dispatch(addEnrollment(data));
    }
    setSelectedUser("");
    setSelectedCourse("");
  };

  const handleEdit = (enrollment) => {
    setEditingId(enrollment.id);
    setSelectedUser(enrollment.UserId);
    setSelectedCourse(enrollment.CourseId);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteEnrollment(deleteId)); // ✅ fixed
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Enrollments</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-2">Loading...</p>}

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className={`px-4 py-2 rounded text-white font-medium ${
            editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update" : "Enroll"}
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
          {enrollments.map((enrollment, index) => {
            const user = users.find((u) => u.id === enrollment.UserId);
            const course = courses.find((c) => c.id === enrollment.CourseId);
            const key =
              enrollment.id ??
              `${enrollment.UserId}-${enrollment.CourseId}-${index}`;

            return (
              <li
                key={key}
                className="flex justify-between items-center border p-2 rounded shadow-sm"
              >
                <span>
                  {user && course
                    ? `${user.name} enrolled in ${course.title}`
                    : `User ${enrollment.UserId} enrolled in Course ${enrollment.CourseId}`}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(enrollment)}
                    className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(enrollment.id)}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Course</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment, index) => {
                const user = users.find((u) => u.id === enrollment.UserId);
                const course = courses.find((c) => c.id === enrollment.CourseId);
                const key =
                  enrollment.id ??
                  `${enrollment.UserId}-${enrollment.CourseId}-${index}`;

                return (
                  <tr key={key} className="text-center">
                    <td className="px-4 py-2 border">
                      {user ? user.name : `User ${enrollment.UserId}`}
                    </td>
                    <td className="px-4 py-2 border">
                      {course ? course.title : `Course ${enrollment.CourseId}`}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(enrollment)}
                        className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(enrollment.id)}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this enrollment? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
