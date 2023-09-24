import { NextRequest, NextResponse } from "next/server";
import client from "@/util/data/Mongo";
import { User } from "@/util/types";

export async function GET(req: NextRequest) {
  const db = await client.db("reg-2023");
  const searchParams = new URLSearchParams(new URL(req.url).search);
  const email = searchParams.get("email");
  const user = await db.collection("users").findOne({
    email,
  });
  const { _id, password, ...filteredUser } = user as User;

  return new NextResponse(JSON.stringify(filteredUser));
}

export async function PATCH(req: NextRequest) {
  const db = await client.db("reg-2023");
  const body = await req.json();

  await db.collection("users").updateOne(
    { email: body.email },
    {
      $set: body.updated,
    }
  );

  return new NextResponse(JSON.stringify({ success: true }));
}
