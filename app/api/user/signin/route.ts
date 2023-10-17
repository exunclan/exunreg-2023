import { NextRequest, NextResponse } from "next/server";
import client from "@/util/data/Mongo";
import brcypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password }: { email: string; password: string } =
    await req.json();

  const db = client.db("reg-2023");
  const user = await db.collection("users").findOne({
    email,
  });
  console.log(user)

  if (!user) {
    return new NextResponse(
      JSON.stringify({
        error: "account_not_found",
      })
    );
  }

  if (!user.emailVerified) {
    return new NextResponse(
      JSON.stringify({
        error: "email_not_verified",
      })
    );
  }

  if (!user.teacherEmailVerified) {
    return new NextResponse(
      JSON.stringify({
        error: "teacher_email_not_verified",
      })
    );
  }

  const check = await brcypt.compare(password, user.password);

  if (check) {
    return new NextResponse(JSON.stringify(user));
  } else {
    return new NextResponse(
      JSON.stringify({
        error: "incorrect_password",
      })
    );
  }
}
