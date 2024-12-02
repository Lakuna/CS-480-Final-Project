import { db } from "@vercel/postgres";

const client = await db.connect();

async function listCustomers() {
	return (
		await client.sql`
			SELECT name
			FROM Customers;
		`
	).rows;
}

export async function GET() {
	try {
		return Response.json(await listCustomers());
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
