import type { Metadata } from "next";

export default function Page() {
	return (
		<>
			<h1 style={{ textAlign: "center" }}>{"EC Shop"}</h1>
			<hr />
		</>
	);
}

export const metadata: Metadata = {
	description: "An electronic commerce website.",
	openGraph: { url: "/" },
	title: "EC Shop"
};
