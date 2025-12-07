import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message, token } = await req.json();

  // ✅ Verify reCAPTCHA
  const verifyRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    }
  );

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return Response.json(
      { success: false, message: "reCAPTCHA failed" },
      { status: 400 }
    );
  }

  // ✅ Nodemailer Setup
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Bagddash Fashion" <${process.env.SMTP_USER}>`,
      to: "your-email@gmail.com",
      subject: "New Contact Message",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, message: "Email failed" },
      { status: 500 }
    );
  }
}
