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
  let { event } = params;
  event = event.replaceAll("%20", " ");

  // Initialize db
  const db = client.db("reg-2023");

  // Get user
  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId!),
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({
        error: true,
        message: "Invalid userId",
      })
    );
  }

  if (!user["teams"][event]) {
    return new NextResponse(
      JSON.stringify({
        error: true,
        message: "Event doesn't exists",
      })
    );
  }

  // Get member (this is slow btw should we use a searching alg? 🤔)
  const member = user["teams"][event].filter((member: TeamMember | null) => {
    return member!["_id"].toString() == memberId!;
  })[0];

  return new NextResponse(JSON.stringify(member));
}

export async function POST(
  req: NextRequest,
  { params }: { params: { event: string } }
) {
  const body = await req.json();
  const userId = body["userId"];
  const data = body["data"];

  let { event } = params;
  event = event.replaceAll("%20", " ");

  // Initialize db
  const db = client.db("reg-2023");

  // Get user
  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId!),
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({
        error: true,
        message: "Invalid userId",
      })
    );
  }

  if (!user["teams"][event]) {
    return new NextResponse(
      JSON.stringify({
        error: true,
        message: "Event doesn't exists",
      })
    );
  }

  let teams = user["teams"];
  const memberIdx = teams[event].findIndex(
    (x: any) => x._id.toString() === data._id
  );
  teams[event][memberIdx] = data;

  await db.collection("users").updateOne(
    {
      _id: new ObjectId(userId),
    },
    {
      $set: {
        teams,
      },
    }
  );

  return new NextResponse(JSON.stringify(data));
}
