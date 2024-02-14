import { getHandler } from "./get";
import { postHandler } from "./post";
import { deleteHandler } from "./delete";
import { putHandler } from "./update";

export const GET = getHandler;
export const POST = postHandler;
export const PUT = putHandler;
export const DELETE = deleteHandler;

export function handler(req, res) {
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else if (req.method === "PUT") {
    return putHandler(req, res);
  } else if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
