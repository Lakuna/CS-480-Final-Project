import auth from "../../middleware";
import { getUserByEmail } from "../../scripts/db";

export default async function Page() {
	const session = await auth();
	const user =
		session?.user?.email && (await getUserByEmail(session.user.email));

	return (
		<>
			<h1>{"Dashboard"}</h1>
			<hr />
			{user ? (
				<>
					<p>
						<strong>Name:</strong> {user.name}
					</p>
					<p>
						<strong>Email address:</strong> {user.email}
					</p>
					<p>
						<strong>Phone number:</strong> {user.phone}
					</p>
					<p>
						<strong>ID:</strong> {user.user_id}
					</p>
				</>
			) : (
				<p>{"Not logged in."}</p>
			)}
		</>
	);
}
