// Handler function for DELETE requests
export async function deleteHandler(req, res) {
  try {
    // Implement logic to handle DELETE requests
    // For example, deleting data from the Products table
    // This would typically involve executing an SQL DELETE statement
    // based on the data provided in the request parameters or body
    // Example: await sql`DELETE FROM Products WHERE ...;`

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
