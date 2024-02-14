import { sql } from "@vercel/postgres";

export default async function getHandler(req, res) {
  try {
    // Implement logic to retrieve data from the database
    // For example, querying the Products table
    const products = await sql`SELECT * FROM Products;`;

    // Return the products as JSON response
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
