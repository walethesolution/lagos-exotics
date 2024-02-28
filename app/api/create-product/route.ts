import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { productName, category, measurements } = await request.json();


    // Insert new record into the database
    await sql`
      INSERT INTO Products (ProductName, Categories, Measurements)
      VALUES (${productName}, ${category}, ${measurements})
    `;

    // Return success response
    return NextResponse.json({ message: 'Product created successfully' }, { status: 201 });
  } catch (error: any) {
    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}