import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/util/data/Mongo";
import brcypt from "bcrypt";

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const { email, password }: { email: string; password: string } =
    await req.json();

  const db = client.db("reg-2023");
  const user = await db.collection("users").findOne({
    email,
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({
        error: "account_not_found",
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
