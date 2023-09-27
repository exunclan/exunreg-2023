import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import client from "@/util/data/Mongo";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const db = client.db("reg-2023");
  const user = await db.collection("users").findOne({
    email,
  });

  if (!user) {
    console.log("No user with this email");
    return new NextResponse(
      JSON.stringify({
        error: "account_not_found",
      })
    );
  }

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
      subject: "Exun password reset",
      html: `
			<p>Please click on the following link to reset your password for Exun 2023. <br><br> <a href="${url}">${url}</a></p>
			`,
    };
  };

  jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
    (err: any, token: any) => {
      if (err) {
        return new NextResponse(JSON.stringify(err));
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/user/reset?token=${token}`;

      transporter.sendMail(emailOptions(url, email), (err, _) => {
        if (err) {
          console.log(err);
          return new NextResponse(JSON.stringify(err));
        }
      });
    }
  );

  return new NextResponse(JSON.stringify({ success: "Reset link sent" }));
}
