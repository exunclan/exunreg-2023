import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import client from "@/util/data/Mongo";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { token, newPass } = await req.json();

  let tokenValid = false,
    expired = false;

  // Verify token
  jwt.verify(token!, process.env.JWT_SECRET!, async (err, info) => {
    if (err) {
      if (err.name === "TokenExpiredError") expired = true;
      return;
    } else tokenValid = true;

    // Extract info
    const decoded = info as { email: string };
    const email = decoded["email"];

    // Initialize db
    const db = client.db("reg-2023");

    const encryptedNewPass = await bcrypt.hash(newPass, 15);

    // Update db
    await db.collection("users").updateOne(
      {
        email: email,
      },
      {
        $set: {
          password: encryptedNewPass,
        },
      }
    );
  });

  if (expired)
    redirect(`${process.env.NEXT_PUBLIC_URL}/user/reset?success=expired`);
  if (!tokenValid)
    redirect(`${process.env.NEXT_PUBLIC_URL}/user/reset?success=false`);
  redirect(`${process.env.NEXT_PUBLIC_URL}/user/reset?success=true`);

  return new NextResponse("Password reset successful!");
}
