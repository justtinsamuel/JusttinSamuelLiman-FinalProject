// src/pages/Checkpoint.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckpoints, addCheckpoint, updateCheckpoint, deleteCheckpoint } from "../store/slices/checkpointsSlice";

export default function Checkpoint() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.checkpoints);

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchCheckpoints());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateCheckpoint({ id: editingId, data: { title } }));
      setEditingId(null);
    } else {
      dispatch(addCheckpoint({ title }));
    }
    setTitle("");
  };

  const handleEdit = (checkpoint) => {
    setEditingId(checkpoint.id);
    setTitle(checkpoint.title);
  };

  const handleDelete = (id) => {
    dispatch(deleteCheckpoint(id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Checkpoints</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading && <p className="text-gray-600 mb-2">Loading...</p>}

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Checkpoint title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((checkpoint) => (
          <li key={checkpoint.id} className="flex justify-between items-center border p-2 rounded">
            <span>{checkpoint.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(checkpoint)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(checkpoint.id)}
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
