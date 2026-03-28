import { useAuth } from "../contexts/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") return <div>Access denied</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      {/* Add admin features here */}
    </div>
  );
};

export default AdminDashboard;