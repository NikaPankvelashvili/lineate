import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export async function GET(_: NextRequest) {
  try {
    const session = await getSession();

    if (session?.user) {
      const { sub, nickname, name, email, picture } = session.user;

      const user = await sql`SELECT * FROM users WHERE sub = ${sub}`;

      if (!user.rows.length) {
        await sql`
          INSERT INTO users (sub, nickname, name, email, image_url)
          VALUES (${sub}, ${nickname}, ${name}, ${email}, ${picture});
        `;
      }

      const users = await sql`SELECT id FROM users WHERE sub = ${sub} LIMIT 1;`;
      const userId = users.rows[0].id;

      const cartCheck = await sql`SELECT * FROM cart WHERE user_id = ${userId}`;
      if (!cartCheck.rows.length) {
        await sql`
          INSERT INTO cart (user_id, products)
          VALUES (${userId}, '[]');
        `;
      }
    } else {
      return redirect("/api/auth/logout");
    }
  } catch (error) {
    console.error(error);
    return redirect("/api/auth/logout");
  }

  return redirect("/");
}