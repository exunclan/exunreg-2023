import { NextRequest, NextResponse } from "next/server";
import client from "@/util/data/Mongo";
import { ObjectId } from "mongodb";
import { TeamMember } from "@/util/types";

export async function GET(req: NextRequest) {
  // Get query params
  const searchParams = new URLSearchParams(new URL(req.url).search);
  const userId = searchParams.get("userId");
  const event = searchParams.get("event");
  const name = searchParams.get("name");
  const clas = searchParams.get("class");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const role = searchParams.get("role");

  // Initialize db
  const db = client.db("reg-2023");

  // Get user
  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId!),
  });

  if (!user) {
    return new NextResponse("Invalid userId");
  }

  if (!event) {
    return new NextResponse("No event provided");
  }

  // Get member (this is slow btw should we use a searching alg? 🤔)
  const member = user["teams"][event].filter((member: TeamMember | null) => {
    return (
      member!.name == name &&
      member!.class == clas &&
      member!.email == email &&
      member!.phone == phone &&
      (role ? member!.role == role : true)
    );
  });

  return new NextResponse(JSON.stringify(member));
}

export async function POST(req: NextRequest) {}
