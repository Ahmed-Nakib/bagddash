// components/dashboard/SideNav.tsx
'use client'; // If using App Router and need client-side interactivity like 'useState'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Orders', href: '/dashboard/orders', icon: '🛒' },
  { name: 'Products', href: '/dashboard/products', icon: '📦' },
  { name: 'Create', href: '/dashboard/create', icon: '👤' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-800 text-white">
      <Link href="/" className="mb-6 flex h-20 items-end justify-start rounded-md p-4">
        <div className="w-32 text-2xl font-bold">E-Shop Admin</div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex h-12 items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 ${
                isActive ? 'bg-sky-100 text-blue-600' : 'text-white'
              }`}
            >
              <p className="hidden md:block">
                {item.icon} {item.name}
              </p>
            </Link>
          );
        })}
        {/* Add Logout/Sign Out component here */}
      </div>
    </div>
  );
}