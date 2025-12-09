"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              About <span className="text-primary">Bagddash Fashion</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Bagddash Fashion is a modern ecommerce fashion brand focused on
              delivering premium quality fashion products with style, comfort,
              and affordability. We believe everyone deserves to look stylish
              every day.
            </p>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/about.png"
              alt="Bagddash Fashion"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Our Mission",
              desc: "To make fashion accessible, affordable, and enjoyable for everyone.",
            },
            {
              title: "Our Vision",
              desc: "To become a trusted global fashion brand loved for quality and customer experience.",
            },
            {
              title: "Our Promise",
              desc: "Premium fabrics, trendy designs, and fast, reliable delivery.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
            Why Choose Bagddash Fashion?
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-14">
            {[
              "Premium Quality",
              "Latest Fashion Trends",
              "Affordable Prices",
              "Fast & Secure Delivery",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition"
              >
                <p className="font-medium text-gray-800">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Join the Bagddash Fashion Revolution
          </h2>
          <p className="my-4 text-lg text-white/90">
            Discover the perfect blend of style, comfort, and confidence with us.
          </p>
          
          <Link href={"/products"} className="bg-[#CC071E] hover:bg-[#990613] px-6  py-3 rounded-md ">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
