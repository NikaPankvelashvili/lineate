import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(
  _: NextRequest,
  { params: { subId } }: { params: { subId: string } }
) {
  try {
    const users = await sql`SELECT id FROM users WHERE sub = ${subId}`;
    const usersId = users.rows[0].id;
    return NextResponse.json({ usersId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}