import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    // Extract data from the request body or query parameters
    const body = await request.json();
    const { productName } = body;

    // Make sure ProductName is provided, you can add more validation as needed
    if (!productName) {
      throw new Error('ProductName is required');
    }

    // Delete the record from the database
    const result = await sql`
      DELETE FROM Products
      WHERE ProductName = ${productName}
    `;

    // Check if any rows were affected
    if (result.rowCount === 0) {
      throw new Error('No product found with the provided ProductName');
    }

    // Return success response
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error: any) { // Explicitly type error as 'any' or 'Error'
    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}