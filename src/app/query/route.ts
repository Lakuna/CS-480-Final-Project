import { db } from "@vercel/postgres";

const client = await db.connect();

const listCustomers = async () => {
	return (
		await client.sql`
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
