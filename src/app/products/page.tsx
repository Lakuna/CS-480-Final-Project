import Card from "../../components/Card/Card";
import CardList from "../../components/CardList/CardList";
import type { Metadata } from "next";
import { getAllProducts } from "../../scripts/db";

const priceFormatter = new Intl.NumberFormat("en-US", {
	currency: "USD",
	style: "currency",
	trailingZeroDisplay: "stripIfInteger"
});

export default async function Page() {
	return (
		<>
			<h1>{"Products"}</h1>
			<hr />
			<CardList>
				{(await getAllProducts()).map((product) => (
					// TODO: Link to product page.
					<Card key={product.product_id}>
						<h2>{product.name}</h2>
						<p>{product.description}</p>
						<hr />
						<p>
							<strong>Price:</strong> {priceFormatter.format(product.price)}
						</p>
						<p>
							<strong>Stock quantity:</strong> {product.stock_quantity}
						</p>
					</Card>
				))}
			</CardList>
		</>
	);
}

export const metadata: Metadata = {
	description: "A list of available products.",
	openGraph: { url: "/products" },
	title: "Products"
};
