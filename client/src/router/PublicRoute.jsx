export default function PublicRoute({ children }) {
  // biasanya redirect ke /courses kalau sudah login
  // sekarang biarin aja selalu render children
  return children;
}
