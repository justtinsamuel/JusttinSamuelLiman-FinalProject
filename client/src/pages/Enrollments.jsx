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
import { fetchUsers } from "../store/slices/usersSlice"; // pastikan kamu punya userSlice

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
    dispatch(deleteEnrollment(id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Enrollments</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-2">Loading...</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="p-2 border rounded"
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
          className="p-2 border rounded"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {editingId ? "Update" : "Enroll"}
        </button>
      </form>

      <ul className="space-y-2">
        {enrollments.map((enrollment) => (
          <li
            key={enrollment.id || `${enrollment.UserId}-${enrollment.CourseId}`}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {`User ${enrollment.UserId} enrolled in Course ${enrollment.CourseId}`}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(enrollment)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(enrollment.id)}
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
