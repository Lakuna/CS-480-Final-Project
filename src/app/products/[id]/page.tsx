import {
	getProductById,
	getUserByEmail,
	getUserById
} from "../../../scripts/db";
import Link from "../../../components/Link";
import type { Metadata } from "next";
import auth from "../../../middleware";
import formatPrice from "../../../scripts/formatPrice";

interface Props {
	params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
	const { id } = await params;
	const product = await getProductById(id);
	if (!product) {
		return <h1>{"Unknown Product"}</h1>;
	}

	const vendor = await getUserById(product.user_id);

	const session = await auth();
	const user =
		session?.user?.email && (await getUserByEmail(session.user.email));

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
			{user && (
				<>
					<h2>Order</h2>
					<hr />
				</>
			)}
		</>
	);
}

export const generateMetadata = async ({
	params
}: Props): Promise<Metadata> => {
	const { id } = await params;
	const product = await getProductById(id);
	return {
		description: "A product.",
		openGraph: { url: `/products/${id}` },
		title: product ? product.name : "Unknown Product"
	};
};
