import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST (req:Request) {
    try {
        const {category_name, measurements} = await req.json();
        
        if (!category_name || !measurements) {
            throw new Error('Invalid request data');
        }
        
        await sql   `CREATE TABLE IF NOT EXISTS Categories (
            id SERIAL PRIMARY KEY,
            category_name TEXT,
            measurements TEXT[]
          )`

          const instertedCategory = await sql`
          INSERT INTO Categories (category_name, measurements)
          VALUES (${category_name}, ${measurements})
          RETURNING *
        `;
         return NextResponse.json({message: "Category and measurement successfully inserted", instertedCategory}, {status: 201})
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
