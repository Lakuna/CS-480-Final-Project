import { getProductById, getUserById } from "../../../scripts/db";
import Link from "../../../components/Link";
import formatPrice from "../../../scripts/formatPrice";

export default async function Page({
	params
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = await getProductById(id);
	if (!product) {
		return <h1>{"Unknown Product"}</h1>;
	}

	const vendor = await getUserById(product.user_id);

	return (
		<>
			<h1>{product.name}</h1>
			<p>
				<strong>Description:</strong> {product.description}
			</p>
			<p>
				<strong>Price:</strong> {formatPrice(product.price)}
			</p>
			<p>
				<strong>Stock quantity:</strong> {product.stock_quantity}
			</p>
			{vendor && (
				<p>
					<strong>Vendor:</strong>{" "}
					<Link href={`/vendors/${vendor.user_id}`}>{vendor.name}</Link>
				</p>
			)}
			<p>
				<strong>ID:</strong> {product.product_id}
			</p>
		</>
	);
}
