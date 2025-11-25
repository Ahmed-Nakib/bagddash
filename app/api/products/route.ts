import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, products });
}

function checkAdmin(req: Request) {
  const token = req.headers.get("x-admin-token") || "";
  return token === ADMIN_TOKEN;
}

export async function POST(req: Request) {
  try {
    if (!checkAdmin(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const form = await req.formData();

    const file = form.get("image") as File | null;
    const title = String(form.get("title") || "");
    const subtitle = String(form.get("subtitle") || "");
    const price = Number(form.get("price") || 0);
    const details = String(form.get("details") || "");

    if (!file)
      return NextResponse.json(
        { success: false, error: "Image is required" },
        { status: 400 }
      );

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadRes: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    const product = await Product.create({
      title,
      subtitle,
      price,
      details,
      image: uploadRes.secure_url,
      cloudinary_public_id: uploadRes.public_id,
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
