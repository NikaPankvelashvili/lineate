import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;


export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.replace('/api/delete-product/', '');

  try {
    if (!id) throw new Error('ID is required');

    await sql`DELETE FROM products WHERE id = ${+id};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const products = await sql`SELECT * FROM products;`;

  return NextResponse.json({ products }, { status: 200 });
}