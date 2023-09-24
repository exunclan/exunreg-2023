import { NextRequest, NextResponse } from "next/server";
import client from "@/util/data/Mongo";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  // Get query params
  const searchParams = new URLSearchParams(new URL(req.url).search);
  const userId = searchParams.get("userId");
  const event = searchParams.get("event");

  // Initialize db
  const db = client.db("reg-2023");

  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId!),
  });

  if (!user) {
    return new NextResponse("Invalid userId");
  }

  if (!event) {
    return new NextResponse(JSON.stringify(user["teams"]));
  }

  return new NextResponse(JSON.stringify(user["teams"][event]));
}
export async function POST(req: NextRequest) {}
