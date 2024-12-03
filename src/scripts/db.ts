import type { Product } from "../types/Product";
import { sql } from "@vercel/postgres";

export const getAllProducts = async () =>
	(await sql<Product>`SELECT * FROM Products`).rows;
