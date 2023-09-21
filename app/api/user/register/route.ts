import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/util/data/Mongo";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db("reg-2023");

  const pass = await bcrypt.hash(body.password, 15);

  const res = await db.collection("users").insertOne({
    email: body.email,
    password: pass,
    name: body.name,
  });
  return new NextResponse(JSON.stringify(res));
}
