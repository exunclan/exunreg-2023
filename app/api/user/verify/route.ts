import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import client from "@/util/data/Mongo";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  /*
    Method invoked when a user opens the verification link.

    Check the JWT expiry and if the link is valid, set the `emailVerified` and
    `teacherEmailVerified` fields to `true` in the database and redirect the user to
    `/user/verified?user=[userid]&email=[school|teacher]`
    
    if expired link, redirect them to `/user/unverified?user=[userid]`
  */

  // Get query params
  const searchParams = new URLSearchParams(new URL(req.url).search);
  const token = searchParams.get("token");
  const usr = searchParams.get("user");
  const email = searchParams.get("email");

  // Initialize db
  const db = client.db("reg-2023");

  // Verify token
  jwt.verify(token!, process.env.JWT_SECRET!, (err, _) => {
    if (err) {
      return new Error(JSON.stringify(err));
    }

    if (email == "email") {
      const res = db.collection("users").updateOne(
        {
          _id: new ObjectId(usr!),
        },
        {
          $set: {
            emailVerified: true,
          },
        }
      );

      return new NextResponse(JSON.stringify(res));
    }

    if (email == "teacher") {
      const res = db.collection("users").updateOne(
        {
          _id: new ObjectId(usr!),
        },
        {
          $set: {
            teacherEmailVerified: true,
          },
        }
      );

      return new NextResponse(JSON.stringify(res));
    }
  });
}

export async function POST(req: NextRequest) {
  /*
    Route called when a new user registers.
    body: 
      - email [email of the school]
      - teacherEmail [email of the teacher incharge]

    send an email to both with links to verify emails. 
    use JWT to create tokens with an expiry of 1 hour 
    the links will point to this route but calling the GET method 
   */

  // Get email, teacherEmail
  const { email, teacherEmail } = await req.json();

  // Initialize nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // Initialize db
  const db = client.db("reg-2023");

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

  // Check if email is provided
  if (email) {
    const user = await db.collection("users").findOne({
      email,
    });

    jwt.sign(
      {
        user: email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1hr",
      },
      (err, token) => {
        const url = `${process.env.NEXT_PUBLIC_URL}/api/user/verify?user=${
          user!["_id"]
        }&token=${token}&email=email`;

        transporter.sendMail(emailOptions(url, email));

        if (err) {
          return new Error(JSON.stringify(err));
        }

        return new NextResponse("Verificaion email sent");
      }
    );
  }

  // Check if teacherEmail is provided
  if (teacherEmail) {
    const user = await db.collection("users").findOne({
      teacherEmail,
    });

    jwt.sign(
      {
        user: teacherEmail,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1hr",
      },
      (err, token) => {
        const url = `${process.env.NEXT_PUBLIC_URL}/api/user/verify?user=${
          user!["_id"]
        }&token=${token}&email=teacher`;

        transporter.sendMail(emailOptions(url, teacherEmail));

        if (err) {
          return new Error(JSON.stringify(err));
        }

        return new NextResponse("Verificaion email sent");
      }
    );
  }
}
