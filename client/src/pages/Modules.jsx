// src/pages/Modules.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [content_type, setContent_type] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [viewModule, setViewModule] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" | "table"

  // NEW: delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // fetch modules & courses
  const fetchModules = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/modules");
      setModules(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch modules");
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchModules();
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, content, content_type };

    try {
      if (editingId) {
        await axiosInstance.put(`/modules/${editingId}`, data);
      } else {
        await axiosInstance.post("/modules", data);
      }
      setTitle("");
      setContent("");
      setContent_type("");
      setEditingId(null);
      fetchModules();
    } catch (err) {
      console.error(err);
      setError("Failed to save module");
    }
  };

  const handleEdit = (module) => {
    setEditingId(module.id);
    setTitle(module.title);
    setContent(module.content);
    setContent_type(module.content_type);
  };

  // NEW: open modal first
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/modules/${deleteId}`);
      fetchModules();
    } catch (err) {
      console.error(err);
      setError("Failed to delete module");
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleView = async (id) => {
    try {
      const res = await axiosInstance.get(`/modules/${id}`);
      setViewModule(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch module");
    }
  };

  const closeModal = () => setViewModule(null);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
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
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Content Type"
          value={content_type}
          onChange={(e) => setContent_type(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {editingId ? "Update Module" : "Add Module"}
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
        <div className="grid gap-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
            >
              <div>
                <h2 className="font-semibold text-lg">{module.title}</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(module.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  View
                </button>
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
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Content</th>
                <th className="px-4 py-2 border">Content Type</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module.id} className="text-center">
                  <td className="px-4 py-2 border">{module.title}</td>
                  <td className="px-4 py-2 border">{module.content}</td>
                  <td className="px-4 py-2 border">{module.content_type}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleView(module.id)}
                      className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(module)}
                      className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(module.id)}
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Module Modal */}
      {viewModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-4">{viewModule.title}</h2>
            <p>
              <strong>Content:</strong> {viewModule.content}
            </p>
            <p>
              <strong>Content Type:</strong> {viewModule.content_type}
            </p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </div>
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
              Are you sure you want to delete this module? This action cannot be undone.
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
