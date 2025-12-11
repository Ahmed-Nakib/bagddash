"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  async function login(e: any) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password: pass,
    });

    if (res?.error) {
      setErr("Email বা Password ভুল");
      return;
    }

    // Save Admin Token
    if (email === "nakib@gmail.com") {
      localStorage.setItem("admin_token", "nakib_admin_2025");
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={login}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="Email"
        />

        <input
          required
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="Password"
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">
          Login
        </button>

        {err && <p className="text-red-500 text-center">{err}</p>}
      </form>
    </div>
  );
}
