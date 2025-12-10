"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetails() {
  const params = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${params.id}`);
        const data = await res.json();
        setOrder(data.order);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [params?.id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p><b>Name:</b> {order.name}</p>
      <p><b>Phone:</b> {order.phone}</p>
      <p><b>Address:</b> {order.address}</p>
      <p><b>Payment:</b> {order.paymentMethod}</p>
      <p><b>Total:</b> ${order.total}</p>
    </div>
  );
}
