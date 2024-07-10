import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.replace('/api/get-cart/', '');

  try {
    const cart = await sql`SELECT products FROM cart WHERE user_id = ${Number(id)}`;

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}