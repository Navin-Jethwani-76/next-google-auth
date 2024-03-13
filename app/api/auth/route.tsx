import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const auth_token = cookieStore.get(process.env.AUTH_TOKEN_NAME || "");
  if (!auth_token || auth_token?.value?.length == 0) {
    return NextResponse.json({ message: "not authenticated" }, { status: 401 });
  }
  try {
    const user = jwt.verify(auth_token?.value, process.env.JWT_SECRET || "");
    return NextResponse.json(
      { user, message: "authenticated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
