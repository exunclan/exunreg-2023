import { NextRequest, NextResponse } from "next/server";
import client from "@/util/data/Mongo";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { event: string } }
) {
  // Get query params
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  // Get event
  const { event } = params;

  // Initialize db
  const db = client.db("reg-2023");

  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId!),
  });

  console.log(event);

  if (!user) {
    return new NextResponse("Invalid userId");
  }

  return new NextResponse(JSON.stringify(user["teams"][event]));
}
export async function POST(req: NextRequest) { }
