import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const result = await sql `SELECT * FROM Categories`;

        const savedCategories = result.rows

        console.log(result, "List of saved categories: ",savedCategories)

        // Return the fetched data
        return NextResponse.json({ savedCategories }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}