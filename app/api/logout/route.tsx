import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const auth_token = cookieStore.get(process.env.AUTH_TOKEN_NAME!);
  if (!auth_token || auth_token?.value?.length == 0) {
    return NextResponse.json(
      { error: "User is not logged in" },
      { status: 401 }
    );
  }
  // setting the cookie from server side to ensure security on client side
  return NextResponse.json(
    { message: "Logged Out" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `${
          process.env.AUTH_TOKEN_NAME
        }=""; HttpOnly; SameSite=Strict; Max-Age=${0}; ${
          process.env.NODE_ENV === "production" && "Secure;"
        }; Path=/`,
      },
    }
  );
}
