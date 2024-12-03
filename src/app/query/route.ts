// TODO: Delete.

import { sql } from "@vercel/postgres";

const listCustomers = async () => {
	return (
		await sql`
			SELECT name
			FROM Customers;
		`
	).rows;
};

export const GET = async () => {
	try {
		return Response.json(await listCustomers());
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
};
