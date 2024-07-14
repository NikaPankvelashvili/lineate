import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.pathname.replace('/api/update-blog/', '');
  const {title,description,image_url}= await request.json()

  try {
    if (!id) throw new Error('ID is required');

    await sql`UPDATE blogs SET title=${title},description=${description},image_url=${image_url} WHERE id = ${+id};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const blogs = await sql`SELECT * FROM blogs ORDER BY id ASC;`;

  return NextResponse.json({ blogs }, { status: 200 });
}