import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import client from "@/util/data/Mongo";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  // Get query params
  const searchParams = new URLSearchParams(new URL(req.url).search);
  const token = searchParams.get("token");

  let tokenValid = false,
    expired = false;

  // Verify token
  jwt.verify(token!, process.env.JWT_SECRET!, async (err: any, info: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") expired = true;
      return;
    } else tokenValid = true;

    // Extract info
    const decoded = info as { email: string; emailType: string };
    const email = decoded["email"];
    const emailType = decoded["emailType"];

    // Check if emailType is email
    if (emailType == "email") {
      // Initialize db
      const db = client.db("reg-2023");

      // Update db
      await db.collection("users").updateOne(
        {
          email: email,
        },
        {
          $set: {
            emailVerified: true,
          },
        }
      );
    }

    // Check if emailType is teacher
    if (emailType == "teacher") {
      // Initialize db
      const db = client.db("reg-2023");

      // Update db
      db.collection("users").updateOne(
        {
          teacherEmail: email,
        },
        {
          $set: {
            teacherEmailVerified: true,
          },
        }
      );
    }
  });

  if (expired)
    redirect(`${process.env.NEXT_PUBLIC_URL}/user/verify?success=expired`);
  if (!tokenValid)
    redirect(`${process.env.NEXT_PUBLIC_URL}/user/verify?success=false`);
  redirect(`${process.env.NEXT_PUBLIC_URL}/user/verify?success=true`);
  // @ts-ignore: Unreachable code error
  return new NextResponse(JSON.stringify({ success: true }));
}

export async function POST(req: NextRequest) {
  // Get email, teacherEmail
  const { email, teacherEmail } = await req.json();
  const tokens = JSON.parse(process.env.DISCORD_VERIFICATION_TOKENS || "[]");
  const randomToken = tokens[Math.floor(Math.random() * tokens.length)];

  /* // Test account for nodemailer
  // Don't forget to uncomment the closing parenthesis on the createTestAccount function
  nodemailer.createTestAccount(async (_, acc) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: acc.user,
        pass: acc.pass,
      },
    }); */

  fetch("https://exun-mailer.vercel.app/"+email.toString()+" "+teacherEmail.toString())


  // Sign jwt token if email exists
  if (email) {
    let token = jwt.sign(
      {
        email: email,
        emailType: "email",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24hr",
      }
    );

    const url = `${process.env.NEXT_PUBLIC_URL}/api/user/verify?token=${token}`;

    await fetch(`https://${process.env.RELAYER_API}.vercel.app/email?password=${process.env.RELAYER}&to=${encodeURIComponent(email)}&subject=${encodeURIComponent(`Exun 2023 ${false ? "Teacher In-charge " : ""}Verification`)}&html=${`
    <p>
      Please click on the following link to verify your email for Exun 2023. <br><br> 
      <a href="${url}">
        ${url}
      </a>
      <br><br>
      Kindly share it with the participants of your school.
      <br><br>
      Regards, <br>
      Exun Clan
    </p>
    `}`)
  }

  // Sign jwt token if teacherEmail exists
  if (teacherEmail) {
    let token = jwt.sign(
      {
        email: teacherEmail,
        emailType: "teacher",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24hr",
      }
    );

    const url = `${process.env.NEXT_PUBLIC_URL}/api/user/verify?token=${token}`;

    await fetch(`https://${process.env.RELAYER_API}.vercel.app/email?password=${process.env.RELAYER}&to=${encodeURIComponent(email)}&subject=${encodeURIComponent(`Exun 2023 ${true ? "Teacher In-charge " : ""}Verification`)}&html=${`
    <p>
      Please click on the following link to verify your email for Exun 2023. <br><br> 
      <a href="${url}">
        ${url}
      </a>
      <br><br>
      Kindly share it with the participants of your school.
      <br><br>
      Regards, <br>
      Exun Clan
    </p>
    `}`)
  }

  return new NextResponse("Verificaion email sent");
}
