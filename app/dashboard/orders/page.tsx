/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  date: string;
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  // Just demo data (replace with DB)
  const orders: Order[] = [
    {
      id: "ORD-1001",
      customer: "Hasan",
      amount: 1500,
      status: "pending",
      date: "2025-01-15",
    },
    {
      id: "ORD-1002",
      customer: "Rakib",
      amount: 2200,
      status: "completed",
      date: "2025-01-16",
    },
    {
      id: "ORD-1003",
      customer: "Fatema",
      amount: 1800,
      status: "processing",
      date: "2025-01-16",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Order List
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
            <th style={th}>Order ID</th>
            <th style={th}>Customer</th>
            <th style={th}>Amount</th>
            <th style={th}>Status</th>
            <th style={th}>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={td}>{order.id}</td>
              <td style={td}>{order.customer}</td>
              <td style={td}>{order.amount} ৳</td>
              <td style={td}>
                <span style={statusStyle(order.status)}>{order.status}</span>
              </td>
              <td style={td}>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styling
const th: React.CSSProperties = {
  padding: "12px",
  fontWeight: "600",
  fontSize: "14px",
};

const td: React.CSSProperties = {
  padding: "12px",
  fontSize: "14px",
};

function statusStyle(status: string): React.CSSProperties {
  const colors: any = {
    pending: "#f59e0b",
    processing: "#3b82f6",
    completed: "#16a34a",
    cancelled: "#dc2626",
  };

  return {
    background: colors[status] + "20",
    color: colors[status],
    padding: "4px 10px",
    borderRadius: "8px",
    textTransform: "capitalize",
    fontWeight: "600",
  };
}
