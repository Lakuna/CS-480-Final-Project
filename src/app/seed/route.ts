import {
	addresses,
	categories,
	customers,
	orderItems,
	orders,
	paymentInfos,
	productCategories,
	products,
	reviews,
	vendors
} from "../../scripts/seedData";
import { db } from "@vercel/postgres";

const client = await db.connect();

const seedCustomers = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS Customers (
			customer_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			email TEXT NOT NULL UNIQUE,
			name TEXT NOT NULL,
			phone TEXT NOT NULL UNIQUE
		);
	`;
	return await Promise.all(
		customers.map(async (customer) => {
			return client.sql`
				INSERT INTO Customers (customer_id, email, name, phone)
				VALUES (${customer.customer_id}, ${customer.email}, ${customer.name}, ${customer.phone})
				ON CONFLICT (customer_id) DO NOTHING;
			`;
		})
	);
};

const seedAddresses = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS Addresses (
			address_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			customer_id UUID NOT NULL REFERENCES Customers,
			is_shipping BOOLEAN NOT NULL,
			street_address TEXT NOT NULL,
			city TEXT NOT NULL,
			state TEXT NOT NULL,
			postal_code TEXT NOT NULL,
			country TEXT NOT NULL
		);
	`;
	return await Promise.all(
		addresses.map(async (address) => {
			return client.sql`
				INSERT INTO Addresses (address_id, customer_id, is_shipping, street_address, city, state, postal_code, country)
				VALUES (${address.address_id}, ${address.customer_id}, ${address.is_shipping}, ${address.street_address}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country})
				ON CONFLICT (address_id) DO NOTHING;
			`;
		})
	);
};

const seedPaymentInfos = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS PaymentInfos (
			payment_info_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			customer_id UUID NOT NULL REFERENCES Customers,
			method TEXT NOT NULL,
			card_number TEXT NOT NULL,
			card_holder_name TEXT NOT NULL,
			expiration_date DATE NOT NULL,
			address_id UUID NOT NULL REFERENCES Addresses
		);
	`;
	return await Promise.all(
		paymentInfos.map(async (paymentInfo) => {
			return client.sql`
				INSERT INTO PaymentInfos (payment_info_id, customer_id, method, card_number, card_holder_name, expiration_date, address_id)
				VALUES (${paymentInfo.payment_info_id}, ${paymentInfo.customer_id}, ${paymentInfo.method}, ${paymentInfo.card_number}, ${paymentInfo.card_holder_name}, ${paymentInfo.expiration_date.toISOString().slice(0, 10)}, ${paymentInfo.address_id})
				ON CONFLICT (payment_info_id) DO NOTHING;
			`;
		})
	);
};

const seedOrders = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS Orders (
			order_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			order_date DATE NOT NULL,
			status TEXT NOT NULL,
			total_amount INTEGER NOT NULL,
			estimated_delivery_date DATE NOT NULL,
			customer_id UUID NOT NULL REFERENCES Customers,
			payment_info_id UUID NOT NULL REFERENCES PaymentInfos,
			address_id UUID NOT NULL REFERENCES Addresses,
			actual_delivery_date DATE
		);
	`;
	return await Promise.all(
		orders.map(async (order) => {
			return client.sql`
				INSERT INTO Orders (order_id, order_date, status, total_amount, estimated_delivery_date, customer_id, payment_info_id, address_id, actual_delivery_date)
				VALUES (${order.order_id}, ${order.order_date.toISOString().slice(0, 10)}, ${order.status}, ${order.total_amount}, ${order.estimated_delivery_date.toISOString().slice(0, 10)}, ${order.customer_id}, ${order.payment_info_id}, ${order.address_id}, ${order.actual_delivery_date?.toISOString().slice(0, 10) ?? null})
				ON CONFLICT (order_id) DO NOTHING;
			`;
		})
	);
};

const seedVendors = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS Vendors (
			vendor_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			name TEXT NOT NULL,
			address_id UUID NOT NULL REFERENCES Addresses,
			phone TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE
		);
	`;
	return await Promise.all(
		vendors.map(async (vendor) => {
			return client.sql`
				INSERT INTO Vendors (vendor_id, name, address_id, phone, email)
				VALUES (${vendor.vendor_id}, ${vendor.name}, ${vendor.address_id}, ${vendor.phone}, ${vendor.email})
				ON CONFLICT (vendor_id) DO NOTHING;
			`;
		})
	);
};

const seedProducts = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS Products (
			product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			name TEXT NOT NULL,
			description TEXT NOT NULL,
			price REAL NOT NULL,
			vendor_id UUID NOT NULL REFERENCES Vendors,
			stock_quantity INTEGER NOT NULL
		);
	`;
	return await Promise.all(
		products.map(async (product) => {
			return client.sql`
				INSERT INTO Products (product_id, name, description, price, vendor_id, stock_quantity)
				VALUES (${product.product_id}, ${product.name}, ${product.description}, ${product.price}, ${product.vendor_id}, ${product.stock_quantity})
				ON CONFLICT (product_id) DO NOTHING;
			`;
		})
	);
};

const seedOrderItems = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS OrderItems (
			order_item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			order_id UUID NOT NULL REFERENCES Orders,
			product_id UUID NOT NULL REFERENCES Products,
			quantity INTEGER NOT NULL
		);
	`;
	return await Promise.all(
		orderItems.map(async (orderItem) => {
			return client.sql`
				INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity)
				VALUES (${orderItem.order_item_id}, ${orderItem.order_id}, ${orderItem.product_id}, ${orderItem.quantity})
				ON CONFLICT (order_item_id) DO NOTHING;
			`;
		})
	);
};

const seedCategories = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS Categories (
			category_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			name TEXT NOT NULL,
			description TEXT NOT NULL
		);
	`;
	return await Promise.all(
		categories.map(async (category) => {
			return client.sql`
				INSERT INTO Categories (category_id, name, description)
				VALUES (${category.category_id}, ${category.name}, ${category.description})
				ON CONFLICT (category_id) DO NOTHING;
			`;
		})
	);
};

const seedProductCategories = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS ProductCategories (
			product_category_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			product_id UUID NOT NULL REFERENCES Products,
			category_id UUID NOT NULL REFERENCES Categories
		);
	`;
	return await Promise.all(
		productCategories.map(async (productCategory) => {
			return client.sql`
				INSERT INTO ProductCategories (product_category_id, product_id, category_id)
				VALUES (${productCategory.product_category_id}, ${productCategory.product_id}, ${productCategory.category_id})
				ON CONFLICT (product_category_id) DO NOTHING;
			`;
		})
	);
};

const seedReviews = async () => {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
	await client.sql`
		CREATE TABLE IF NOT EXISTS Reviews (
			review_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
			rating INTEGER NOT NULL,
			comment TEXT NOT NULL,
			date_submitted DATE NOT NULL,
			customer_id UUID NOT NULL REFERENCES Customers
		);
	`;
	return await Promise.all(
		reviews.map(async (review) => {
			return client.sql`
				INSERT INTO Reviews (review_id, rating, comment, date_submitted, customer_id)
				VALUES (${review.review_id}, ${review.rating}, ${review.comment}, ${review.date_submitted.toISOString().slice(0, 10)}, ${review.customer_id})
				ON CONFLICT (review_id) DO NOTHING;
			`;
		})
	);
};

export const GET = async () => {
	try {
		await client.sql`BEGIN`;
		await seedCustomers();
		await seedAddresses();
		await seedPaymentInfos();
		await seedOrders();
		await seedVendors();
		await seedProducts();
		await seedOrderItems();
		await seedCategories();
		await seedProductCategories();
		await seedReviews();
		await client.sql`COMMIT`;

		return Response.json({ message: "Database seeded successfully." });
	} catch (error) {
		await client.sql`ROLLBACK`;

		return Response.json({ error }, { status: 500 });
	}
};
