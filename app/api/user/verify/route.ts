import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  /*
    Method invoked when a user opens the verification link.

    Check the JWT expiry and if the link is valid, set the `emailVerified` and
    `teacherEmailVerified` fields to `true` in the database and redirect the user to
    `/user/verified?user=[userid]&email=[school|teacher]`
    
    if expired link, redirect them to `/user/unverified?user=[userid]`
  */
  return new NextResponse(
    JSON.stringify({
      hello: "world",
    })
  );
}

export function POST(req: NextRequest) {
  /*
    Route called when a new user registers.
    body: 
      - email [email of the school]
      - teacherEmail [email of the teacher incharge]

    send an email to both with links to verify emails. 
    use JWT to create tokens with an expiry of 1 hour 
    the links will point to this route but calling the GET method 
   */
  return new NextResponse(
    JSON.stringify({
      hello: "world",
    })
  );
}
