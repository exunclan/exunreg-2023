import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import client from "@/util/data/Mongo";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { token, newPass } = await req.json();

  // Verify token
  jwt.verify(token!, process.env.JWT_SECRET!, async (err, info) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return new NextResponse(
          JSON.stringify({
            error: "token_expired",
          })
        );
      } else {
        return new NextResponse(
          JSON.stringify({
            error: "token_invalid",
          })
        );
      }
    }

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
  return new NextResponse(
    JSON.stringify({
      success: "reset_successful",
    })
  );
}
