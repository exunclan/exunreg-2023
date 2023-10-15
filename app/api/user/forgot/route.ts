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
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // verify connection configuration
  await new Promise((resolve, reject) => {
    transporter.verify(function (err, success) {
      if (err) {
        reject(err);
        return new NextResponse(JSON.stringify(err));
      } else {
        resolve(success);
      }
    });
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
    async (err: any, token: any) => {
      if (err) {
        return new NextResponse(JSON.stringify(err));
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/user/reset?token=${token}`;

      await new Promise((resolve, reject) => {
        transporter.sendMail(emailOptions(url, email), (err, info) => {
          if (err) {
            reject(err);
            return new NextResponse(JSON.stringify(err));
          }

          resolve(info);
        });
      });
    }
  );

  return new NextResponse(JSON.stringify({ success: "Reset link sent" }));
}
