import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import client from "@/util/data/Mongo";

export async function GET(req: NextRequest) {
  // Get query params
  const searchParams = new URLSearchParams(new URL(req.url).search);
  const token = searchParams.get("token");

  let tokenValid = false;

  // Verify token
  jwt.verify(token!, process.env.JWT_SECRET!, async (err, info) => {
    if (err) {
      return new NextResponse(JSON.stringify(err));
    }

    tokenValid = true;

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

  // Check if token is valid
  if (!tokenValid) {
    return new NextResponse("Invalid token");
  }

  return new NextResponse("verified");
}

export async function POST(req: NextRequest) {
  // Get email, teacherEmail
  const { email, teacherEmail } = await req.json();

  // Initialize nodemailer

  /* // Test account for nodemailer
  // Don't forget to uncomment the closing parenthesis on the createTestAccount function
  nodemailer.createTestAccount(async (_, acc) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email"
      port: 587,
      secure: false,
      auth: {
        user: acc.user,
        pass: acc.pass
      },
    });
  */

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // Function to generate emailOptions
  const emailOptions = (url: string, to: string) => {
    return {
      from: "Exunclan <exun@dpsrkp.net>",
      to: to,
      subject: "Verify Email",
      html: `
			<p>Pls verify your email at <a href="${url}">${url}</a></p>
			`,
    };
  };

  // Sign jwt token if email exists
  if (email) {
    jwt.sign(
      {
        email: email,
        emailType: "email",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1hr",
      },
      (err, token) => {
        if (err) {
          return new NextResponse(JSON.stringify(err));
        }

        const url = `${process.env.NEXT_PUBLIC_URL}/api/user/verify?token=${token}`;

        transporter.sendMail(emailOptions(url, email), (err, _) => {
          if (err) {
            return new NextResponse(JSON.stringify(err));
          }

          console.log(nodemailer.getTestMessageUrl(_));
        });
      }
    );
  }

  // Sign jwt token if teacherEmail exists
  if (teacherEmail) {
    jwt.sign(
      {
        email: teacherEmail,
        emailType: "teacher",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1hr",
      },
      (err, token) => {
        if (err) {
          return new NextResponse(JSON.stringify(err));
        }

        const url = `${process.env.NEXT_PUBLIC_URL}/api/user/verify?token=${token}`;

        transporter.sendMail(emailOptions(url, teacherEmail), (err, _) => {
          if (err) {
            return new NextResponse(JSON.stringify(err));
          }

          console.log(nodemailer.getTestMessageUrl(_));
        });
      }
    );
  }
  // });

  return new NextResponse("Verificaion email sent");
}
