import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  return new NextResponse(
    JSON.stringify({
      hello: "world",
    })
  );
}
