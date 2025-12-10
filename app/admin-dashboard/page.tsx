"use client";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/authClient";

export default function AdminDashboard() {
  const { loading, role } = useAuth("admin");

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-red-600">Admin Dashboard</h1>
      <p>Welcome, {role}!</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
