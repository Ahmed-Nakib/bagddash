"use client";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/authClient";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  product: string;
  amount: number;
  status: string;
}


export default function UserDashboard() {

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders([
      { id: '1', product: 'T-Shirt', amount: 2, status: 'Delivered' },
      { id: '2', product: 'Shoes', amount: 1, status: 'Pending' },
      { id: '3', product: 'Bag', amount: 1, status: 'Shipped' },
    ]);
  }, []);



  const { loading, role } = useAuth("user");

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-200 font-bold text-xl">User Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Products</button>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Orders</button>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200">Profile</button>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-200" onClick={logout}>Logout</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, User!</h1>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Product</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                <th className="px-6 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-2">{order.id}</td>
                  <td className="px-6 py-2">{order.product}</td>
                  <td className="px-6 py-2">{order.amount}</td>
                  <td className={`px-6 py-2 font-medium ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Pending' ? 'text-yellow-600' : 'text-blue-600'}`}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Profile Section */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> User Name</p>
            <p><span className="font-medium">Email:</span> user@example.com</p>
            <p><span className="font-medium">Role:</span> User</p>
          </div>
        </div>
      </main>
    </div>
  );
}
