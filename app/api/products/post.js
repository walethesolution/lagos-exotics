import { sql } from "@vercel/postgres";

export async function postHandler(req, res) {
  try {
    // Implement logic to handle POST requests
    // For example, inserting data into the Products table
    // Iterate over menuData and insert each product into the Products table
    for (const [category, measurements] of Object.entries(menuData)) {
      for (const measurement of measurements) {
        // Execute SQL query to insert product into the Products table
        await sql`
            INSERT INTO Products (Category, ProductName, Measurement)
            VALUES (${category}, ${measurement}, ${measurement});
          `;
      }
    }

    return res.status(200).json({ message: "Products inserted successfully" });
  } catch (error) {
    console.error("Error inserting products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
