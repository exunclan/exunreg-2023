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
  jwt.verify(token!, process.env.JWT_SECRET!, async (err, info) => {
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
}

export async function POST(req: NextRequest) {
  // Get email, teacherEmail
  const { email, teacherEmail } = await req.json();

  // Initialize nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Function to generate emailOptions
  const emailOptions = (url: string, to: string) => {
    return {
      from: "Exunclan <exun@dpsrkp.net>",
      to: to,
      subject: "Exun email verification",
      html: `
			<p>Please click on the following link to verify your email for Exun 2023. <br><br> <a href="${url}">${url}</a></p>
			`,
    };
  };

  // Sign jwt token if email exists
  if (email) {
    await jwt.sign(
      {
        email: email,
        emailType: "email",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24hr",
      },
      (err, token) => {
        if (err) {
          return new NextResponse(JSON.stringify(err));
        }

        const url = `${process.env.NEXT_PUBLIC_URL}/api/user/verify?token=${token}`;

        transporter.sendMail(emailOptions(url, email), (err, _) => {
          if (err) {
            console.log(err);
            return new NextResponse(JSON.stringify(err));
          }
        });
      }
    );
  }

  // Sign jwt token if teacherEmail exists
  if (teacherEmail) {
    await jwt.sign(
      {
        email: teacherEmail,
        emailType: "teacher",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24hr",
      },
      (err, token) => {
        if (err) {
          return new NextResponse(JSON.stringify(err));
        }

        const url = `${process.env.NEXT_PUBLIC_URL}/api/user/verify?token=${token}`;

        transporter.sendMail(emailOptions(url, teacherEmail), (err, _) => {
          if (err) {
            console.log(err);
            return new NextResponse(JSON.stringify(err));
          }
        });
      }
    );
  }

  return new NextResponse("Verificaion email sent");
}
