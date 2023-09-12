import { fetchEvents } from "@/util/data/Events";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  apiVersion: "2023-09-11",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
});

export async function GET(req: NextRequest) {
  // const data = await fetchEvents();
  const data = await client.fetch(`*[_type=="event"]`);
  return NextResponse.json(data);
}
