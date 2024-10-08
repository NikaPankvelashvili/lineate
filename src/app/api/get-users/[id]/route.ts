import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;


export async function GET(_: NextRequest,{ params: { id } }: { params: { id: string }}
) {
  try {
    const user = await sql`SELECT * FROM users WHERE id = ${+id}`;
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}