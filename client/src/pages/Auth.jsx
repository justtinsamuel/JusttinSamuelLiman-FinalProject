import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // <-- hook untuk redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isRegister) {
        // 🔹 Panggil endpoint register
        const res = await axiosInstance.post("/auth/register", {
          name,
          email,
          password,
          role: "Student", // default role kalau mau
        });
        alert("Registrasi berhasil, silakan login.");
        setIsRegister(false); // balik ke form login
      } else {
        // 🔹 Panggil endpoint login
        const res = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        setUser(res.data.user);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isRegister ? "Register gagal." : "Login gagal.")
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 useEffect untuk redirect ke dashboard jika user sudah login
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isRegister ? "Create Account" : "Login"}
        </h1>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer font-medium hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}
