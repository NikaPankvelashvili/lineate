import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0;


export async function POST(request: Request) {
  try {
    const { title, description, type, photos, stock, price, ram, memories, colors} = await request.json();

    if (!title || !description) {
      throw new Error('Title and description are required');
    }

    const photosJson = JSON.stringify(photos);
    const colorsJson = JSON.stringify(colors);

    await sql`
      INSERT INTO products (title, description, stock, price, type, ram, memories, photos, colors)
      VALUES (${title}, ${description}, ${stock}, ${price}, ${type}, ${ram}, ${memories}, ${photosJson}::jsonb, ${colorsJson}::jsonb);
    `;

    const products = await sql`
      SELECT *
      FROM products
    `;

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}