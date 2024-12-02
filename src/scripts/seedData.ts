import type { Address } from "../types/Address";
import type { Category } from "../types/Category";
import type { Customer } from "../types/Customer";
import type { Order } from "../types/Order";
import type { OrderItem } from "../types/OrderItem";
import type { PaymentInfo } from "../types/PaymentInfo";
import type { Product } from "../types/Product";
import type { ProductCategory } from "../types/ProductCategory";
import type { Review } from "../types/Review";
import type { Vendor } from "../types/Vendor";

export const customers: Customer[] = [
	{
		customer_id: "7e944cf9-b0c4-41e4-a88f-cab24fe249e1",
		email: "john.doe@example.com",
		name: "John Doe",
		phone: "+1 (817) 123-4567"
	},
	{
		customer_id: "a3cecf66-5582-4fc3-868f-69662fa8d94e",
		email: "jane.doe@example.com",
		name: "Jane Doe",
		phone: "+1 (412) 765-4321"
	}
];

export const addresses: Address[] = [
	{
		address_id: "d33eb67b-4c6e-456f-981d-7d4349aae7ae",
		city: "Chicago",
		country: "United States",
		customer_id: "7e944cf9-b0c4-41e4-a88f-cab24fe249e1", // John Doe.
		is_shipping: true,
		postal_code: "60607",
		state: "Illinois",
		street_address: "100 West Taylor Street"
	},
	{
		address_id: "6f438e2c-eb93-4bda-a72a-f3d2c674a3ee",
		city: "Fort Worth",
		country: "United States",
		customer_id: "a3cecf66-5582-4fc3-868f-69662fa8d94e", // Jane Doe.
		is_shipping: true,
		postal_code: "76244",
		state: "Texas",
		street_address: "9999 Brewster Lane"
	},
	{
		address_id: "8bdfdeb7-8962-45f9-b024-e7fa909672cd",
		city: "New York",
		country: "United States",
		customer_id: "7e944cf9-b0c4-41e4-a88f-cab24fe249e1", // John Doe.
		is_shipping: true,
		postal_code: "10001",
		state: "New York",
		street_address: "1 First Street"
	}
];

export const paymentInfos: PaymentInfo[] = [
	{
		address_id: "d33eb67b-4c6e-456f-981d-7d4349aae7ae", // John Doe's shipping address.
		card_holder_name: "John Doe",
		card_number: "0123 4567 8901 2345",
		customer_id: "7e944cf9-b0c4-41e4-a88f-cab24fe249e1", // John Doe.
		expiration_date: new Date("01-01-2026"),
		payment_info_id: "1e6be728-7ad5-49dc-8940-270e1d4e5e0f",
		method: "credit card"
	},
	{
		address_id: "6f438e2c-eb93-4bda-a72a-f3d2c674a3ee", // Jane Doe's shipping address.
		card_holder_name: "Jane Doe",
		card_number: "0987 6543 2109 8765",
		customer_id: "a3cecf66-5582-4fc3-868f-69662fa8d94e", // Jane Doe.
		expiration_date: new Date("01-01-2026"),
		payment_info_id: "4452019b-d05a-4ac9-b846-dde2619cea5a",
		method: "credit card"
	}
];

export const orders: Order[] = [
	{
		address_id: "d33eb67b-4c6e-456f-981d-7d4349aae7ae", // John Doe's shipping address.
		actual_delivery_date: new Date("03-21-2021"),
		customer_id: "7e944cf9-b0c4-41e4-a88f-cab24fe249e1", // John Doe.
		estimated_delivery_date: new Date("03-21-2021"),
		order_date: new Date("03-13-2021"),
		order_id: "5aff04d2-31a7-4836-98e6-bec8b3513cd5",
		payment_info_id: "1e6be728-7ad5-49dc-8940-270e1d4e5e0f", // John Doe's payment information.
		status: "delivered",
		total_amount: 10
	},
	{
		address_id: "6f438e2c-eb93-4bda-a72a-f3d2c674a3ee", // Jane Doe's shipping address.
		actual_delivery_date: new Date("03-21-2021"),
		customer_id: "a3cecf66-5582-4fc3-868f-69662fa8d94e", // Jane Doe.
		estimated_delivery_date: new Date("03-21-2021"),
		order_date: new Date("03-13-2021"),
		order_id: "f89648e3-8d90-4ea5-b0d4-1c64bb1492e3",
		payment_info_id: "4452019b-d05a-4ac9-b846-dde2619cea5a", // Jane Doe's payment information.
		status: "delivered",
		total_amount: 100
	}
];

export const vendors: Vendor[] = [
	{
		address_id: "8bdfdeb7-8962-45f9-b024-e7fa909672cd",
		email: "contact@acme.com",
		name: "Acme",
		phone: "+1 (100) 100-1000",
		vendor_id: "07181f65-e175-44b7-a6dc-2e29c8b33239"
	}
];

export const products: Product[] = [
	{
		description: "A small rectangular block of fired clay.",
		price: 10,
		product_id: "3b2f299e-0489-43f9-902d-278d3b627059",
		name: "Brick",
		stock_quantity: 9999,
		vendor_id: "07181f65-e175-44b7-a6dc-2e29c8b33239" // Acme.
	}
];

export const orderItems: OrderItem[] = [
	{
		order_id: "5aff04d2-31a7-4836-98e6-bec8b3513cd5", // John Doe's order.
		order_item_id: "d154c1d2-8cff-42dd-8e86-c7df638445f8",
		product_id: "3b2f299e-0489-43f9-902d-278d3b627059", // Brick.
		quantity: 1
	},
	{
		order_id: "f89648e3-8d90-4ea5-b0d4-1c64bb1492e3", // Jane Doe's order.
		order_item_id: "381565c9-9d6b-4c08-8439-ad05ed783346",
		product_id: "3b2f299e-0489-43f9-902d-278d3b627059", // Brick.
		quantity: 10
	}
];

export const categories: Category[] = [
	{
		category_id: "03ae881c-a0c3-48d6-b441-1c913acf0352",
		description: "Materials for building structures.",
		name: "Building Materials"
	}
];

export const productCategories: ProductCategory[] = [
	{
		category_id: "03ae881c-a0c3-48d6-b441-1c913acf0352", // Building materials.
		product_category_id: "c637c633-3040-4865-913a-38d60c05964a",
		product_id: "3b2f299e-0489-43f9-902d-278d3b627059" // Brick.
	}
];

export const reviews: Review[] = [
	{
		comment: "Explodes randomly.",
		customer_id: "7e944cf9-b0c4-41e4-a88f-cab24fe249e1", // John Doe.
		date_submitted: new Date("03-22-2021"),
		rating: 1,
		review_id: "bd302c97-9394-4f7a-9378-bcba0c916de5"
	}
];
