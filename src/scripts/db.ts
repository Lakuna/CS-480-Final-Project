import type { Product } from "../types/Product";
import type { User } from "../types/User";
import { sql } from "@vercel/postgres";

export const getAllProducts = async () =>
	(await sql<Product>`SELECT * FROM Products`).rows;

export const getProductById = async (id: string) =>
	(await sql<Product>`SELECT * FROM Products WHERE product_id = ${id}`).rows[0];

export const getProductsWithVendorId = async (id: string) =>
	(await sql<Product>`SELECT * FROM Products WHERE user_id = ${id}`).rows;

export const getUserByEmail = async (email: string) =>
	(await sql<User>`SELECT * FROM Users WHERE email = ${email}`).rows[0];

export const getUserById = async (id: string) =>
	(await sql<User>`SELECT * FROM Users WHERE user_id = ${id}`).rows[0];

export const getAllVendors = async () =>
	(
		await sql<User>`SELECT Users.* FROM Users INNER JOIN Products USING (user_id)`
	).rows;
