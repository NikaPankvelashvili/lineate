import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;


export async function GET(request: NextRequest) {
    const type = request.nextUrl.pathname.replace('/api/get-blogs-type/', '');

  try {
    const blogs = await sql`SELECT * FROM blogs WHERE type = ${type} LIMIT 3 OFFSET 0`;

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
