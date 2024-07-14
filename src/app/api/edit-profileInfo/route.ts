import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;


export async function POST(request: NextRequest) {
  const { userSub,
    name,
    phone,
    address, } = await request.json();

  try {
    await sql`UPDATE users SET name=${name}, phone=${phone}, address=${address} WHERE sub=${userSub};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  let users;
  try {
    users = await sql`SELECT * FROM users ORDER BY sub ASC;`;
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }

  return NextResponse.json({ users }, { status: 200 });
}