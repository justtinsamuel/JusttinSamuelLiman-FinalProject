// src/pages/Submission.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissions, addSubmission, updateSubmission, deleteSubmission } from "../store/slices/submissionsSlice";
import { fetchModules } from "../store/slices/modulesSlice";
import { fetchUsers } from "../store/slices/usersSlice";

export default function Submission() {
  const dispatch = useDispatch();
  const { items: submissions, loading, error } = useSelector((state) => state.submissions);
  const { items: modules } = useSelector((state) => state.modules);
  const { items: users } = useSelector((state) => state.users);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [status, setStatus] = useState("");
  const [score, setScore] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchSubmissions());
    dispatch(fetchModules());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { UserId: selectedUser, ModuleId: selectedModule, status, score: Number(score) };
    if (editingId) {
      dispatch(updateSubmission({ id: editingId, data }));
      setEditingId(null);
    } else {
      dispatch(addSubmission(data));
    }
    setSelectedUser("");
    setSelectedModule("");
    setStatus("");
    setScore("");
  };

  const handleEdit = (submission) => {
    setEditingId(submission.id);
    setSelectedUser(submission.UserId);
    setSelectedModule(submission.ModuleId);
    setStatus(submission.status);
    setScore(submission.score);
  };

  const handleDelete = (id) => {
    dispatch(deleteSubmission(id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Submissions</h1>

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
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Module</option>
          {modules.map((module) => (
            <option key={module.id} value={module.id}>{module.title}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="graded">Graded</option>
        </select>

        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-2">
        {submissions.map((submission) => (
          <li key={submission.id} className="flex justify-between items-center border p-2 rounded">
            <span>{`User ${submission.UserId} - Module ${submission.ModuleId} - ${submission.status} (${submission.score})`}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(submission)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(submission.id)}
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
