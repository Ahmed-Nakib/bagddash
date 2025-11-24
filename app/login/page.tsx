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

    if (res?.error) setErr("Email বা Password ভুল");
    else window.location.href = "/dashboard";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> <br />

        <input
          placeholder="password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        /><br />

        <button type="submit">Login</button>
        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>

      <p><b>Admin:</b> admin@example.com / admin123</p>
      <p><b>User:</b> user@example.com / user123</p>
    </div>
  );
}
