import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

const ExpireDays = 14;

export async function POST(request: NextRequest) {
  const headersList = headers();
  const authorization = headersList.get("authorization");
  if (!authorization) {
    return NextResponse.json(
      { error: "access_token is required" },
      { status: 400 }
    );
  }
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${authorization.split(" ")[1]}` },
      }
    );
    if (response.ok) {
      const userInfo = await response.json();
      // console.log(userInfo); // display user's data in server console
      // this userInfo will have user's name, email, picture, etc.
      // you can check if user's email is in your database or not and register the user if needed

      const {
        email,
        name,
        picture,
      }: { email: string; name: string; picture: string } = userInfo;

      const token = jwt.sign(
        {
          email,
          name,
          picture,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: `${ExpireDays}d`,
        }
      );
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
      { error: "Invalid access_token" },
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
