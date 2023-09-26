import { NextRequest, NextResponse } from "next/server";
import client from "@/util/data/Mongo";
import { ObjectId } from "mongodb";
import { TeamMember } from "@/util/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { event: string } }
) {
  // Get query params
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const memberId = searchParams.get("memberId");

  // Get event
  const { event } = params;

  // Initialize db
  const db = client.db("reg-2023");

  // Get user
  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId!),
  });

  if (!user) {
    return new NextResponse("Invalid userId");
  }

  if (!user["teams"][event]) {
    return new NextResponse("Event doesn't exists");
  }

  // Get member (this is slow btw should we use a searching alg? 🤔)
  const member = user["teams"][event].filter((member: TeamMember | null) => {
    return member!["_id"].toString() == memberId!;
  })[0];

  return new NextResponse(JSON.stringify(member));
}

export async function POST(req: NextRequest) { }
