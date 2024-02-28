import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Fetch all products from the database
    const products = await sql`
      SELECT * FROM Products
    `;

    // Return the list of products
    return NextResponse.json({ products }, { status: 200 });
  } catch (error: any) {
    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}