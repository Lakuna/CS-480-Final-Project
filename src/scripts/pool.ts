import "dotenv/config";
import { type PoolOptions, type SslOptions, createPool } from "mysql2/promise";

// Get relevant environment variables.
const database = process.env["DATABASE_NAME"];
const host = process.env["HOST"];
const password = process.env["PASSWORD"];
const portString = process.env["PORT"];
const ca = process.env["CA_CERTIFICATE"];
const user = process.env["USER"];
if (!database || !host || !password || !portString || !ca || !user) {
	throw new Error("A required environment variable was not present.");
}

// Build connection pool configuration.
const port = parseInt(portString, 10);
const ssl: SslOptions = { ca };
const config: PoolOptions = { database, host, password, port, ssl, user };

// Create a connection pool.
export default createPool(config);
