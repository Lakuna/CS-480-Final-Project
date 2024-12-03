import type { Product } from "../types/Product";
import type { User } from "../types/User";
import { sql } from "@vercel/postgres";

export const getAllProducts = async () =>
	(await sql<Product>`SELECT * FROM Products`).rows;

export const getUserByEmail = async (email: string) =>
	(await sql<User>`SELECT * FROM Users WHERE email = ${email}`).rows[0];
