import { sql } from "@vercel/postgres";
export async function putHandler(req, res) {
  try {
    // Implement logic to handle PUT requests
    // For example, updating data in the Products table
    // This would typically involve executing an SQL UPDATE statement
    // based on the data provided in the request body
    // Example: await sql`UPDATE Products SET ... WHERE ...;`

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
