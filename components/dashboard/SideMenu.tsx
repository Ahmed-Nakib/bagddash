"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Orders", href: "/dashboard/orders", icon: "🛒" },
  { name: "Products", href: "/dashboard/products", icon: "📦" },
  { name: "Create", href: "/dashboard/create", icon: "➕" },
];

export default function SideNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h1 className="text-lg font-bold">Bagddash Admin</h1>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-50 top-0 left-0 h-full
          w-[260px] bg-gray-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full px-4 py-6">
          
          {/* Logo */}
          <Link href="/" className="mb-10 text-2xl font-bold text-center text-white">
            Bagddash Admin
          </Link>

          {/* Menu */}
          <nav className="flex flex-col gap-2 flex-grow">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-all
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            className="
              mt-auto flex items-center gap-3 px-4 py-3 rounded-lg
              bg-red-600 hover:bg-red-700 transition-all text-sm font-medium
            "
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}
