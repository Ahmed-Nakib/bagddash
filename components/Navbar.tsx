"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  // ✅ ref for search box wrapper
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
        !searchBtnRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-[#F5F5F5]">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {mobileOpen ? (
                  <X className="h-6 w-6 text-[#111111]" />
                ) : (
                  <Menu className="h-6 w-6 text-[#111111]" />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-4 pt-10 bg-[#F5F5F5]">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-[#990514]">
                  Bagddas
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/products", label: "Products" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded transition-colors ${
                      isActive(item.href)
                        ? "bg-[#990514]/20"
                        : "hover:bg-[#990514]/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="text-2xl font-bold text-[#990514]">
            Bagddas
          </Link>
        </div>

        <nav className="hidden md:flex gap-4">
          {[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded transition-colors ${
                isActive(item.href)
                  ? "bg-[#990514]/20"
                  : "hover:bg-[#990514]/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-x-4">
          <div className="relative flex justify-center ">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5 text-[#111111] hover:text-[#990613]" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-4 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
            </Link>
          </div>

          {/* Search Button */}
          <button
            ref={searchBtnRef}
            className="cursor-pointer px-1"
            onClick={handleOpen}
          >
            <Search className="h-5 w-5 text-[#111111] hover:text-[#990613]" />
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={searchRef}
          className="border-b-2 border-[#D09294] bg-white z-50 w-full absolute"
        >
          <input
            type="text"
            placeholder="Search here"
            className="outline-none w-full py-2 px-5"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}
