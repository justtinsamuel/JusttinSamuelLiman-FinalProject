export default function ProtectedRoute({ children }) {
  // langsung render semua children tanpa cek auth
  return children;
}
