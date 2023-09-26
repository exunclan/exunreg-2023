import { NextRequest, NextResponse } from "next/server";
import client from "@/util/data/Mongo";
import { ObjectId } from "mongodb";
import { TeamMember, User } from "@/util/types";
import { AiOutlineConsoleSql } from "react-icons/ai";

export async function GET(
  req: NextRequest,
  { params }: { params: { event: string } }
) {
  // Get query params
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  // Get event
  let { event } = params;
  event = event.replaceAll("%20", " ");

  // Initialize db
  const db = client.db("reg-2023");

  const user = await db.collection("users").findOne({
    _id: new ObjectId(userId!),
  });

  if (!user) {
    return new NextResponse("Invalid userId");
  }

  if (user["teams"][event] === undefined)
    return new NextResponse(JSON.stringify([]));

  return new NextResponse(JSON.stringify(user["teams"][event]));
}

export async function POST(
  req: NextRequest,
  { params }: { params: { event: string } }
) {
  const body = await req.json();
  const userId = body["userId"];
  const members = body["members"];

  // Get event
  let { event } = params;
  event = event.replaceAll("%20", " ");

  // Initialize db
  const db = client.db("reg-2023");

  const user = (await db.collection("users").findOne({
    _id: new ObjectId(userId!),
  })) as User;

  if (!user) {
    return new NextResponse("Invalid userId");
  }

  let teams = user.teams;
  teams[event] = members.map((x: any) => {
    if (x._id === "") x._id = new ObjectId();
    else x._id = new ObjectId(x._id);
    return x;
  });

  const updated = await db.collection("users").updateOne(
    {
      _id: new ObjectId(userId!),
    },
    {
      $set: {
        teams,
      },
    }
  );

  return new NextResponse(JSON.stringify(teams[event]));
}
