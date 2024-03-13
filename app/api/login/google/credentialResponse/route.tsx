import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CredentialResponse } from "@react-oauth/google";

const ExpireDays = 14;

export async function POST(request: NextRequest) {
  const { credentialResponse }: { credentialResponse: CredentialResponse } =
    await request.json();
  if (credentialResponse.credential) {
    try {
      const data = jwt.decode(credentialResponse.credential);
      // this data will have user's name, email, picture, etc.
      // you can check if user's email is in your database or not and register the user if needed
      // console.log("User info", data); // display user's data in server console
      if (typeof data === "object" && data !== null) {
        const token = jwt.sign(
          { name: data.name, email: data.email, picture: data.picture },
          process.env.JWT_SECRET!,
          {
            expiresIn: `${ExpireDays}d`,
          }
        );
        // setting the cookie from server side to ensure security on client side
        return NextResponse.json(
          { message: "Auth Success" },
          {
            status: 200,
            headers: {
              "Set-Cookie": `${
                process.env.AUTH_TOKEN_NAME
              }=${token}; HttpOnly; SameSite=Strict; Max-Age=${
                ExpireDays * 24 * 60 * 60
              }; ${process.env.NODE_ENV === "production" && "Secure;"}; Path=/`,
            },
          }
        );
      }
      return NextResponse.json(
        { error: "Invalid Jwt Payload" },
        { status: 400 }
      );
    } catch (error) {
      if (error instanceof Error)
        return NextResponse.json({ error: error.message }, { status: 400 });
      else
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
    }
  }
  return NextResponse.json(
    { error: "Invalid credentialResponse" },
    { status: 400 }
  );
}
