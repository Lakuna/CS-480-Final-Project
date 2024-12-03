import type { Address } from "../types/Address";
import type { PaymentInfo } from "../types/PaymentInfo";
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

export const createUser = async (user: User) => sql`
	INSERT INTO Users (email, name, phone)
	VALUES (${user.email}, ${user.name}, ${user.phone})
	ON CONFLICT (user_id) DO NOTHING;
`;

export const createAddress = async (address: Address) => sql`
	INSERT INTO Addresses (user_id, is_shipping, street_address, city, state, postal_code, country)
	VALUES (${address.user_id}, ${address.is_shipping}, ${address.street_address}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country})
	ON CONFLICT (address_id) DO NOTHING;
`;

export const getAddressesByUserId = async (id: string) =>
	(await sql<Address>`SELECT * FROM Addresses WHERE user_id = ${id}`).rows;

export const createPaymentInfo = async (paymentInfo: PaymentInfo) => sql`
	INSERT INTO PaymentInfos (user_id, method, card_number, card_holder_name, expiration_date, address_id)
	VALUES (${paymentInfo.user_id}, ${paymentInfo.method}, ${paymentInfo.card_number}, ${paymentInfo.card_holder_name}, ${paymentInfo.expiration_date.toISOString().slice(0, 10)}, ${paymentInfo.address_id})
	ON CONFLICT (payment_info_id) DO NOTHING;
`;

export const getPaymentInfosByUserId = async (id: string) =>
	(await sql<PaymentInfo>`SELECT * FROM PaymentInfos WHERE user_id = ${id}`)
		.rows;
