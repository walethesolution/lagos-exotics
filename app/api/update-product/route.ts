import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const { productName, category, measurements } = await request.json();

    if (!productName) {
      throw new Error('ProductName is required');
    }

    const result = await sql`
      UPDATE Products
      SET Categories = ${category}, Measurements = ${measurements}
      WHERE Productname = ${productName}
    `;

    if (result.rowCount === 0) {
      throw new Error('No product found with the provided ProductName');
    }

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}