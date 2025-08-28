export default function Dashboard() {
  // sementara pakai placeholder user
  const user = { name: "Justtin Samuel Liman" };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.name}! This is your dashboard.</p>
    </div>
  );
}
