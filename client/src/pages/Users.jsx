// src/pages/Users.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "../store/slices/usersSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { items: users, loading, error } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, role };
    if (editingId) {
      dispatch(updateUser({ id: editingId, data }));
      setEditingId(null);
    } else {
      dispatch(addUser(data));
    }
    setName("");
    setEmail("");
    setRole("");
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-2">Loading...</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center border p-2 rounded">
            <span>{`${user.name} (${user.email}) - ${user.role}`}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
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
