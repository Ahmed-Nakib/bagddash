/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/order")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  const deleteOrder = async (id: string) => {
    await fetch(`/api/order/${id}`, { method: "DELETE" });
    setOrders(orders.filter((o: any) => o._id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order._id} className="p-4 border rounded-lg">
            <p><b>Name:</b> {order.name}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Total:</b> ${order.total}</p>

            <div className="flex gap-2 mt-2">
              <Link
                href={`/dashboard/orders/${order._id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                View
              </Link>

              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => deleteOrder(order._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
