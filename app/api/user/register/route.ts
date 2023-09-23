import { NextRequest, NextResponse } from "next/server";
import client from "@/util/data/Mongo";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const {
    email,
    name,
    password,
    phone,
    teacher,
    teacherEmail,
    principal,
    address,
    ncr,
  } = await req.json();
  const db = client.db("reg-2023");

  const user = await db.collection("users").findOne({
    email,
  });
  if (user)
    return new NextResponse(
      JSON.stringify({
        error: "user_already_exists",
      })
    );

  const pass = await bcrypt.hash(password, 15);

  const res = await db.collection("users").insertOne({
    password: pass,
    teams: {},
    // TODO: Make them false when the email logic has been implemented
    emailVerified: true,
    teacherEmailVerified: true,
    email,
    name,
    phone,
    teacher,
    teacherEmail,
    principal,
    address,
    ncr,
  });
  return new NextResponse(JSON.stringify(res));
}
