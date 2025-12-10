import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (!user.password)
    return NextResponse.json(
      { error: "Password missing in user record" },
      { status: 400 }
    );

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ id: user._id, role: user.role, email: user.email });

  return NextResponse.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}
